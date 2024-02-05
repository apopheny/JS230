delaylog = (function() {
  function numLog(num) {
    console.log(num);
  }

  for (let i = 1; i < 11; i += 1) {
    setTimeout(numLog(i), i * 1000);
  }
})();