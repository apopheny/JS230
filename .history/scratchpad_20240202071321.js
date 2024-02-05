let myVar = "some text";

function func() {
  this.a = "taco";
  myVra = "oh fuck i made a typo";
}

func();
console.log(globalThis.a);
// taco
console.log(globalThis.myVra);
