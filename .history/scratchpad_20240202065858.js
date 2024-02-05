let obj = {
  foo() {
    [1, 2, 3].forEach((number) => {
      console.log(String(number) + " " + this === obj);
    });
  },
};

obj.foo();

// => 1 hello world
// => 2 hello world
// => 3 hello world

let otherObj = {
  foo() {
    function logger() {
      [1, 2, 3].forEach((number) => {
        console.log(String(number) + " " + this === globalThis);
      });
    }
    logger();
  },
};

otherObj.foo();
