import { ThreeContainer } from '../ThreeContainer.component';
import * as THREE from 'three';
import { Texture } from 'three';
import { Resources } from '../Utils/Resources.component';

export class Cloud {
  cloudGeo!: THREE.PlaneGeometry;
  cloudMaterial!: THREE.MeshLambertMaterial;
  resources!: Resources;
  cloudTexture!: any;
  cloudParticles: any[] = [];
  scene!: THREE.Scene;

  constructor(private threeContainer: ThreeContainer) {
    this.resources = this.threeContainer.resources;
    console.log(this.resources);
    this.cloudTexture = this.resources.items.cloudTexture;
    this.scene = this.threeContainer.scene;

    this.setGeoMetry();
    this.setMaterial();

    for (let i = 0; i < 100; i++) {
      let cloud = new THREE.Mesh(this.cloudGeo, this.cloudMaterial);
      cloud.position.set(Math.random() * 50 - 50, 1, Math.random() * 50 - 50);
      cloud.rotation.x = 1.16;
      cloud.rotation.y = -0.12;
      cloud.rotation.z = Math.random() * 2 * Math.PI;
      cloud.material.opacity = 0.55;
      this.cloudParticles.push(cloud);
      this.scene.add(cloud);
    }
  }

  private setGeoMetry(): void {
    this.cloudGeo = new THREE.PlaneGeometry(100, 100);
  }

  private setMaterial(): void {
    this.cloudMaterial = new THREE.MeshLambertMaterial({
      map: this.cloudTexture,
      transparent: true,
    });
  }

  public update(): void {
    this.cloudParticles.forEach((cloud) => {
      cloud.position.z -= 0.02;
      console.log('update cloud');
    });
  }
}
