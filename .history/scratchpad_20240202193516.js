/*
processDataPromise([1, 2, 3]).then((processedNumbers) => {
  console.log(processedNumbers);
  // After 1 second, logs: [2, 4, 6]
});
*/

function returnNum(num) {
  return new Promise((resolve) => resolve(num));
}

returnNum(5)
  .then((message) => resolve(message * 2))
  .then((message) => resolve(message + 5));
