let answer = newGameListener(null);

function listenerLoader(event) {
  const guessForm = document.querySelector("form");
  guessForm.addEventListener("submit", guessSubmitListener);

  const newGameLink = document.querySelector("main a");
}

function newGameListener(event) {
  return Math.floor(Math.random() * 100) + 1;
}

function guessSubmitListener(event) {
  event.preventDefault();

  let guess = parseInt(document.querySelector("#guess").value, 10);

  let message;
  if (guess === answer) {
    message = "You guessed it!";
  } else {
    message = `My number is ${guess < answer ? "higher" : "lower"} than ${guess}`;
  }

  let computerResponse = document.querySelector("main p");
  computerResponse.textContent = message;
}

document.addEventListener("DOMContentLoaded", listenerLoader);
