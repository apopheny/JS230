function eventDelegator () {
  let answer = Math.floor(Math.random() * 100) + 1;

  function submissionListener (event) {
    event.preventDefault();

    let guess = document.body.querySelector('input#guess').value;
    console.log(guess);
  }
  
  const guessForm = document.body.querySelector('main form');
  guessForm.addEventListener('submit', submissionListener);
}

document.addEventListener('DOMContentLoaded', eventDelegator);