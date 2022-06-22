import { ThreeContainer } from '../ThreeContainer.component';
import * as THREE from 'three';
import { Resources } from '../Utils/Resources.component';
import { Time } from '../Utils/Time.component';
import { Environment } from './Environment.component';
import { Island } from './Island.component';
import { Cloud } from './Cloud.component';

export class World {
  environment!: Environment;
  scene!: THREE.Scene;
  resources!: Resources;
  time!: Time;
  island!: Island;
  cloud!: Cloud;

  constructor(private threeContainer: ThreeContainer) {
    this.scene = this.threeContainer.scene;
    this.resources = this.threeContainer.resources;
    this.time = this.threeContainer.time;

    this.resources.on('ready', () => {
      console.log('loaded');
      this.island = new Island(this.threeContainer);
      this.cloud = new Cloud(this.threeContainer);

      this.environment = new Environment(this.threeContainer);
    });
  }
}
