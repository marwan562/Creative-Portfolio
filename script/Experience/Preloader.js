import { EventEmitter } from "events";
import Experience from "./Experience";
import gsap from "gsap";
import convertToSpan from "./Utils/convertToSpan";

export default class Preloader extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.camera = this.experience.camera.orthographicCamera;
    this.world = this.experience.world;
    this.device = this.sizes.device;
    this.scaleFlag = false;

    this.sizes.on("deviceswitch", (device) => {
      this.device = device;
    });

    this.world.on("worldready", () => {
      this.setAssets();
      this.playIntro();
    });
  }

  setAssets() {
    convertToSpan(document.querySelector(".intro-text"));
    convertToSpan(document.querySelector(".hero-main-title"));
    convertToSpan(document.querySelector(".hero-main-description"));
    convertToSpan(document.querySelector(".hero-second-subheading"));
    convertToSpan(document.querySelector(".sub-sec"));
    this.room = this.experience.world.room.actualRoom;
    this.roomChildren = this.experience.world.room.roomChildren;
  }

  firstIntro() {
    return new Promise((resolve) => {
      this.timeline = gsap.timeline().to(".preloader", {
        opacity: "0",
        onComplete: () => {
          document.querySelector(".preloader").style.display = "none";
        },
      });
      if (this.device === "desktop") {
        this.timeline
          .to(this.room.scale, {
            x: 0.03,
            y: 0.03,
            z: 0.03,
            duration: 1,
          })
          .to(this.room.position, {
            x: -1.75,
          });
      } else {
        this.timeline
          .to(this.room.scale, {
            x: 0.02,
            y: 0.02,
            z: 0.02,
            duration: 1,
          })
          .to(this.room.position, {
            z: -1.5,
          });
      }

      this.timeline

        .to(".intro-text .animatedSpan", {
          yPercent: 300,
          stagger: 0.02,
          ease: "back.out(1.4)",
          onComplete: resolve,
        })
        .to(".scroll-arrow", {
          visibility: "visible",
        });
    });
  }

  secondIntro() {
    new Promise((resolve) => {
      this.scaleFlag = false;
      this.secondtimeline = gsap.timeline({
        defaults: {
          duration: 1.2,
        },
      });

      this.roomScale = this.device === "mobile" ? 0.1 : 0.2;

      this.secondtimeline
        .to(".scroll-arrow", {
          visibility: "hidden",
        })
        .to(
          ".intro-text .animatedSpan",
          {
            yPercent: -300,
            stagger: 0.02,
          },
          0,
        )
        .to(
          this.room.position,
          {
            x: 0,
            y: 0.1,
            onStart: () => this.camera.lookAt(0, 1, 0),
          },
          1,
        )
        .to(
          this.room.scale,
          {
            x: this.roomScale,
            y: this.roomScale,
            z: this.roomScale,
            duration: 1,
            ease: "back.out(2.5)",
          },
          1,
        )
        .to(
          this.roomChildren.cubee.scale,
          {
            x: 0,
            y: 0,
            z: 0,
            delay: 0.3,
          },
          1,
        )
        .to(
          this.room.rotation,
          {
            y: Math.PI * 4.754,
          },
          1,
        )
        .to(
          this.roomChildren.wcover1.scale,
          {
            x: 0,
            y: 0,
            z: 0,
          },
          2,
        )
        .to(
          this.roomChildren.wcover2.scale,
          {
            x: 0,
            y: 0,
            z: 0,
          },
          2,
        )
        .to(
          this.roomChildren.chair.rotation,
          {
            y: Math.PI * 3.5,
          },
          2,
        )
        .to(
          ".hero-main-title .animatedSpan",
          {
            yPercent: 300,
            stagger: 0.02,
            ease: "back.out(1.4)",
          },
          3,
        )
        .to(
          ".hero-main-description .animatedSpan",
          {
            yPercent: 300,
            stagger: 0.02,
            ease: "back.out(1.4)",
          },
          3,
        )
        .to(
          ".hero-second-subheading .animatedSpan",
          {
            yPercent: 300,
            stagger: 0.02,
            ease: "back.out(1.4)",
          },
          3,
        )
        .to(
          ".sub-sec .animatedSpan",
          {
            yPercent: 300,
            stagger: 0.02,
            ease: "back.out(1.4)",
            onComplete: () => {
              resolve();
              this.emit("roomintrodone");
            },
          },
          3,
        );

      if (this.device === "mobile") {
        this.secondtimeline.to(
          this.room.position,
          {
            y: 0,
            z: -1,
          },
          1,
        );
      }
    });
  }

  async onScroll(e) {
    if (e.deltaY < 0) return;
    await this.secondIntro();
    window.removeEventListener("wheel", this.onScrollListener);
  }

  touchStart(e) {
    this.firstTouch = e.changedTouches[0].clientY;
    window.removeEventListener("touchstart", this.onTouchStart);
  }
  touchMove(e) {
    if (this.firstTouch < e.changedTouches[0].clientY) return;
    this.secondIntro();
    window.removeEventListener("touchmove", this.onTouchMove);
  }

  async playIntro() {
    await this.firstIntro();
    this.scaleFlag = true;
    this.onScrollListener = this.onScroll.bind(this);
    this.onTouchStart = this.touchStart.bind(this);
    this.onTouchMove = this.touchMove.bind(this);
    window.addEventListener("wheel", this.onScrollListener);
    window.addEventListener("touchstart", this.onTouchStart);
    window.addEventListener("touchmove", this.onTouchMove);
  }

  update() {
    if (this.scaleFlag) {
      if (this.device === "desktop") {
        this.room.position.set(-1.75, -0.1, 0);
        this.room.scale.set(0.03, 0.03, 0.03);
      } else {
        this.room.position.set(0, -0.1, -1.5);
        this.room.scale.set(0.02, 0.02, 0.02);
      }
    }
  }
}
