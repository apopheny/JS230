function eventDelegator () {
  function newHiddenNumber () {
    return Math.floor(Math.random() * 100) + 1;
  }

  function validateGuess (userInput) {
    const guessNumber = parseInt(userInput, 10);
    if (guessNumber > 100 || guessNumber < 100) return false;
    if (String(guessNumber) === userInput) return true;
    return false;
  }

  let answer = newHiddenNumber();
  let userGuessNode = document.body.querySelector('input#guess');
  const resultArea = document.body.querySelector('main p');

  function guessAndReply (event) {
    event.preventDefault();

    let guess = validateGuess(userGuessNode.value) && parseInt(userGuessNode.value, 10);
    
    let message;

    if (!guess) message = 'Cheater, cheater! You didn\'t guess a valid number!';
    else if (guess === answer) message = 'You guessed it!';
    else if (guess < answer) message = `My number is higher than ${guess}`;
    else message = `My number is lower than ${guess}`;

    resultArea.textContent = message;
  }
  
  const guessForm = document.body.querySelector('main form');
  guessForm.addEventListener('submit', guessAndReply);
  
  function newGame (event) {
    event.preventDefault();
    resultArea.textContent = 'Guess a number from 1-100:';
    answer = newHiddenNumber();
  }
  const newGameLink = document.body.querySelector('main a');
  newGameLink.addEventListener('click', newGame);
}

document.addEventListener('DOMContentLoaded', eventDelegator);