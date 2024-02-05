function eventDelegator () {
  let answer = Math.floor(Math.random() * 100) + 1;

  function submissionListener (event) {
    event.preventDefault();

    let guess = document.body.querySelector('fieldset#guess');
    console.log(guess);
  }
  
  const submitButton = document.body.querySelector('fieldset input[value="Guess"]');
  submitButton.addEventListener('submit', submissionListener);
}

document.body.addEventListener('DOMContentLoaded', eventDelegator);