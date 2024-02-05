// write some JavaScript code to move the red X to the last position in the document that the user clicked
let movementBox = document.querySelector("div .x");

function moveXOnClick(event) {
  // event.stopPropagation();
  movementBox.setAttribute("left", event.clientX);
  movementBox.setAttribute("top", event.clientY);
}

function listenerLoader() {
  document.body.addEventListener("mousedown", moveXOnClick);
}

document.addEventListener("DOMContentLoaded", listenerLoader);
