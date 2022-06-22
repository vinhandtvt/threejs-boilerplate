import { Debug } from './Debug.component';
import { ThreeContainer } from '../ThreeContainer.component';
import * as THREE from 'three';
import { Resources } from '../Utils/Resources.component';

export class Environment {
  scene!: THREE.Scene;
  resources!: Resources;
  sunLight!: THREE.DirectionalLight;
  ambientLight!: THREE.AmbientLight;
  environmentMap: any;
  debug!: Debug;

  constructor(private threeContainer: ThreeContainer) {
    this.scene = this.threeContainer.scene;
    this.resources = this.threeContainer.resources;

    this.setSunLight();
    this.setAmbientLight();
    if (this.resources) {
      console.log('environment resources', this.resources);

      // this.setEnvironment();
    }
  }

  private setSunLight(): void {
    this.sunLight = new THREE.DirectionalLight('#FFFFFF', 10);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.camera.far = 15;
    this.sunLight.shadow.mapSize.set(1024, 1024);
    this.sunLight.shadow.normalBias = 0.05;
    this.sunLight.position.set(3.5, 2, -1.25);
    this.scene.add(this.sunLight);
  }

  private setAmbientLight(): void {
    this.ambientLight = new THREE.AmbientLight(0x555555, 2);
    this.scene.add(this.ambientLight);
  }

  private setEnvironment(): void {
    this.environmentMap = {};
    this.environmentMap.intensity = 0.4;
    this.environmentMap.texture = this.resources.items.environmentMapTexture;
    this.environmentMap.texture.encoding = THREE.sRGBEncoding;
    this.scene.environment = this.environmentMap.texture;

    this.environmentMap.updateMaterial = () => {
      this.scene.traverse((child) => {
        if (
          child instanceof THREE.Mesh &&
          child.material instanceof THREE.MeshStandardMaterial
        ) {
          child.material.envMap = this.environmentMap.texture;
          child.material.envMapIntensity = this.environmentMap.intensity;
          child.material.needsUpdate = true;
        }
      });
    };
  }
}
