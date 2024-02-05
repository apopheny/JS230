function startCounting() {
  let num = 1;
  return setInterval(() => {
    console.log(num);
    num += 1;
  }, 1000);
}

function stopCounting() {
  if (num > 10) clearInterval(timer);
}

w;
