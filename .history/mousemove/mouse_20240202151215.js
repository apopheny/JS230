// write some JavaScript code to move the red X to the last position in the document that the user clicked
let movementBox;
function moveXOnClick(event) {
  console.log(event.clientX);
  movementBox.style.left = event.clientX;
  movementBox.style.top = event.clientY;
}

function listenerLoader() {
  movementBox = document.querySelector("div.x");
  document.body.addEventListener("mousedown", moveXOnClick);
}

document.addEventListener("DOMContentLoaded", listenerLoader);
