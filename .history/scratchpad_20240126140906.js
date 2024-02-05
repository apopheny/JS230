function startCounter (counter = 1, callback) {
  let interval = setInterval(() => {
    callback(counter);
    counter += 1;
    if (counter > 5) clearInterval(interval);
  }, 1000)
}

function logger(val) {
  console.log(val);
}

startCounter(1, logger);