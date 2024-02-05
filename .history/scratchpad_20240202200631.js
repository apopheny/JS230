function retryOperation(operation) {
  let count = 0;

  operation()
    .then(console.log)
    .catch(() => {
      if (count > 1) console.error("Operation failed");
    });
}

retryOperation(
  () =>
    new Promise((resolve, reject) =>
      Math.random() > 0.33 ? resolve("Success!") : reject(new Error("Fail!"))
    )
);
