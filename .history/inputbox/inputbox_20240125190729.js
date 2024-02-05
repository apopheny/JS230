function eventDelegator () {
  const textField = document.querySelector('div.text-field');

  function textFieldClick (event) {
    textField.classList.add('focused');
  }

  document.body.addEventListener('click', textFieldClick);
}

document.addEventListener('DOMContentLoaded', eventDelegator);