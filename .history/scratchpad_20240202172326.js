/*
processDataPromise([1, 2, 3]).then((processedNumbers) => {
  console.log(processedNumbers);
  // After 1 second, logs: [2, 4, 6]
});
*/

function processDataPromise(array) {
  return new Promise((resolve) => {
    setTimeout(() => {
      array = array.map((ele) => ele * 2);
      resolve(array);
    }, 1000);
  });
}

processDataPromise([1, 2, 3]).then((processedNumbers) => {
  console.log(processedNumbers);
});
