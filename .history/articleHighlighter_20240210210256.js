document.addEventListener("DOMContentLoaded", () => {
  let articleLinks = [...document.querySelectorAll("ul li a")];

  function scrollTo(event) {
    event.preventDefault();
    let destination = document.querySelector(event.target.getAttribute("href"));
    destination.classList.add("highlight");
    destination.scrollIntoView({ behavior: "smooth" });
  }

  articleLinks.forEach((link) => link.addEventListener("click", scrollTo));
});
// a.addEventListener("click", (e) => {
//   e.preventDefault();
//   let destination = e.target.getAttribute("href");
//   console.log(destination);
// });