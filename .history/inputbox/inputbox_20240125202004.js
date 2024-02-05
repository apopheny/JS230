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

  function handleKeyModifiers (eventKey) {
    if (eventKey.match(/Backspace/)) {
      userText.textContent = userText.textContent.slice(0, -1);
      return;
    }

    if (eventKey.match(/Shift/)) {
      userText.textContent += eventKey.replace(/Shift/, '').toUpperCase();
      return;
    }

    userText.textContent += eventKey;
  }

  function updateTextField (event) {
    event.preventDefault();
    if (!textField.classList.contains('focused')) return;
    
    handleKeyModifiers(event.key)
  }

  document.body.addEventListener('click', bodyClick);
  textField.addEventListener('click', textFieldClick);
  document.body.addEventListener('keyup', updateTextField);
}

document.addEventListener('DOMContentLoaded', eventDelegator);