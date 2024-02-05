let obj = {
  foo() {
    [1, 2, 3].forEach((number) => {
      console.log(String(number) + " " + (this === obj));
    });
  },
};

obj.foo();
// 1 true
// 2 true
// 3 true

let otherObj = {
  foo() {
    function logger() {
      // arrow function nested in a function
      [1, 2, 3].forEach((number) => {
        console.log(String(number) + " " + (this === globalThis));
      });
    }
    // function invocation
    logger();
  },
};

otherObj.foo();
// 1 true
// 2 true
// 3 true
