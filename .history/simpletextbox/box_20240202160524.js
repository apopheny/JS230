// Using the following code, write some JavaScript to add a character counter that updates as the user types
// Note how the text turns red when you have more than 140 characters in the text box.
let countField, inputField;

document.addEventListener("DOMContentLoaded", listenerLoader);

function listenerLoader(event) {
  countField = document.querySelector("p.counter");
  inputField = document.querySelector("div textarea");

  inputField.addEventListener("keydown", typingMonitor);
}

function typingMonitor(event) {
  console.log(event.key);
  let text = inputField.value;
  const submitButton = document.querySelector("div.composer button");

  countField.innerText = 140 - text.length + " characters remaining";
  if (text.length > 140) {
    submitButton.disabled = true;
    countField.style.color = "red";
  } else {
    countField.style.color = "black";
    submitButton.disabled = false;
  }
}
