function retryOperation(operation, count = 0) {
  operation()
    .then(console.log)
    .catch(() => {
      if (count > 2) console.error("Operation failed");
      else {
        count += 1;
        retryOperation(operation, count);
      }
    });
}

retryOperation(
  () =>
    new Promise((resolve, reject) =>
      Math.random() > 0.9 ? resolve("Success!") : reject(new Error("Fail!"))
    )
);
