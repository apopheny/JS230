function processData(arr, callback) {
  setTimeout(() => {
    callback(arr);
  }, 1000);
}

function doubleMap (arr) {
  console.log(arr.map(num => num * 2));
}

processData([1, 2, 3], doubleMap);