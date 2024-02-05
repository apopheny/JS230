let header = document.body.querySelector('header');
document.body.insertAdjacentElement('afterbegin', header);

let siteTitle = [...document.body.querySelectorAll('h1')].filter(node => node.innerText === 'My Site!')[0];
header.insertAdjacentElement('afterbegin', siteTitle);

let navBar = document.body.querySelector('nav').cloneNode(true);
document.body.querySelector('nav').remove();
siteTitle.insertAdjacentElement('afterend', navBar);

let articleHeader = document.body.querySelectorAll(header)[1];
console.log(articleHeader.innerText === '')