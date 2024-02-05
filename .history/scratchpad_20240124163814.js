delaylog = (function() {
  for (let i = 1; i < 11; i += 1) {
    setTimeout(numLog(i), i * 1000);
  }

  function numLog(num) {
    console.log(num);
  }
})();