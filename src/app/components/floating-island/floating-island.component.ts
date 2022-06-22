import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ThreeContainer } from 'src/app/three/ThreeContainer.component';

@Component({
  selector: 'app-floating-island',
  templateUrl: './floating-island.component.html',
  styleUrls: ['./floating-island.component.scss'],
})
export class FloatingIslandComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') private canvasRef!: ElementRef;

  threeContainer!: ThreeContainer;
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.threeContainer = new ThreeContainer(this.canvas);
  }

  get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }
}
