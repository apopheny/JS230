function startCounting() {
  let num = 1;
  let timer = setInterval(() => {
    console.log(num);
    num += 1;
  }, 1000);

  if (num >= 10) clearInterval(timer);
}

startCounting();
