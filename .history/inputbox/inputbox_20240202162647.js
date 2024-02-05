// Write JavaScript to add the `focused` class to the text-field element when the user clicks the element.
const textFieldExercise = (function () {
  let textField, content;

  function addListeners(event) {
    textField = document.querySelector("div.text-field");
    textField.addEventListener("click", onTextFieldClick);
  }

  function onTextFieldClick(event) {
    textField.classList.add("focused");
  }

  return { addListeners };
})();

document.addEventListener("DOMContentLoaded", textFieldExercise.addListeners);
