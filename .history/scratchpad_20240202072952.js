const obj = {
  logSomething() {
    console.log(this === obj);
    console.log(this === globalThis);
    // globalThis refers to the global object across different environments
  },
};

const globalLog = obj.logSomething;

// method invocation
obj.logSomething();
// true
// false

// function invocation
globalLog();
// false
// true
