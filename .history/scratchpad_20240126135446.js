function waterfallOverCallbacks (callbackArr, val) {
  let result = callbackArr.reduce((accum, current) => {
    val = accum || val;
    return current(val) + accum;
  }, 0)

  console.log(result);
}

function double (x) {
  return x * 2;
}

waterfallOverCallbacks([double, double, double], 1);