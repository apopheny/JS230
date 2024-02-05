function delayLog() {
  for (let num = 1; num <= 10; num += 1) {
    setTimeout(() => {
      console.log(num);
    }, num * 1000);
  }
}

delayLog();
