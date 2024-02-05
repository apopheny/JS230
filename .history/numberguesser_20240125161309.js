function eventDelegator () {
  let answer = Math.floor(Math.random() * 100) + 1;

  function submissionListener (event) {
    let guess = document.body.querySelector('fieldset#guess').textContent;
    console.log(guess);
  }

  const submitButton = document.body.querySelector('input[value="Guess"]')
  submitButton.addEventListener('submit', submissionListener);
}

document.addEventListener('DOMContentLoaded', eventDelegator);