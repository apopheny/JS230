function func() {
  this.a = "taco";
}

func();
console.log(globalThis.a);
// taco
