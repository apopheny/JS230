function eventDelegator () {
  const textField = document.querySelector('div.text-field');

  function textFieldClick (event) {
    if (event.target === textField) textField.classList.add('focused');
    else {
      textField.classList.remove('focused');
      event.stopPropagation();
    }
  }

  
  document.body.addEventListener('click', textFieldClick);
}

document.addEventListener('DOMContentLoaded', eventDelegator);