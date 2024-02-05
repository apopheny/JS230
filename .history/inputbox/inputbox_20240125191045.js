function eventDelegator () {
  const textField = document.querySelector('div.text-field');

  function textFieldClick (event) {
    textField.classList.add('focused');
  }

  function bodyClick (event) {
    textField.classList.remove('focused');
  }

  document.body.addEventListener('click', textFieldClick);
  document.body.addEventListener('click', bodyClick);
}

document.addEventListener('DOMContentLoaded', eventDelegator);