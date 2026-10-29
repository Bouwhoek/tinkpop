/* ===== Tinkpop Pop: motion-module (prototype) ===== */
const Pop=(()=>{
  const mq=matchMedia("(prefers-reduced-motion: reduce)");
  const S={sound:false,haptic:true,calm:mq.matches};
  try{const s=JSON.parse(localStorage.getItem("tp-pop-settings")||"null");if(s)Object.assign(S,s,{calm:s.calm||mq.matches})}catch(e){}
  const save=()=>{try{localStorage.setItem("tp-pop-settings",JSON.stringify(S))}catch(e){}};
  const amp=()=>S.calm?0:1;
  const E={std:"cubic-bezier(0.2,0,0,1)",out:"cubic-bezier(0.05,0.7,0.1,1)",inn:"cubic-bezier(0.3,0,0.8,0.15)",back:"cubic-bezier(0.34,1.56,0.64,1)"};
  const sc=(v)=>1+(v-1)*amp();
  /* geluid: Web Audio, standaard uit */
  let ac=null;
  function tone(type,f0,f1,glide,decay,peak=0.09,delay=0){
    if(!S.sound)return;
    try{ac=ac||new (window.AudioContext||window.webkitAudioContext)();if(ac.state==="suspended")ac.resume();
      const t=ac.currentTime+delay,o=ac.createOscillator(),g=ac.createGain();o.type=type;
      o.frequency.setValueAtTime(f0,t);o.frequency.exponentialRampToValueAtTime(f1,t+glide/1000);
      g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(peak,t+.005);g.gain.exponentialRampToValueAtTime(.0001,t+(glide+decay)/1000);
      o.connect(g).connect(ac.destination);o.start(t);o.stop(t+(glide+decay)/1000+.02)}catch(e){}
  }
  const SND={pop:()=>tone("sine",500,1100,60,90),plop:()=>tone("sine",900,280,80,110),tink:()=>tone("triangle",1800,1790,5,50,.07),tick:()=>tone("triangle",1200,1250,5,30,.05),
    burst:()=>{tone("sine",520,1150,55,80);tone("sine",700,1500,55,90,.07,.08)}};
  const buzz=ms=>{if(S.haptic&&!S.calm&&navigator.vibrate)try{navigator.vibrate(ms)}catch(e){}};
  const cancel=el=>el.getAnimations().forEach(a=>a.cancel());
  /* deeltjes: één canvas, alleen actief als er deeltjes leven */
  let cv=null,cx=null,parts=[],raf=0;
  function ensureCanvas(){if(cv)return;cv=document.createElement("canvas");cv.setAttribute("aria-hidden","true");cv.style.cssText="position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:50";document.body.append(cv);cx=cv.getContext("2d");resize();addEventListener("resize",resize)}
  function resize(){if(!cv)return;const d=Math.min(2,devicePixelRatio||1);cv.width=innerWidth*d;cv.height=innerHeight*d;cx.setTransform(d,0,0,d,0,0)}
  function emit(x,y,n,colors,opts={}){if(S.calm)return;ensureCanvas();for(let i=0;i<n;i++){const a=(opts.spread??Math.PI*2)*(i/n)+(opts.angle??0)+Math.random()*.4,v=(opts.speed??3.4)+Math.random()*1.6;
      parts.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-(opts.lift??1.2),life:0,max:opts.life??36,c:colors[i%colors.length],w:opts.w??7,h:opts.h??3,r:Math.random()*6,dr:(Math.random()-.5)*.3,drop:opts.drop})}
    if(!raf)raf=requestAnimationFrame(tick)}
  function tick(){cx.clearRect(0,0,innerWidth,innerHeight);parts=parts.filter(p=>p.life<p.max);
    for(const p of parts){p.life++;p.x+=p.vx;p.y+=p.vy;p.vy+=.18;p.vx*=.97;p.r+=p.dr;const o=1-p.life/p.max;cx.globalAlpha=o;cx.fillStyle=p.c;cx.save();cx.translate(p.x,p.y);cx.rotate(p.r);
      if(p.drop){cx.beginPath();cx.arc(0,0,p.w/2*(.6+o*.4),0,Math.PI*2);cx.fill()}else{cx.beginPath();cx.roundRect?cx.roundRect(-p.w/2,-p.h/2,p.w,p.h,p.h/2):cx.rect(-p.w/2,-p.h/2,p.w,p.h);cx.fill()}cx.restore()}
    cx.globalAlpha=1;raf=parts.length&&!document.hidden?requestAnimationFrame(tick):(cx.clearRect(0,0,innerWidth,innerHeight),0)}
  const COLORS=()=>{const st=getComputedStyle(document.documentElement);return["--cyan","--pink","--orange"].map(v=>st.getPropertyValue(v).trim()||"#ff3fb4")};
  const center=el=>{const r=el.getBoundingClientRect();return[r.left+r.width/2,r.top+r.height/2]};
  /* de 10 interacties */
  const A={
    "pop-in":(el)=>{SND.pop();return el.animate(S.calm?[{opacity:0},{opacity:1}]:[{opacity:0,transform:`scale(${sc(.6)})`},{opacity:1,transform:`scale(${sc(1.06)})`,offset:.65},{opacity:1,transform:"scale(1)"}],{duration:S.calm?150:280,easing:S.calm?"linear":E.out})},
    "plop-out":(el,o={})=>{SND.plop();buzz(12);
      if(!S.calm&&o.drops!==false){const [x,y]=center(el);setTimeout(()=>emit(x,y,6,COLORS(),{speed:2.6,life:22,w:6,drop:true,lift:.6}),110)}
      return el.animate(S.calm?[{opacity:1},{opacity:0}]:[{transform:"scale(1,1)",opacity:1},{transform:"scale(1.05,.92)",opacity:1,offset:.3},{transform:"scale(1.1)",opacity:.6,offset:.6},{transform:"scale(1.14)",opacity:0}],{duration:S.calm?120:200,easing:E.inn,fill:"forwards"})},
    "press":(el)=>el.animate([{transform:"scale(1)"},{transform:`scale(${sc(.94)})`,offset:.35},{transform:`scale(${sc(1.03)})`,offset:.7},{transform:"scale(1)"}],{duration:180,easing:E.out}),
    "toggle":(el,o={})=>{SND.tick();const k=el.querySelector(".knob");if(!k)return;const on=o.on;return k.animate(S.calm?[]:[{transform:`translateX(${on?0:20}px)`},{transform:`translateX(${on?11:9}px) scaleX(1.15)`,offset:.5},{transform:`translateX(${on?22:-2}px)`,offset:.8},{transform:`translateX(${on?20:0}px)`}],{duration:200,easing:E.back})},
    "render-pop":(el)=>{SND.tink();const ring=el.querySelector(".ring");ring&&ring.animate([{opacity:0},{opacity:1,offset:.3},{opacity:0}],{duration:350});
      return S.calm?null:el.animate([{transform:"scale(1)"},{transform:`scale(${sc(.96)})`,offset:.25},{transform:`scale(${sc(1.02)})`,offset:.7},{transform:"scale(1)"}],{duration:350,easing:E.back})},
    "burst":(el)=>{SND.burst();buzz([10,40,10]);A.press(el);const ck=el.querySelector(".ck");ck&&ck.animate(S.calm?[{opacity:0},{opacity:1}]:[{transform:"scale(0)",opacity:0},{transform:"scale(1.2)",opacity:1,offset:.6},{transform:"scale(1)",opacity:1}],{duration:280,easing:E.back,fill:"forwards"});
      const [x,y]=center(el);emit(x,y,12,COLORS(),{spread:Math.PI*1.2,angle:-Math.PI*1.1,speed:4,life:38,lift:1.8})},
    "wobble":(el)=>{buzz(30);el.classList.add("err");setTimeout(()=>el.classList.remove("err"),1400);return S.calm?null:el.animate([0,-6,5,-3,2,0].map(x=>({transform:`translateX(${x}px)`})),{duration:300,easing:E.std})},
    "toast":(el,o={})=>o.out?el.animate([{opacity:1,transform:"scale(1)"},{opacity:0,transform:`scale(${sc(.96)})`}],{duration:200,easing:E.inn,fill:"forwards"}):(SND.pop(),el.animate(S.calm?[{opacity:0},{opacity:1}]:[{opacity:0,transform:`translateY(12px) scale(${sc(.9)})`},{opacity:1,transform:"none"}],{duration:280,easing:E.back})),
    "lift":(el,o={})=>el.animate(o.drop?[{transform:`scale(${sc(1.04)}) rotate(${1.5*amp()}deg)`},{transform:`scale(1,${sc(.96)})`,offset:.5},{transform:"none"}]:[{transform:"none"},{transform:`scale(${sc(1.04)}) rotate(${1.5*amp()}deg)`}],{duration:120,easing:E.out,fill:"forwards"}),
    "count":(el)=>S.calm?null:el.animate([{transform:`translateY(-4px) scale(${sc(1.15)})`},{transform:"none"}],{duration:120,easing:E.out})
  };
  function pop(el,name,o){cancel(el);const a=A[name]&&A[name](el,o||{});return a&&a.finished?a.finished.catch(()=>{}):Promise.resolve()}
  return {pop,S,save,SND,emit,COLORS};
})();
