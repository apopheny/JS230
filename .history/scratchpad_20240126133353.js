function basicCallback(func, num) {
  setTimeout(() => {
    func(num);
  }, 2000);
}

function timesTwo(num) {
  console.log(num * 2);
}

basicCallback(timesTwo, 2);