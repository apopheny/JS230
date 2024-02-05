function eventDelegator () {
  const textField = document.querySelector('div.text-field');
  const userText = document.querySelector('div.content');
  
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
    event.preventDefault();
    if (!textField.classList.contains('focused')) return;
    
    if (event.shiftKey) userText.textContent += event.key.toUpperCase();
    else userText.textContent += event.key;
  }

  document.body.addEventListener('click', bodyClick);
  textField.addEventListener('click', textFieldClick);
  document.body.addEventListener('keyup', updateTextField);
}

document.addEventListener('DOMContentLoaded', eventDelegator);