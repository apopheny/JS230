function mainEvent(event) {
  const guessForm = document.querySelector("form");
  guessForm.addEventListener("submit", guessSubmitListener);
}

function guessSubmitListener(event) {
  let answer = Math.floor(Math.random() * 100) + 1;
  event.preventDefault();
  let guess = parseInt(document.querySelector("#guess").value, 10);
  console.log(guess);
}

document.addEventListener("DOMContentLoaded", mainEvent);
