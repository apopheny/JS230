async function startCounting() {
  let num = 1;
  let timer = await setInterval(() => {
    console.log(num);
    num += 1;
  }, 1000);

  if (num >= 10) clearInterval(timer);
}

startCounting();
