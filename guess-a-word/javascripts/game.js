const WORD_BANK = ["apple", "banana", "orange", "pear"];

class GuessWord {
  constructor() {
    this.unusedWords = [...WORD_BANK];
    this.usedWords = [];
  }

  randomWord() {
    let wordIndex = Math.floor(Math.random() * this.unusedWords.length);
    this.usedWords.push(this.unusedWords[wordIndex]);
    return this.unusedWords.splice(wordIndex, 1);
  }
}
