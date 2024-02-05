let header = document.body.querySelector('header');
document.body.insertAdjacentElement('afterbegin', header);

let siteTitle = [...document.body.querySelectorAll('h1')].filter(node => node.innerText === 'My Site!')[0];
header.insertAdjacentElement('afterbegin', siteTitle);

let navBar = document.body.querySelector('nav').cloneNode(true);
document.body.querySelector('nav').remove();
siteTitle.insertAdjacentElement('afterend', navBar);

let articleHeader = document.body.querySelectorAll('header')[1];
document.body.querySelector('article').insertAdjacentElement('afterbegin', articleHeader);

let article = document.body.querySelector('article').cloneNode(true);
console.log(article.innerText)
document.body.querySelector('article').remove();
document.getElementById('content').insertAdjacentElement('afterbegin', article);

let welcomeHeader = document.body.querySelectorAll('h1')[1];
let welcomeHope = document.body.querySelector('h2');
let welcomeSection = document.body.querySelector('article header');
welcomeSection.appendChild(welcomeHeader);
welcomeSection.appendChild(welcomeHope);

let [babyImage, chinStickImage] = document.querySelectorAll('img');
console.log(babyImage, chinStickImage)