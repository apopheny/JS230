function eventDelegator () {
  let answer = Math.floor(Math.random() * 100) + 1;

  function submissionListener (event) {
    event.preventDefault();

    let guess = document.body.querySelector('input#guess');
    console.log(guess);
  }
  
  const guessField = document.body.querySelector('fieldset');
  guessField.addEventListener('submit', submissionListener);
}

document.addEventListener('DOMContentLoaded', eventDelegator);