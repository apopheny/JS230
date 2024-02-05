function mainEvent(event) {
  let answer = Math.floor(Math.random() * 100) + 1;
}

function submitListener(event) {
  event.preventDefault();
  let guess = parseInt(document.querySelector("#guess").value, 10);
  console.log(guess);
}

document.addEventListener("DOMContentLoaded", mainEvent);
document.querySelector("#form").addEventListener("submit", submitListener);
