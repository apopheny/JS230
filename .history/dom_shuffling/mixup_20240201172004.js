document.body.insertAdjacentElement("afterbegin", document.querySelectorAll("header")[1]);

document.querySelector("header").insertAdjacentElement("afterbegin", document.querySelector("h1"));

document.querySelector("article").insertAdjacentElement("beforeend", document.querySelector("figure"));
let [baby, chin] = document.querySelectorAll("img");
let figures = [...document.querySelectorAll("figure")];
figures[0].insertAdjacentElement("afterbegin", chin);
figures[1].insertAdjacentElement("afterbegin", baby);

document.querySelector("article").insertAdjacentElement("beforeend", document.querySelectorAll("figure")[1]);
