// Write JavaScript to add the `focused` class to the text-field element when the user clicks the element.
const textFieldExercise = (function () {
  let textField, content;

  function addListeners(event) {
    textField = document.querySelector("div.text-field");
    textField.addEventListener("click", textFieldOnClick);
    document.body.addEventListener("click", textFieldOffClick);
  }

  function textFieldOnClick(event) {
    event.stopPropagation();
    textField.classList.add("focused");
  }

  function textFieldOffClick(event) {
    textField.classList.remove("focused");
  }

  return { addListeners };
})();

document.addEventListener("DOMContentLoaded", textFieldExercise.addListeners);
