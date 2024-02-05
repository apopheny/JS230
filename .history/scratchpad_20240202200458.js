function retryOperation(operation) {
  let count = 0;

  operation()
    .then(console.log)
    .catch(() => {
      count > 1 || operation();
      count += 1;
    });
}

retryOperation(
  () =>
    new Promise((resolve, reject) =>
      Math.random() > 0.33 ? resolve("Success!") : reject(new Error("Fail!"))
    )
);
