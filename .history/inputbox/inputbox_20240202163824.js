// Write JavaScript to create an interval that adds or removes the class `cursor` from the text-field element every 500 milliseconds after the user clicks the text-field element. The code should toggle the `cursor` class every 500ms: on with one cycle, off with the next.
const textFieldExercise = (function () {
  let textField, content, cursorInterval;

  function addListeners(event) {
    textField = document.querySelector("div.text-field");
    textField.addEventListener("click", textFieldOnClick);
    document.addEventListener("click", textFieldOffClick);
  }

  function textFieldOnClick(event) {
    event.stopPropagation();
    const classes = textField.classList;

    classes.add("focused");
    if (!classes.contains("cursor")) {
      cursorInterval = setInterval(() => {
        classes.toggle("cursor");
      }, 500);
    }
  }

  function textFieldOffClick(event) {
    textField.classList.remove("focused");
    clearInterval(cursorInterval);
    textField.classList.remove("cursor");
  }

  return { addListeners };
})();

document.addEventListener("DOMContentLoaded", textFieldExercise.addListeners);
