function basicCallback(func, num) {
  setTimeout(func, 2000, num);
}

function timesTwo(num) {
  return num * 2;
}

basicCallback(timesTwo, 2);