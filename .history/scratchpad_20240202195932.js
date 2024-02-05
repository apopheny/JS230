retryOperation(
  () => new Promise((resolve, reject) => (Math.random() > 0.33 ? resolve("Success!") : reject(new Error("Fail!"))))
);

(function () {
  let count = 0;

  retryOperation()
    .then(console.log)
    .catch(() => {
      count >= 2 || retryOperation();
      count += 1;
    });
})();
