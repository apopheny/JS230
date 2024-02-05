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
  document.querySelector("main p").textContent = "Guess a number 1-100";
}

function guessSubmitListener(event) {
  event.preventDefault();

  let userInput = document.querySelector("#guess").value;
  let guess = parseInt(userInput, 10);
  let message;

  if (guess === answer) {
    message = "You guessed it!";
  } else {
    message = `My number is ${guess < answer ? "higher" : "lower"} than ${guess}`;
  }
  if (guess > 100 || !Number.isFinite(Number(userInput))) {
    message = "Cheater cheater! You didn't enter a valid number!";
  }

  let computerResponse = document.querySelector("main p");
  computerResponse.textContent = message;

  const button = document.querySelectorAll("input")[1];
  if (computerResponse === "You guessed it!") {
    button.disabled = true;
  }
}

document.addEventListener("DOMContentLoaded", listenerLoader);
