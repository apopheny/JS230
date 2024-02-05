const textFieldExercise = (function () {
  let textField, userText, cursorInterval;

  function addListeners(event) {
    textField = document.querySelector("div.text-field");
    userText = document.querySelector("div.content");

    textField.addEventListener("click", textFieldOnClick);
    document.addEventListener("click", textFieldOffClick);

    document.addEventListener("keyup", textFieldKeyPress);
  }

  function textFieldOnClick(event) {
    event.stopPropagation();
    const classes = textField.classList;

    classes.add("focused");
    if (!cursorInterval) {
      cursorInterval = setInterval(() => {
        classes.toggle("cursor");
      }, 500);
    }
  }

  function textFieldOffClick(event) {
    textField.classList.remove("focused");
    clearInterval(cursorInterval);
    cursorInterval = null;
    textField.classList.remove("cursor");
  }

  function textFieldKeyPress(event) {
    if (!cursorInterval) return;
    event.preventDefault();

    if (event.key === "Backspace") {
      userText.textContent = userText.textContent.slice(0, -1);
    } else if (event.key.length > 1) {
      return;
    } else {
      userText.textContent += event.key;
    }
  }

  return { addListeners };
})();

document.addEventListener("DOMContentLoaded", textFieldExercise.addListeners);
