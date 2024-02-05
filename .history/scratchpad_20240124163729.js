delaylog = (function() {
  for (let i = 1; i < 11; i += 1) {
    setTimeout(i * 1000, numLog);
  }

  function numLog(num) {
    console.log(num);
  }
})();