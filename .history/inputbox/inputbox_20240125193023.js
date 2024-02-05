function eventDelegator () {
  const textField = document.querySelector('div.text-field');
  const userText = document.querySelector('div .content');
  userText.textContent = '';
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
    

  }

  document.body.addEventListener('click', bodyClick);
  textField.addEventListener('click', textFieldClick);
  textField.addEventListener('keyup', updateTextField);
}

document.addEventListener('DOMContentLoaded', eventDelegator);