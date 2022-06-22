export class Sources {
  public static readonly sources: Source[] = [
    {
      name: 'islandModel',
      type: 'gltfModel',
      path: 'assets/textures/Map_Floating_Island_Group.gltf',
    },
    {
      name: 'cloudTexture',
      type: 'texture',
      path: 'assets/textures/clouds.png',
    },
  ];
}

export interface Source {
  name: string;
  type: string;
  path: string | string[];
}
