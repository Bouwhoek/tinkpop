import type { FromWorker, ToWorker } from './protocol';

type Pending = { resolve: (m: FromWorker) => void };
type Req = ToWorker extends infer T ? (T extends { id: number } ? Omit<T, 'id'> : never) : never;

export class EngineClient {
  private worker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' });
  private pending = new Map<number, Pending>();
  private next = 1;
  constructor() {
    this.worker.onmessage = (e: MessageEvent<FromWorker>) => {
      this.pending.get(e.data.id)?.resolve(e.data);
      this.pending.delete(e.data.id);
    };
  }
  send(msg: Req): Promise<FromWorker> {
    const id = this.next++;
    return new Promise((resolve) => {
      this.pending.set(id, { resolve });
      this.worker.postMessage({ ...msg, id } as ToWorker);
    });
  }
}
