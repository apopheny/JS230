function mockAsyncOp() {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
      resolve("Succeeded!");
    }

    reject("Failed");
  });
}

mockAsyncOp()
  .then(console.log)
  .catch(console.error)
  .finally(() => console.log("Operation attempted"));
