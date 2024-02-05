let countField, inputField;

document.addEventListener("DOMContentLoaded", listenerLoader);

function listenerLoader(event) {
  countField = document.querySelector("p.counter");
  inputField = document.querySelector("div textarea");

  inputField.addEventListener("keyup", typingMonitor);
}

function typingMonitor(event) {
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
