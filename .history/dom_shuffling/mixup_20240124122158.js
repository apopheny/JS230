let header = document.body.querySelector('header');
document.body.insertAdjacentElement('afterbegin', header);
let siteTitle = document.body.querySelector('h1').deepClone(true);
header.insertAdjacentElement('afterbegin', siteTitle);