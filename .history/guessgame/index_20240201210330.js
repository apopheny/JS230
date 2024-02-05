function mainEvent(event) {
  let answer = Math.floor(Math.random() * 100) + 1;
}

function submitListener(event) {
  event.preventDefault();
  let guess = document.querySelector("#guess").value;
  console.log(guess);
}

document.addEventListener("DOMContentLoaded", mainEvent);
document.querySelector("form").addEventListener("submit", submitListener);
