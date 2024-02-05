function eventDelegator () {
  let answer = Math.floor(Math.random() * 100) + 1;
  let userGuessNode = document.body.querySelector('input#guess');

  function submissionListener (event) {
    event.preventDefault();

    let guess = parseInt(userGuessNode.value, 10);
    console.log(guess);
  }
  
  const guessForm = document.body.querySelector('main form');
  guessForm.addEventListener('submit', submissionListener);
}

document.addEventListener('DOMContentLoaded', eventDelegator);