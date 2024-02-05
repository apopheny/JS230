function startCounter (counter = 1, callback) {
  setInterval(() => {
    console.log(counter);
    counter += 1;
    if (counter > 5) return true;
  }, 1000)
}