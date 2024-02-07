(function () {
  const WORD_BANK = ["apple", "banana", "orange", "pear"];
  class GuessWord {
    constructor() {
      this.unusedWords = [...WORD_BANK];
      this.chosenWord = null;
      this.triesRemaining = null;
      this.previousGuesses = [];

      this.apples = document.querySelector("#apples");
      this.message = document.querySelector("#message");
      this.spaces = document.querySelector("#spaces");
      this.guesses = document.querySelector("#guesses");
      this.newGameLink = document.querySelector("#replay");
      this.newGameLink.hidden = true;

      document.addEventListener("DOMContentLoaded", this.bindEventListeners);
    }

    bindEventListeners(_) {
      function userGuess(event) {
        event.preventDefault();
        game.userGuess(event.key);
      }

      document.addEventListener("keyup", game.userGuess);
      game.newGameLink.addEventListener("click", game.newGame);
      game.newGameLink.dispatchEvent(new MouseEvent("click"));
    }

    randomWord() {
      let wordIndex = Math.floor(Math.random() * this.unusedWords.length);
      return this.unusedWords.splice(wordIndex, 1)[0];
    }

    newGame(event) {
      event.preventDefault();
      game.chosenWord = game.randomWord();
      console.log(game.chosenWord);
      if (game.chosenWord === undefined) {
        game.wordsExhausted();
      } else {
        game.clearLetters();
        game.generateSpaces();
        ["lose", "win"].forEach((attribute) =>
          document.body.classList.remove(attribute)
        );
        game.apples.className = "";

        game.newGameLink.hidden = true;
        game.triesRemaining = 6;
        game.previousGuesses = [];
      }
    }

    clearLetters() {
      [...this.spaces.children, ...this.guesses.children].forEach((child) => {
        if (child.tagName === "SPAN") child.remove();
      });
    }

    generateSpaces() {
      for (let i = 0; i < this.chosenWord.length; i++) {
        let space = document.createElement("span");
        this.spaces.appendChild(space);
      }
    }

    wordsExhausted() {
      this.message.textContent = "Sorry, I've run out of words!";
      this.newGameLink.hidden = true;
    }

    userGuess(event) {
      event.preventDefault();
      let guessAttempt = event.key.toLowerCase();

      if (guessAttempt.length > 1) return;
      if (game.previousGuesses.includes(guessAttempt)) return;
      game.previousGuesses.push(guessAttempt);

      if (game.chosenWord.match(guessAttempt)) {
        game.letterMatched(guessAttempt);
      } else {
        game.letterNotMatched(guessAttempt);
      }

      console.log(game.triesRemaining);
    }

    letterMatched(guessAttempt) {
      let span = document.createElement("span");
      span.textContent = guessAttempt.toUpperCase();
      this.guesses.appendChild(span);

      [...this.chosenWord].forEach((letter, index) => {
        if (letter === guessAttempt) {
          this.spaces.children[index + 1].textContent = letter.toUpperCase();
        }
      });
      console.log([...this.spaces.children].map((child) => child.innerText));
      if (
        [...this.spaces.children].every((span) => span.innerText.length > 0)
      ) {
        this.userWin();
      }
    }

    letterNotMatched(guessAttempt) {
      let span = document.createElement("span");
      span.textContent = guessAttempt.toUpperCase();
      this.guesses.appendChild(span);
      this.triesRemaining -= 1;
      this.apples.className = `guess_${6 - this.triesRemaining}`;

      if (this.triesRemaining < 1) this.userLose();
    }

    userWin() {
      this.newGameLink.hidden = false;
      document.body.classList.add("win");
    }

    userLose() {
      this.newGameLink.hidden = false;
      document.body.classList.add("lose");
    }
  }

  const game = new GuessWord();
})();
