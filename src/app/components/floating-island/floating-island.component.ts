import { Island } from './../../three/World/Island.component';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ThreeConstant } from 'src/app/shared/three-constant.component';
import { ThreeContainer } from 'src/app/three/ThreeContainer.component';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-floating-island',
  templateUrl: './floating-island.component.html',
  styleUrls: ['./floating-island.component.scss'],
})
export class FloatingIslandComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') private canvasRef!: ElementRef;

  @HostListener('mousemove', ['$event']) mousemove(event: MouseEvent) {
    this.threeContainer.mouse.x =
      (event.clientX / this.canvas.clientWidth) * 2 - 1;
    this.threeContainer.mouse.y =
      -(event.clientY / this.canvas.clientHeight) * 2 + 1;
  }

  @HostListener('click', ['$event']) onclick(event: MouseEvent): void {
    const currentIslandName =
      this.threeContainer.currentIntersect?.object?.parent?.name;
    console.log(
      'outside',
      this.threeContainer.currentIntersect?.object?.parent?.name
    );
    switch (currentIslandName) {
      case ThreeConstant.SMART_CITY_ISLAND:
        this.nextMountTain = 1;
        break;
      case ThreeConstant.MID_ROCK_ISLAND:
        this.nextMountTain = 2;
        break;
      case ThreeConstant.MOUNTAIN_ISLAND:
        this.nextMountTain = 3;
        break;
      case ThreeConstant.OCEAN_ISLAND:
        this.nextMountTain = 4;
        break;
      case ThreeConstant.FOREST_ISLAND:
        this.nextMountTain = 5;
        break;
      default:
        this.nextMountTain = 10;
        break;
    }

    if (this.activeMountain === this.nextMountTain) {
      this.openIsland(this.nextMountTain);
    }
    if (this.activeMountain === 6) {
      // this.openIsland(6);
      // this.scene.add(this.avatar);
      // this.directionalLight.intensity = 4;
    }
  }
  currentIntersect: any;
  threeContainer!: ThreeContainer;

  nextMountTain = 1;
  activeMountain = 1;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  private openIsland(islandName: number) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      height: '150px',
      data: {
        island: islandName,
      },
    });
    dialogRef.afterClosed().subscribe((island: number) => {
      if (island) {
        this.activeMountain += 1;
        this.threeContainer.world.island.turnOnIsland(island);
      }
    });
  }

  ngAfterViewInit(): void {
    this.threeContainer = new ThreeContainer(this.canvas);
  }

  get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }
}
