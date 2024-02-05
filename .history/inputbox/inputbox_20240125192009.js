function eventDelegator () {
  const textField = document.querySelector('div.text-field');

  function toggleCursorClass(node) {
    node.classList.toggle('cursor');
  }

  function textFieldClick (event) {
    event.stopPropagation();
    textField.classList.add('focused');
    setInterval(toggleCursorClass(textField), 500);
  }

  function bodyClick (event) {
    textField.classList.remove('focused');
  }

  document.body.addEventListener('click', bodyClick);
  textField.addEventListener('click', textFieldClick);
}

document.addEventListener('DOMContentLoaded', eventDelegator);