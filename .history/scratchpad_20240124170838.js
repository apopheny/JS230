const startCounting = function() {
  let i = 1;
  function counter() {
    console.log(i);
    i += 1;
  }

  if (i === 20) clearInterval(startCounting);

  setInterval(counter, 1000);
}

setInterval(startCounting, 1000);