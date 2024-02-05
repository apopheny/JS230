retryOperation(
  () => new Promise((resolve, reject) => (Math.random() > 0.33 ? resolve("Success!") : reject(new Error("Fail!"))))
);
