function waterfallOverCallbacks (callbackArr) {
  let result = callbackArr.reduce((accum, current) => {
    return current(2) + accum;
  }, 0)

  console.log(result);
}

function double (x) {
  return x * 2;
}

waterfallOverCallbacks([double, double, double])