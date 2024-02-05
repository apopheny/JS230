let obj = {
  a: "hello",
  b: "world",
  foo() {
    [1, 2, 3].forEach((number) => {
      console.log(String(number) + " " + this.a + " " + this.b);
    });
  },
};

obj.foo();

// => 1 hello world
// => 2 hello world
// => 3 hello world

let otherObj = {
  a: "hello",
  b: "world",
  foo() {
    function logger() {
      [1, 2, 3].forEach((number) => {
        console.log(String(number) + " " + this.a + " " + this.b);
      });
    }
    logger();
  },
};

otherObj.foo();
