import { EventEmitter } from "events";

export default class Theme extends EventEmitter {
  constructor() {
    super();
    this.theme = "light";

    this.toggleButton = document.querySelector(".toggle-button");
    this.toggleCircle = document.querySelector(".toggle-circle");

    this.setEventListeners();
  }

  setEventListeners() {
    if (this.toggleButton) {
      this.toggleButton.addEventListener("click", () => {
        this.theme = this.theme === "light" ? "dark" : "light";
        this.toggleCircle.classList.toggle("slide");
        document
          .querySelector("body")
          .classList.toggle("dark-theme", this.theme === "dark");

        this.emit("theme_change", this.theme);
      });
    }
  }
}
