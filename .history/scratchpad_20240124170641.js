const startCounting = function() {
  let i = 1;
  function counter() {
    console.log(i);
    i += 1;
  }

  setInterval(counter, 1000);
}

setInterval(startCounting, 1000);