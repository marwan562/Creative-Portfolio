import { EventEmitter } from "events";

export default class Sizes extends EventEmitter {
  constructor() {
    super();
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.aspect = this.width / this.height;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
    this.device = this.width < 980 ? "mobile" : "desktop";

    window.addEventListener("resize", () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.aspect = this.width / this.height;
      this.pixelRatio = Math.min(window.devicePixelRatio, 2);
      this.emit("resize");

      if (this.width < 980 && this.device !== "mobile") {
        this.device = "mobile";
        this.emit("deviceswitch", this.device);
      } else if (this.width >= 980 && this.device !== "desktop") {
        this.device = "desktop";
        this.emit("deviceswitch", this.device);
      }
    });
  }
}
