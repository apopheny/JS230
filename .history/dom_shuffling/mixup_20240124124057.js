let header = document.body.querySelector('header');
document.body.insertAdjacentElement('afterbegin', header);

let siteTitle = [...document.body.querySelectorAll('h1')].filter(node => node.innerText === 'My Site!')[0];
header.insertAdjacentElement('afterbegin', siteTitle);

let navBar = document.body.querySelector('nav').cloneNode(true);
document.body.querySelector('nav').remove();
siteTitle.insertAdjacentElement('afterend', navBar);

let article = document.getElementById('content').cloneNode(true);
let welcomeHeader = document.body.querySelector('h1');
console.log(welcomeHeader.innerText);
  // document.getElementById('content').remove();
// document.querySelector('main').appendChild(article);