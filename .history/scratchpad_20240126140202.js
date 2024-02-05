function waterfallOverCallbacks (callbackArr, val) {
  let result = 0
  for (let i = 0; i < callbackArr.length; i += 1) {
    result += callbackArr[i](result || val);
  }

  console.log(result);
}

function double (x) {
  return x * 2;
}

waterfallOverCallbacks([double, double, double], 1);