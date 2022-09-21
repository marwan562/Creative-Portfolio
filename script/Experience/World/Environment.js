import * as THREE from "three";
import Experience from "../Experience";
import gsap from "gsap";
import GUI from "lil-gui";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.gui = new GUI();

    this.setGUI();

    this.setSunLight();
  }

  setSunLight() {
    this.sunlight = new THREE.DirectionalLight("#ffffff", 3);
    this.sunlight.castShadow = true;
    this.sunlight.shadow.camera.far = 20;
    this.sunlight.shadow.mapSize.width = 2024;
    this.sunlight.shadow.mapSize.height = 2024;
    this.sunlight.shadow.normalBias = 0.05;
    this.sunlight.position.set(-0.5, 4, 3);
    this.scene.add(this.sunlight);

    this.ambientLight = new THREE.AmbientLight("#ffffff", 1.5);
    this.scene.add(this.ambientLight);
  }

  themeSwitched(theme) {
    if (theme === "dark") {
      gsap.to(this.sunlight.color, {
        r: 0.17254901960784313,
        g: 0.23137254901960785,
        b: 0.6862745098039216,
      });
      gsap.to(this.ambientLight.color, {
        r: 0.17254901960784313,
        g: 0.23137254901960785,
        b: 0.6862745098039216,
      });
      gsap.to(this.ambientLight, {
        intensity: 0.75,
      });
      gsap.to(this.sunlight, {
        intensity: 0.75,
      });
    } else {
      gsap.to(this.sunlight.color, {
        r: 1,
        g: 1,
        b: 1,
      });
      gsap.to(this.ambientLight.color, {
        r: 1,
        g: 1,
        b: 1,
      });
      gsap.to(this.ambientLight, {
        intensity: 1.5,
      });
      gsap.to(this.sunlight, {
        intensity: 3,
      });
    }
  }

  setGUI() {
    this.obj = { color: "#ffffff" };

    this.gui.addColor(this.obj, "color").onChange(() => {
      const color = new THREE.Color(this.obj.color);

      this.ambientLight.color.set(color);
      this.sunlight.color.set(color);
    });

    this.gui.hide();
  }

  resize() {}

  update() {}
}
