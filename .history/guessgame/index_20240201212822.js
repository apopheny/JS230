let answer = generateHiddenNumber();

function generateHiddenNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

function listenerLoader(event) {
  const guessForm = document.querySelector("form");
  guessForm.addEventListener("submit", guessSubmitListener);

  const newGameLink = document.querySelector("main a");
  newGameLink.addEventListener("click", newGameListener);
}

function newGameListener(event) {
  event.preventDefault();
  answer = generateHiddenNumber();
  document.querySelector("main p").textContent = "Guess a number";
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
