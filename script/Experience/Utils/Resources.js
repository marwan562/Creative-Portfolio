import { EventEmitter } from "events";
import Experience from "../Experience";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import * as THREE from "three";

export default class Resources extends EventEmitter {
  constructor(assets) {
    super();
    this.experience = new Experience();
    this.renderer = this.experience.renderer;

    this.assets = assets;

    this.items = {};
    this.queue = this.assets.length;
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.loaders = {
      gltfLoader: new GLTFLoader(),
    };
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/");
    this.loaders.gltfLoader.setDRACOLoader(dracoLoader);
  }

  startLoading() {
    this.assets.forEach((asset) => {
      if (asset.type === "glbModel") {
        this.loaders.gltfLoader.load(asset.path, (file) => {
          this.singleAssetLoaded(asset, file);
        });
      }
      if (asset.type === "videoTexture") {
        const vedioElement = document.createElement("video");

        vedioElement.src = asset.path;
        vedioElement.autoplay = true;
        vedioElement.controls = false;
        vedioElement.muted = true;
        vedioElement.loop = true;
        vedioElement.play();

        const texture = new THREE.VideoTexture(vedioElement);

        texture.flipY = true;
        texture.encoding = THREE.sRGBEncoding;
        texture.generateMipmaps = false;
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;

        this.singleAssetLoaded(asset, texture);
      }
    });
  }

  singleAssetLoaded(asset, file) {
    this.items[asset.name] = file;
    this.loaded++;

    if (this.loaded === this.queue) {
      this.emit("ready");
    }
  }
}
