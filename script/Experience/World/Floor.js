import * as THREE from "three";
import Experience from "../Experience";

export default class Floor {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.room = this.experience.world.room.actualRoom;

    this.setFloor();

    this.setCircles();
  }

  setFloor() {
    const geometry = new THREE.PlaneGeometry(100, 100);
    const material = new THREE.MeshStandardMaterial({
      color: 0xe7e7e7,
    });
    this.floor = new THREE.Mesh(geometry, material);
    this.floor.rotation.x = -Math.PI * 0.5;
    this.floor.position.y = -0.3;
    this.floor.receiveShadow = true;

    this.scene.add(this.floor);
  }

  setCircles() {
    this.circles = {};

    const colors = [
      { name: "pink", value: "#e5a1aa" },
      { name: "blue", value: "#8395cd" },
      { name: "green", value: "#7ad0ac" },
    ];
    const geometry = new THREE.CircleGeometry(1, 64);

    colors.forEach((color, i) => {
      const material = new THREE.MeshStandardMaterial({
        color: color.value,
      });
      this.circles[color.name] = new THREE.Mesh(geometry, material);
      this.circles[color.name].receiveShadow = true;
      this.circles[color.name].scale.set(0, 0, 0);
      this.circles[color.name].rotation.x = -Math.PI * 0.5;
      this.circles[color.name].position.y = -0.2999 + i * 0.001;
      this.scene.add(this.circles[color.name]);
    });
  }

  resize() {}

  update() {
    if (this.circles.blue) {
      this.circles.blue.position.x = this.room.position.x;
      this.circles.blue.position.z = this.room.position.z;
    }
  }
}
