// 4. Write some JavaScript code to retrieve the text of every thumbnail caption on the page.

let textNodes = [...document.querySelectorAll(".thumbcaption")].map((caption) => caption.textContent);
