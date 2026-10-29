// 3D-voorbeeld van de plaat. Alleen weergave: rekenen en downloaden werken ook zonder WebGL.
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { PlateResult } from './engine';
import type { Filament } from '../../print/color-3mf/threemf';

type Props = { result: PlateResult | null; filaments: Filament[] };

type Scene3 = {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  plate: THREE.Group;
  items: THREE.Group;
  mats: THREE.MeshStandardMaterial[];
  bedKey: string;
};

const reducedMotion = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

function makePlate(bed: [number, number]): THREE.Group {
  const [w, h] = bed;
  const g = new THREE.Group();
  const shape = new THREE.Shape();
  const r = 6;
  shape.moveTo(r, 0); shape.lineTo(w - r, 0); shape.quadraticCurveTo(w, 0, w, r);
  shape.lineTo(w, h - r); shape.quadraticCurveTo(w, h, w - r, h); shape.lineTo(r, h);
  shape.quadraticCurveTo(0, h, 0, h - r); shape.lineTo(0, r); shape.quadraticCurveTo(0, 0, r, 0);
  const plate = new THREE.Mesh(
    new THREE.ExtrudeGeometry(shape, { depth: 1.5, bevelEnabled: false }),
    new THREE.MeshStandardMaterial({ color: 0x2b2e3d, roughness: 0.9 }),
  );
  plate.position.z = -1.5;
  g.add(plate);
  const grid = new THREE.GridHelper(Math.max(w, h), Math.max(w, h) / 10, 0x3d4154, 0x3d4154);
  grid.rotation.x = Math.PI / 2;
  grid.position.set(w / 2, h / 2, 0.02);
  g.add(grid);
  return g;
}

export default function Viewer({ result, filaments }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const s = useRef<Scene3 | null>(null);
  const [noGl, setNoGl] = useState(false);

  useEffect(() => {
    const el = host.current!;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      setNoGl(true);
      return;
    }
    renderer.setPixelRatio(Math.min(2, devicePixelRatio));
    el.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    scene.add(new THREE.HemisphereLight(0xffffff, 0x445566, 1.6));
    const sun = new THREE.DirectionalLight(0xffffff, 1.6);
    sun.position.set(-80, -120, 200);
    scene.add(sun);
    const camera = new THREE.PerspectiveCamera(35, 1, 1, 3000);
    camera.up.set(0, 0, 1);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.maxPolarAngle = Math.PI / 2.1;
    const plate = new THREE.Group();
    const items = new THREE.Group();
    scene.add(plate, items);
    const mats = [0, 1].map(() => new THREE.MeshStandardMaterial({ roughness: 0.55 }));
    s.current = { renderer, scene, camera, controls, plate, items, mats, bedKey: '' };

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = el;
      renderer.setSize(w, h, false);
      camera.aspect = w / Math.max(1, h);
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();
    let raf = 0;
    const loop = () => {
      controls.update();
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      controls.dispose();
      renderer.dispose();
      el.removeChild(renderer.domElement);
      s.current = null;
    };
  }, []);

  useEffect(() => {
    const st = s.current;
    if (!st) return;
    filaments.forEach((f, i) => st.mats[i]?.color.set(f.color));
  }, [filaments]);

  useEffect(() => {
    const st = s.current;
    if (!st || !result) return;
    const key = result.bed.join('x');
    if (st.bedKey !== key) {
      st.plate.clear();
      st.plate.add(makePlate(result.bed));
      const [w, h] = result.bed;
      st.controls.target.set(w / 2, h / 2, 0);
      st.camera.position.set(w / 2, -h * 0.35, Math.max(w, h) * 1.3);
      st.bedKey = key;
    }
    const old = new Map<string, THREE.Object3D>();
    for (const c of st.items.children) old.set(c.name, c);
    const fresh = new THREE.Group();
    const born: THREE.Object3D[] = [];
    result.items.forEach((it, i) => {
      const id = `${i}|${it.name}`;
      const g = new THREE.Group();
      g.name = id;
      for (const part of it.parts) {
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(part.positions, 3));
        geo.setIndex(new THREE.BufferAttribute(part.indices, 1));
        geo.computeVertexNormals();
        g.add(new THREE.Mesh(geo, st.mats[part.filament - 1]));
      }
      g.position.set(it.x, it.y, 0);
      if (!old.has(id)) born.push(g);
      fresh.add(g);
    });
    for (const c of st.items.children) c.traverse((o) => (o as THREE.Mesh).geometry?.dispose());
    st.items.clear();
    for (const c of [...fresh.children]) st.items.add(c);
    // Pop-in voor nieuwe sleutelhangers (pop-taal; rustig-stand: direct).
    if (!reducedMotion() && born.length) {
      const t0 = performance.now();
      const ease = (t: number) => 1 + 2.7 * Math.pow(t - 1, 3) + 1.7 * Math.pow(t - 1, 2);
      const step = () => {
        const t = Math.min(1, (performance.now() - t0) / 280);
        for (const b of born) b.scale.setScalar(Math.max(0.01, ease(t)));
        if (t < 1) requestAnimationFrame(step);
      };
      step();
    }
  }, [result]);

  return (
    <div className="viewer" ref={host} aria-label="3D preview of the print plate" role="img">
      {noGl && <p className="viewer-fallback">3D preview is not available on this device. Downloading still works.</p>}
    </div>
  );
}
