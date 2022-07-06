import { Resources } from './../Utils/Resources.component';
import { ThreeContainer } from '../ThreeContainer.component';
import * as THREE from 'three';
import { Time } from '../Utils/Time.component';

export class Island {
  private readonly SMART_CITY_ISLAND = 'Poplar047';
  private readonly MID_ROCK_ISLAND = 'Object008';
  private readonly MOUNTAIN_ISLAND = 'Plane003';
  private readonly OCEAN_ISLAND = 'Plane004';
  private readonly FOREST_ISLAND = 'Object004';

  smartCityIsland!: any;
  midRockIsland!: any;
  mountainIsland!: any;
  oceanIsland!: any;
  forestIsland!: any;
  islands: THREE.Group[] = [];
  sceneMeshes: any[] = [];

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
    console.log('island model', this.model);

    this.smartCityIsland = this.model.getObjectByName(this.SMART_CITY_ISLAND);
    this.midRockIsland = this.model.getObjectByName(this.MID_ROCK_ISLAND);
    this.mountainIsland = this.model.getObjectByName(this.MOUNTAIN_ISLAND);
    this.oceanIsland = this.model.getObjectByName(this.OCEAN_ISLAND);
    this.forestIsland = this.model.getObjectByName(this.FOREST_ISLAND);
    this.islands.push(
      this.smartCityIsland,
      this.midRockIsland,
      this.mountainIsland,
      this.oceanIsland,
      this.forestIsland
    );

    this.smartCityIsland.traverse((child: any) => {
      if (child instanceof THREE.Mesh) {
        child.material = child.material.clone();
        this.sceneMeshes.push(child);
      }
    });
    this.turnOffIsland(this.mountainIsland);
    this.turnOffIsland(this.midRockIsland);
    this.turnOffIsland(this.oceanIsland);
    this.turnOffIsland(this.forestIsland);

    // this.model.scale.set(0.5, 0.5, 0.5);
    this.scene.add(
      this.smartCityIsland,
      this.midRockIsland,
      this.oceanIsland,
      this.forestIsland,
      this.mountainIsland
    );
  }

  public turnOffIsland(island: THREE.Group): void {
    island.traverse((child: any) => {
      if (child instanceof THREE.Mesh) {
        child.material.opacity = 0.2;
        child.material.transparent = true;
      }
    });
  }
  public turnOnIsland(islandIndex: number): void {
    const nextIsland = this.islands[islandIndex];
    nextIsland.traverse((child: any) => {
      if (child instanceof THREE.Mesh) {
        child.material = child.material.clone();
        child.material.opacity = 1;
        child.material.transparent = true;
        this.sceneMeshes.push(child);
      }
    });
  }
}
