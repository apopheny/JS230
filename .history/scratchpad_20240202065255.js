const obj = {
  logSomething() {
    console.log(this === obj);
    console.log(this === globalThis);
  },
};

const globalLog = obj.logSomething;

obj.logSomething();
globalLog();
