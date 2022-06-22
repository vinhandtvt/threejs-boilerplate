import { ThreeContainer } from 'src/app/three/ThreeContainer.component';
import { Camera } from './Camera.component';
import { Sizes } from './Utils/Sizes.component';
import * as THREE from 'three';

export class Renderer {
  canvas!: HTMLCanvasElement;
  sizes!: Sizes;
  scene!: THREE.Scene;
  camera!: Camera;
  renderer!: THREE.WebGLRenderer;

  constructor(private threeContainer: ThreeContainer) {
    this.canvas = this.threeContainer.canvas;
    this.sizes = this.threeContainer.sizes;
    this.scene = this.threeContainer.scene;
    this.camera = this.threeContainer.camera;

    this.setRenderer();
  }

  private setRenderer(): void {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.renderer.physicallyCorrectLights = true;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping = THREE.CineonToneMapping;
    this.renderer.toneMappingExposure = 1.75;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setClearColor(0x03544e);
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
  }

  public resize(): void {
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(this.sizes.pixelRatio);
  }

  public update(): void {
    this.renderer.render(this.scene, this.camera.camera);
  }
}
