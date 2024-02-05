// Write JavaScript to create an interval that adds or removes the class `cursor` from the text-field element every 500 milliseconds after the user clicks the text-field element. The code should toggle the `cursor` class every 500ms: on with one cycle, off with the next.
const textFieldExercise = (function () {
  let textField, content, cursorInterval;

  function addListeners(event) {
    textField = document.querySelector("div.text-field");
    textField.addEventListener("click", textFieldOnClick);
    document.addEventListener("click", textFieldOffClick);
    textField.addEventListener("keyup", textFieldKeyPress);
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
    event.preventDefault();
    if (event.key === "Backspace") {
      content.textContent = content.textContent.slice(0, -1);
    } else {
      content.textContent += event.key;
    }
  }

  return { addListeners };
})();

document.addEventListener("DOMContentLoaded", textFieldExercise.addListeners);
