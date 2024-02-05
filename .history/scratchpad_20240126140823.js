function startCounter (counter = 1, callback) {
  setInterval(() => {
    callback(counter);
    counter += 1;
    if (counter > 5) return true;
  }, 1000)
}

function logger(val) {
  console.log(val);
}

startCounter(1, logger);