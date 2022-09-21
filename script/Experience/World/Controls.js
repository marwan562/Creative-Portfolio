import Experience from "../Experience";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ASScroll from "@ashthornton/asscroll";

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.room = this.experience.world.room.actualRoom;
    this.sizes = this.experience.sizes;
    this.camera = this.experience.camera.orthographicCamera;
    this.circles = this.experience.world.floor.circles;
    this.roomChildren = this.experience.world.room.roomChildren;
    gsap.registerPlugin(ScrollTrigger);
    document.querySelector(".page-wrapper ").style.height = "auto";

    this.asscroll = this.setupASScroll();

    this.setScrollTrigger();
  }

  setScrollTrigger() {
    ScrollTrigger.matchMedia({
      // Desktop
      "(min-width: 980px)": () => {
        this.room.scale.set(0.2, 0.2, 0.2);

        // -------------- First Section --------------
        this.firstMoveTimeline = gsap
          .timeline({
            scrollTrigger: {
              trigger: ".first-move",
              start: "top top",
              end: "bottom bottom",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          })
          .to(this.room.position, {
            x: () => this.sizes.width * 0.0017,
          });

        // -------------- second Section --------------
        this.secondMoveTimeline = gsap
          .timeline({
            scrollTrigger: {
              trigger: ".second-move",
              start: "top top",
              end: "bottom bottom",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          })
          .to(
            this.room.scale,
            {
              x: 0.48,
              y: 0.48,
              z: 0.48,
            },
            0,
          )
          .to(
            this.room.position,
            {
              x: () => 0,
            },
            0,
          );

        // -------------- third Section --------------
        this.thirdMoveTimeline = gsap
          .timeline({
            scrollTrigger: {
              trigger: ".third-move",
              start: "top top",
              end: "bottom bottom",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          })
          .to(
            this.camera.position,
            {
              x: () => -this.sizes.width * 0.0026,
              z: () => 5 + this.sizes.height * 0.0065,
            },
            0,
          );
      },

      // Mobile
      "(max-width: 980px)": () => {
        this.room.scale.set(0.1, 0.1, 0.1);
        this.room.position.set(0, 0, -1);

        this.firstMoveTimeline = gsap
          .timeline({
            scrollTrigger: {
              trigger: ".first-move",
              start: "top top",
              end: "bottom bottom",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          })
          .to(this.room.scale, {
            x: 0.13,
            y: 0.13,
            z: 0.13,
          });

        this.secondMoveTimeline = gsap
          .timeline({
            scrollTrigger: {
              trigger: ".second-move",
              start: "top top",
              end: "bottom bottom",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          })
          .to(
            this.room.scale,
            {
              x: 0.4,
              y: 0.4,
              z: 0.4,
            },
            0,
          )
          .to(
            this.room.position,
            {
              x: 1.8,
            },
            0,
          );

        // -------------- third Section --------------
        this.thirdMoveTimeline = gsap
          .timeline({
            scrollTrigger: {
              trigger: ".third-move",
              start: "top top",
              end: "bottom bottom",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          })
          .to(
            this.camera.position,
            {
              x: 0.5,
              z: () => this.sizes.height * 0.011,
            },
            0,
          );
      },

      // all
      all: () => {
        // -------------- First Section --------------
        this.firstMoveTimeline = gsap
          .timeline({
            scrollTrigger: {
              trigger: ".first-move",
              start: "top top",
              end: "bottom bottom",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          })
          .to(this.circles.pink.scale, {
            x: 15,
            y: 15,
            z: 15,
          });
        // -------------- second Section --------------
        this.secondMoveTimeline = gsap
          .timeline({
            scrollTrigger: {
              trigger: ".second-move",
              start: "top top",
              end: "bottom bottom",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          })
          .to(this.circles.blue.scale, {
            x: 15,
            y: 15,
            z: 15,
          });
        // -------------- third Section --------------
        this.thirdMoveTimeline = gsap
          .timeline({
            scrollTrigger: {
              trigger: ".third-move",
              start: "top top",
              end: "bottom bottom",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          })
          .to(this.circles.green.scale, {
            x: 15,
            y: 15,
            z: 15,
          });
        gsap
          .timeline({
            scrollTrigger: {
              trigger: ".third-move",
              start: "center top",
            },
          })
          .to(this.roomChildren.minifloor.position, {
            z: -7.47617,
          })
          .to(this.roomChildren.mailbox.scale, {
            z: 0.4,
            y: 0.4,
            x: 0.4,
          });

        document.querySelectorAll(".section").forEach((section) => {
          gsap.to(section.querySelector(".progress-bar"), {
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
            },
            height: "100%",
          });

          if (section.classList.contains("left")) {
            gsap.to(section, {
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "top top",
                scrub: 0.6,
              },
              borderTopRightRadius: 0,
            });
            gsap.to(section, {
              scrollTrigger: {
                trigger: section,
                start: "bottom bottom",
                end: "bottom top",
                scrub: 0.6,
              },
              borderBottomRightRadius: 700,
            });
          } else {
            gsap.to(section, {
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "top top",
                scrub: 0.6,
              },
              borderTopLeftRadius: 0,
            });
            gsap.to(section, {
              scrollTrigger: {
                trigger: section,
                start: "bottom bottom",
                end: "bottom top",
                scrub: 0.6,
              },
              borderBottomLeftRadius: 700,
            });
          }
        });
      },
    });
  }

  resize() {}

  update() {}

  setupASScroll() {
    // https://github.com/ashthornton/asscroll
    const asscroll = new ASScroll({
      disableRaf: true,
    });

    gsap.ticker.add(asscroll.update);

    ScrollTrigger.defaults({
      scroller: asscroll.containerElement,
    });

    ScrollTrigger.scrollerProxy(asscroll.containerElement, {
      scrollTop(value) {
        if (arguments.length) {
          asscroll.currentPos = value;
          return;
        }
        return asscroll.currentPos;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      fixedMarkers: true,
    });

    asscroll.on("update", ScrollTrigger.update);
    ScrollTrigger.addEventListener("refresh", asscroll.resize);

    requestAnimationFrame(() => {
      asscroll.enable({
        newScrollElements: document.querySelectorAll(
          ".gsap-marker-start, .gsap-marker-end, [asscroll]",
        ),
      });
    });
    return asscroll;
  }
}
