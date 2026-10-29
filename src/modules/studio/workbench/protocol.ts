import type { PlateRequest, PlateResult } from './engine';
import type { ColorMethod, Filament } from '../../print/color-3mf/threemf';

export type ToWorker =
  | { id: number; type: 'plate'; req: PlateRequest }
  | { id: number; type: 'export'; req: PlateRequest; format: '3mf' | 'stl'; filaments: Filament[]; method: ColorMethod };

export type FromWorker =
  | { id: number; ok: true; type: 'plate'; result: PlateResult }
  | { id: number; ok: true; type: 'export'; bytes: Uint8Array; filename: string }
  | { id: number; ok: false; error: string };
