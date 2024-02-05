/*
processDataPromise([1, 2, 3]).then((processedNumbers) => {
  console.log(processedNumbers);
  // After 1 second, logs: [2, 4, 6]
});
*/

function flakyService() {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
      resolve("Operation successful");
    }

    reject("Operation failed");
  });
}

flakyService().then(console.log).catch(console.error);
