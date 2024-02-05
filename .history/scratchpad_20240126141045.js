function startCounter (counter = 1, callback) {
  let interval = setInterval(() => {
    callback(counter, interval);
    counter += 1;
  }, 1000)
}

function intervalLogger(val, interval) {
  console.log(val);
  if (val === 5) clearInterval(interval);
}

startCounter(1, intervalLogger);