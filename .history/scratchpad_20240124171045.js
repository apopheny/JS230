const startCounting = function() {
  let i = 1;
  function counter() {
    console.log(i);
    i += 1;
  }

  if (i > 10) clearInterval(interval);
  var interval = setInterval(counter, 1000);
}

setInterval(startCounting, 1000);