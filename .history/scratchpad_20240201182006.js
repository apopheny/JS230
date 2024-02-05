function startCounting() {
  let num = 1;
  return setInterval(() => {
    console.log(num);
    num += 1;
    if (num > 10) clearInterval(timer);
  }, 1000);
}

startCounting();
