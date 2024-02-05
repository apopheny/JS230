function eventDelegator () {
  let answer = Math.floor(Math.random() * 100) + 1;

  function submissionListener (event) {
    event.preventDefault();

    let guess = document.body.querySelector('fieldset#guess');
    console.log(guess);
  }

  const submitButton = document.body.querySelector('input')
  submitButton.addEventListener('submit', submissionListener);
}

document.addEventListener('DOMContentLoaded', eventDelegator);