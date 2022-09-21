import * as THREE from "three";
import Experience from "../Experience";
import gsap from "gsap";

export default class Room {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.room = this.experience.resources.items.room;
    this.monitorTexture =
      this.experience.resources.items.monitorTexture;
    this.actualRoom = this.room.scene;
    this.animations = this.room.animations;
    this.deltaTime = this.experience.time.delta;
    this.roomChildren = {};
    this.isIntroDone = false;

    this.experience.preloader.on("roomintrodone", () => {
      this.isIntroDone = true;
    });

    this.runAnimations();

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    };

    this.setModel();
    this.addLampLight();

    this.onHouseMove();
  }

  setModel() {
    this.actualRoom.scale.set(0.02, 0.02, 0.02);
    this.actualRoom.position.set(0, -0.1, 0);
    this.actualRoom.rotation.y = Math.PI * 0.754;
    this.actualRoom.traverse((c) => {
      c.castShadow = true;
      c.receiveShadow = true;
    });
    this.actualRoom.children.forEach((obj) => {
      this.roomChildren[obj.name] = obj;
    });

    this.roomChildren.screen.material = new THREE.MeshBasicMaterial({
      map: this.monitorTexture,
    });
    console.log(this.actualRoom);
    this.roomChildren.mailbox.scale.set(0, 0, 0);
    // this.roomChildren.cubee.scale.set(0, 0, 0);
    this.scene.add(this.actualRoom);
  }

  runAnimations() {
    this.autoPlayAnimations = ["longHourHand", "shortHourHand"];
    this.mixer = new THREE.AnimationMixer(this.actualRoom);

    this.autoPlayAnimations.forEach((animation) => {
      const clip = this.findAnimation(animation);
      if (clip !== -1) {
        this.mixer.clipAction(clip).play();
      }
    });
  }

  findAnimation(name) {
    return this.animations.find((a) => a.name === name);
  }

  onHouseMove() {
    window.addEventListener("mousemove", (e) => {
      this.lerp.target = e.clientX / this.sizes.width - 0.5;
    });
  }

  addLampLight() {
    const width = 0.05;
    const height = 0.05;
    const intensity = 0;
    this.lampLight = new THREE.RectAreaLight(
      0xffffff,
      intensity,
      width,
      height,
    );
    this.lampLight.position.set(4.94954, 5.5, -4.00279);
    this.lampLight.rotation.x = -Math.PI * 0.5;

    this.actualRoom.add(this.lampLight);
  }

  themeSwitched(theme) {
    if (theme === "dark") {
      gsap.to(this.lampLight, {
        intensity: 2,
        width: 0.1,
        height: 0.1,
        duration: 1,
      });
    } else {
      gsap.to(this.lampLight, {
        intensity: 0,
        duration: 0.2,
      });
    }
  }

  resize() {}

  update() {
    this.lerp.current = gsap.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease,
    );

    if (this.isIntroDone) {
      this.actualRoom.rotation.y =
        Math.PI * 4.754 * (1 + this.lerp.current * 0.01);
    }

    this.mixer.update(this.deltaTime * 0.0005);
  }
}
