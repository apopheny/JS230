function basicCallback(func, num) {
  console.log(setTimeout(func, 2000, num) * 2);
}

function timesTwo(num) {
  return num * 2;
}

basicCallback(timesTwo, 2);