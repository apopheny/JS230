function eventDelegator () {
  const textField = document.querySelector('div.text-field');

  function textFieldClick (event) {
    textField.classList.add('focused');
  }

  function bodyClick (event) {
    event.stopPropagation();
    textField.classList.remove('focused');
  }

  document.body.addEventListener('click', bodyClick);
  textField.addEventListener('click', textFieldClick);
}

document.addEventListener('DOMContentLoaded', eventDelegator);