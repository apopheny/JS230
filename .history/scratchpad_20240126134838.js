function processData(arr, callback) {
  setTimeout(() => {
    const processed = arr.map(callback);
    console.log(processed)
  }, 1000);
}

function doubleNum (num) {
  return num * 2;
}

processData([1, 2, 3], doubleNum);