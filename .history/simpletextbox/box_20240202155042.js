// Using the following code, write some JavaScript to add a character counter that updates as the user types
// Note how the text turns red when you have more than 140 characters in the text box.
let countField, inputField;

document.addEventListener("DOMContentLoaded", listenerLoader);

function listenerLoader(event) {
  countField = document.querySelector("p.counter");
  inputField = document.querySelector("div textarea");

  countField.addEventListener("keydown", typingMonitor);
}

function typingMonitor(event) {
  let text = inputField.nodeValue;
  console.log(text);
}
