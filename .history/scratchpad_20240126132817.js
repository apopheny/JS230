function basicCallback(func, num) {
  console.log(setTimeout(func(num), 2000) * 2);
}

function timesTwo(num) {
  return num * 2;
}

basicCallback(timesTwo, 2);