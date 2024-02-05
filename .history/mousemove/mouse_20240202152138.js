// Update your solution to the previous problem to make the red X move as you move the mouse around the document instead of depending on clicks.
let movementBox;

function followMouse(event) {
  movementBox.style.left = `${event.clientX}px`;
  movementBox.style.top = `${event.clientY}px`;
}

function listenerLoader() {
  movementBox = document.querySelector("div.x");
  document.addEventListener("mousemove", followMouse);
}

document.addEventListener("DOMContentLoaded", listenerLoader);
