function eventDelegator () {
  const textField = document.querySelector('div.text-field');
  let cursor;

  function toggleCursorClass() {
    cursor = textField.classList.toggle('cursor');
  }

  function textFieldClick (event) {
    event.stopPropagation();
    textField.classList.add('focused');
    setInterval(toggleCursorClass, 500);
  }

  function bodyClick (event) {
    textField.classList.remove('focused');
    clearInterval(cursor);
    textField.classList.remove('cursor');
  }

  function updateTextField (event) {
    if (!textField.classList.has('focused')) return;

    textField.textContent += event.value;
  }

  document.body.addEventListener('click', bodyClick);
  textField.addEventListener('click', textFieldClick);
  textField.addEventListener('keydown', updateTextField);
}

document.addEventListener('DOMContentLoaded', eventDelegator);