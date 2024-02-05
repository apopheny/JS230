function eventDelegator () {
  let answer = Math.floor(Math.random() * 100) + 1;
  let userGuessNode = document.body.querySelector('input#guess');

  function submissionListener (event) {
    event.preventDefault();

    let guess = parseInt(userGuessNode.value, 10);
    let message;

    if (guess === answer) message = 'You guessed it!';
    else if (guess < answer) message = `My number is higher than ${guess}`;
    else message = `My number is lower than ${guess}`;

    const resultArea = document.body.querySelector('main p');
    resultArea.textContent = message;
  }
  
  const guessForm = document.body.querySelector('main form');
  guessForm.addEventListener('submit', submissionListener);

}

document.addEventListener('DOMContentLoaded', eventDelegator);