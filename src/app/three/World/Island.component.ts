import { Resources } from './../Utils/Resources.component';
import { ThreeContainer } from '../ThreeContainer.component';
import * as THREE from 'three';
import { Time } from '../Utils/Time.component';

export class Island {
  resource!: any;
  resources!: Resources;
  model!: THREE.Group;
  animation!: any;
  scene!: THREE.Scene;
  time!: Time;

  constructor(private threeContainer: ThreeContainer) {
    this.resources = this.threeContainer.resources;
    this.resource = this.resources.items.islandModel;
    this.scene = this.threeContainer.scene;
    console.log('from Island', this.resource);

    this.setModel();
  }

  private setModel(): void {
    this.model = this.resource.scene;
    this.model.scale.set(0.5, 0.5, 0.5);
    this.scene.add(this.model);
  }
}
