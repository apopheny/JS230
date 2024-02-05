function processData(arr, callback) {
  setTimeout(() => {
    callback(arr.map(callback));
  }, 1000);
}

function doubleNum (num) {
  return num * 2;
}

processData([1, 2, 3], doubleNum);