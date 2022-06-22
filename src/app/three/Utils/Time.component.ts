import { EventEmitter } from '../EventEmitter.component';

export class Time extends EventEmitter {
  start!: number;
  current!: number;
  elapsed!: number;
  delta!: number;

  constructor() {
    super();

    //Setup
    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    this.delta = 16; // Default screen fps (frame per second)

    window.requestAnimationFrame(() => {
      this.tick(); // Delay 1 frame
    });
  }

  private tick(): void {
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.trigger('tick');

    window.requestAnimationFrame(() => {
      this.tick();
    });
  }
}
