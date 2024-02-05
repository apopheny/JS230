function eventDelegator () {
  const textField = document.querySelector('div.text-field');

  function textFieldClick (event) {
    event.stopPropagation();
    textField.classList.add('focused');
  }

  function bodyClick (event) {
    textField.classList.remove('focused');
  }

  document.body.addEventListener('click', bodyClick);
  textField.addEventListener('click', textFieldClick);
}

document.addEventListener('DOMContentLoaded', eventDelegator);