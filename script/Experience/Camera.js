import Experience from "./Experience";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Vector3 } from "three";

export default class Camera {
  constructor() {
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;

    this.createPerspectiveCamera();
    this.createOrthographicCamera();
    // this.setOrbitControls();
  }

  createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      35,
      this.sizes.aspect,
      0.1,
      100,
    );

    this.scene.add(this.perspectiveCamera);
    this.perspectiveCamera.position.z = 0;
    this.perspectiveCamera.position.y = 2;
    this.perspectiveCamera.lookAt(new Vector3(0, 0, 0));
  }

  createOrthographicCamera() {
    this.frustrum = 5;
    this.orthographicCamera = new THREE.OrthographicCamera(
      (-this.sizes.aspect * this.frustrum) / 2,
      (+this.sizes.aspect * this.frustrum) / 2,
      this.frustrum / 2,
      -this.frustrum / 2,
      -50,
      50,
    );

    this.orthographicCamera.position.y = 3.5;
    this.orthographicCamera.position.z = 5;
    this.orthographicCamera.lookAt(0, 0, 0);

    this.scene.add(this.orthographicCamera);
  }

  setOrbitControls() {
    this.controls = new OrbitControls(
      this.perspectiveCamera,
      this.canvas,
    );
    this.controls.enableDamping = true;
    this.controls.enableZoom = true;
  }

  resize() {
    // Resize Perspective Camera
    this.perspectiveCamera.aspect = this.sizes.aspect;
    this.perspectiveCamera.updateProjectionMatrix();

    // Resize Orthographic Camera
    this.orthographicCamera.left =
      (-this.sizes.aspect * this.frustrum) / 2;
    this.orthographicCamera.right =
      (+this.sizes.aspect * this.frustrum) / 2;
    this.orthographicCamera.top = this.frustrum / 2;
    this.orthographicCamera.bottom = -this.frustrum / 2;
    this.orthographicCamera.updateProjectionMatrix();
  }

  update() {
    // this.controls.update();
  }
}
