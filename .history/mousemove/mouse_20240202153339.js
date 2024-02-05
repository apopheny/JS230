// Update your solution to the previous problem to change the color of the red X to blue when the user presses the `b` key, green in response to the `g` key, and red in response to `r`. The X should continue to follow the mouse around.

let movementBox;

function followMouse(event) {
  movementBox.style.left = `${event.clientX}px`;
  movementBox.style.top = `${event.clientY}px`;
}

function changeRGB(event) {
  event.preventDefault();
  const key = event.key.toLowerCase();

  let color;
  switch (key) {
    case "r":
      color = "red";
      break;
    case "g":
      color = "green";
      break;
    case "b":
      color = "blue";
      break;
  }

  console.log(key, color);
  if (color) {
    [...movementBox.children].forEach((ele) => (ele.style.background = color));
  }
}

function listenerLoader() {
  movementBox = document.querySelector("div.x");
  document.addEventListener("mousemove", followMouse);
  document.addEventListener("keydown", changeRGB);
}

document.addEventListener("DOMContentLoaded", listenerLoader);
