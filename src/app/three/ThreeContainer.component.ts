import * as THREE from 'three';
import { Camera } from './Camera.component';
import { Renderer } from './Renderer.component';
import { Sources } from './sources.component';
import { Resources } from './Utils/Resources.component';
import { Sizes } from './Utils/Sizes.component';
import { Time } from './Utils/Time.component';
import { Debug } from './World/Debug.component';
import { World } from './World/World.component';

export class ThreeContainer {
  scene!: THREE.Scene;
  sizes!: Sizes;
  time!: Time;
  camera!: Camera;
  renderer!: Renderer;
  resources!: Resources;
  world!: World;
  debug!: Debug;

  constructor(public canvas: HTMLCanvasElement) {
    //Setup
    this.debug = new Debug();
    this.sizes = new Sizes();
    this.time = new Time();

    // Resize Event
    this.sizes.on('resize', () => {
      this.resize();
    });

    this.time.on('tick', () => {
      this.update();
    });

    // SCENE
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x03544e, 0.001);
    // this.scene.background = new THREE.Color(0xaedbce);

    // load resources
    this.resources = new Resources(Sources.sources);

    // Camera
    this.camera = new Camera(this);

    // Renderer
    this.renderer = new Renderer(this);

    // World
    this.world = new World(this);
  }

  private resize(): void {
    this.camera.resize();
    this.renderer.resize();
  }

  private update(): void {
    this.camera.update();
    this.renderer.update();
    this.world.cloud?.update();
  }
}
