import * as THREE from "three";

// utils
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Resources from "./Utils/Resources";
import assets from "./Utils/assets";

// Components
import Camera from "./Camera";
import Renderer from "./Renderer";
import World from "./World/World";
import Preloader from "./Preloader";

export default class Experience {
  static instance;
  constructor(canvas) {
    if (Experience.instance) {
      return Experience.instance;
    }

    Experience.instance = this;
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.time = new Time();
    this.sizes = new Sizes();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.resources = new Resources(assets);
    this.world = new World();
    this.preloader = new Preloader();

    this.time.on("update", () => {
      this.update();
    });

    this.sizes.on("resize", () => {
      this.resize();
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.camera.update();
    this.renderer.update();
    this.world.update();
    this.preloader.update();
  }
}
