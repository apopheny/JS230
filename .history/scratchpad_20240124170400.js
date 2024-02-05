const startCounting = function() {
  function makeCounter(i) {
    return function() {
      console.log(i);
    }
  }

  for (let i = 1; i < 21; i += 1) {
    setTimeout(makeCounter(i), 1000)
  }
}

setInterval(startCounting, 1000);