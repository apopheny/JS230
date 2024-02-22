function helloAgain(n) {
  let greeter = setInterval(() => {
    console.log("Hello, world!");
  }, n * 1000);

  return greeter;
}
