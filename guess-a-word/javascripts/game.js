(function () {
  const WORD_BANK = ["apple", "banana", "orange", "pear"];
  const NEW_GAME_LINK = document.querySelector("#replay");
  const APPLES = document.querySelector("#apples");
  const MESSAGE = document.querySelector("#message");
  const SPACES = document.querySelector("#spaces");
  const GUESSES = document.querySelector("#guesses");

  class GuessWord {
    constructor() {
      this.unusedWords = [...WORD_BANK];
      this.chosenWord = null;
      this.triesRemaining = null;
      this.previousGuesses = null;

      this.newGame();
    }

    randomWord() {
      let wordIndex = Math.floor(Math.random() * this.unusedWords.length);
      return this.unusedWords.splice(wordIndex, 1)[0];
    }

    newGame() {
      NEW_GAME_LINK.hidden = true;
      this.chosenWord = this.randomWord();
      // console.log(this.chosenWord); // dev option
      if (this.chosenWord === undefined) {
        this.wordsExhausted();
      } else {
        this.clearLetters();
        this.generateSpaces();
        ["lose", "win"].forEach((attribute) =>
          document.body.classList.remove(attribute)
        );
        APPLES.className = "";

        NEW_GAME_LINK.hidden = true;
        this.triesRemaining = 6;
        this.previousGuesses = [];
      }
    }

    clearLetters() {
      [...SPACES.children, ...GUESSES.children].forEach((child) => {
        if (child.tagName === "SPAN") child.remove();
      });
    }

    generateSpaces() {
      for (let i = 0; i < this.chosenWord.length; i++) {
        let space = document.createElement("span");
        SPACES.appendChild(space);
      }
    }

    wordsExhausted() {
      MESSAGE.textContent = "Sorry, I've run out of words!";
      NEW_GAME_LINK.hidden = true;
    }

    userGuess(guessAttempt) {
      guessAttempt = guessAttempt.toLowerCase();

      if (guessAttempt.length > 1) return;
      if (!guessAttempt.match(/[a-z]/)) return;
      if (game.previousGuesses.includes(guessAttempt)) return;
      if (game.gameWon() || game.gameLost()) return;

      game.previousGuesses.push(guessAttempt);

      if (game.chosenWord.match(guessAttempt)) {
        game.letterMatched(guessAttempt);
      } else {
        game.letterNotMatched(guessAttempt);
      }
    }

    gameWon() {
      return [...SPACES.children].every((span) => span.innerText.length > 0);
    }

    gameLost() {
      return this.triesRemaining < 1;
    }

    letterMatched(guessAttempt) {
      let span = document.createElement("span");
      span.textContent = guessAttempt.toUpperCase();
      GUESSES.appendChild(span);

      [...this.chosenWord].forEach((letter, index) => {
        if (letter === guessAttempt) {
          SPACES.children[index + 1].textContent = letter.toUpperCase();
        }
      });

      if (this.gameWon()) {
        this.userWin();
      }
    }

    letterNotMatched(guessAttempt) {
      let span = document.createElement("span");
      span.textContent = guessAttempt.toUpperCase();
      GUESSES.appendChild(span);
      this.triesRemaining -= 1;
      APPLES.className = `guess_${6 - this.triesRemaining}`;

      if (this.triesRemaining < 1) this.userLose();
    }

    userWin() {
      NEW_GAME_LINK.hidden = false;
      document.body.classList.add("win");
    }

    userLose() {
      NEW_GAME_LINK.hidden = false;
      document.body.classList.add("lose");
    }
  }

  const game = new GuessWord();
  document.addEventListener("DOMContentLoaded", bindEventListeners);

  function bindEventListeners(_) {
    document.addEventListener("keyup", (event) => {
      event.preventDefault();
      game.userGuess(event.key);
    });

    NEW_GAME_LINK.addEventListener("click", (event) => {
      event.preventDefault();
      game.newGame();
    });
  }
})();
