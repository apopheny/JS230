function waterfallOverCallbacks (callbackArr, val) {
  let result = val
  for (let i = 0; i < callbackArr.length; i += 1) {
    result = callbackArr[i](result);
  }

  console.log(result);
}

function double (x) {
  return x * 2;
}

waterfallOverCallbacks([double, double, double], 1);