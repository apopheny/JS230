let interval

const startCounting = function() {
  let i = 1;
  function counter() {
    console.log(i);
    i += 1;
  }

  interval = setInterval(counter, 1000);
}

const stopCounting = function() {
  clearInterval(interval);
}