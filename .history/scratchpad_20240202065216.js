const obj = {
  logSomething() {
    console.log(this.name);
  },
};

const globalLog = obj.logSomething;

obj.logSomething();
globalLog();
