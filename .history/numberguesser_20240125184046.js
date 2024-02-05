function eventDelegator () {
  function newHiddenNumber () {
    return Math.floor(Math.random() * 100) + 1;
  }

  function validateGuess (userInput) {
    let guessNumber = parseInt(userInput, 10);
    if (guessNumber > 100 || guessNumber < 0) return false;
    if (String(guessNumber) === userInput) return true;
    return false;
  }

  let answer = newHiddenNumber();
  let userGuessNode = document.body.querySelector('input#guess');
  const resultArea = document.body.querySelector('main p');
  const button = document.body.querySelector(`fieldset input[type="submit"]`);
  let guessCount = 0;

  function guessAndReply (event) {
    event.preventDefault();

    let guess = validateGuess(userGuessNode.value) && parseInt(userGuessNode.value, 10);
    
    let message;
    guessCount += 1;

    if (!guess) message = 'Cheater, cheater! You didn\'t guess a valid number!';
    else if (guess === answer) {
      message = `You guessed it! It took you ${guessCount} guesses.`;
      button.toggle('disabled');
      button.disabled = true;
    }
    else if (guess < answer) message = `My number is higher than ${guess}`;
    else message = `My number is lower than ${guess}`;

    resultArea.textContent = message;

  }
  
  const guessForm = document.body.querySelector('main form');
  guessForm.addEventListener('submit', guessAndReply);
  
  function newGame (event) {
    event.preventDefault();
    button.disabled = false;
    button.toggle('disabled');

    resultArea.textContent = 'Guess a number from 1-100:';
    answer = newHiddenNumber();
    guessCount = 0;
  }
  const newGameLink = document.body.querySelector('main a');
  newGameLink.addEventListener('click', newGame);
}

document.addEventListener('DOMContentLoaded', eventDelegator);