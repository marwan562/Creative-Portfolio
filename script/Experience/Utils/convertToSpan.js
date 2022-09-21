export default (element) => {
  element.style.overflow = "hidden";

  element.innerHTML = element.innerText
    .split("")
    .map((char) => {
      if (char === " ") {
        return `<span>${char}</span>`;
      }

      return `<span class="animatedSpan">${char}</span>`;
    })
    .join("");
};
