import { ThreeContainer } from './ThreeContainer.component';
import { Sizes } from './Utils/Sizes.component';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class Camera {
  sizes!: Sizes;
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  controls!: OrbitControls;
  canvas!: HTMLCanvasElement;

  constructor(private threeContainer: ThreeContainer) {
    this.sizes = this.threeContainer.sizes;
    this.scene = this.threeContainer.scene;
    this.canvas = this.threeContainer.canvas;

    this.setCamera();
    this.setOrbitControls();
  }

  private setCamera(): void {
    this.camera = new THREE.PerspectiveCamera(
      75,
      this.sizes.width / this.sizes.height,
      1,
      1000
    );
    this.camera.position.set(1, -3, 15);
    this.camera.rotation.set(1.16, -0.12, 0.27);
    this.scene.add(this.camera);
  }

  private setOrbitControls(): void {
    this.controls = new OrbitControls(this.camera, this.canvas);
    this.controls.enableDamping = true;
  }

  public resize(): void {
    this.camera.aspect = this.sizes.width / this.sizes.height;
    this.camera.updateProjectionMatrix();
  }

  public update(): void {
    this.controls.update;
  }
}
