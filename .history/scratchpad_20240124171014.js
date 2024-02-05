const startCounting = function() {
  let i = 1;
  function counter() {
    console.log(i);
    i += 1;
  }

  let interval = setInterval(counter, 1000);

  if (i > 10) clearInterval(interval);
}

setInterval(startCounting, 1000);