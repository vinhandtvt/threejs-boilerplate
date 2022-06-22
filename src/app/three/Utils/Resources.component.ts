import { EventEmitter } from '../EventEmitter.component';
import { Source } from '../sources.component';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

export class Resources extends EventEmitter {
  items!: any;
  toLoad!: number;
  loaded!: number;
  loaders: any;
  dracoLoader = new DRACOLoader();

  constructor(private sources: Source[]) {
    super();

    this.items = {};
    this.toLoad = this.sources.length;
    this.loaded = 0;

    //setup
    this.configDraco();
    this.setLoaders();
    this.startLoading();
  }

  private configDraco(): void {
    this.dracoLoader.setDecoderPath('assets/draco/');
  }

  private setLoaders(): void {
    this.loaders = {};
    this.loaders.gltfLoader = new GLTFLoader();
    this.loaders.gltfLoader.setDRACOLoader(this.dracoLoader);
    this.loaders.textureLoader = new THREE.TextureLoader();
  }

  private async startLoading() {
    for (const source of this.sources) {
      if (source.type === 'gltfModel') {
        await this.loaders.gltfLoader.load(source.path, (file: GLTF) => {
          this.sourceLoaded(source, file);
        });
      }
      if (source.type === 'texture') {
        await this.loaders.textureLoader.load(
          source.path,
          (file: THREE.Texture) => {
            this.sourceLoaded(source, file);
          }
        );
      }
    }
  }

  private sourceLoaded(source: Source, file: GLTF | THREE.Texture): void {
    this.items[source.name] = file;
    this.loaded++;

    if (this.loaded === this.toLoad) {
      console.log('ready');

      this.trigger('ready');
    }
  }
}
