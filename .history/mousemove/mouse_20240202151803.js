// write some JavaScript code to move the red X to the last position in the document that the user clicked
let movementBox;

function moveXOnClick(event) {
  movementBox.style.left = String(event.clientX);
  // movementBox.style.left = `${event.clientX}px`;
  // movementBox.style.top = `${event.clientY}px`;
  movementBox.style.top = String(event.clientY);
}

function listenerLoader() {
  movementBox = document.querySelector("div.x");
  document.addEventListener("mousedown", moveXOnClick);
}

document.addEventListener("DOMContentLoaded", listenerLoader);
