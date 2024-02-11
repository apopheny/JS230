document.addEventListener("DOMContentLoaded", () => {
  let articleLinks = [...document.querySelectorAll("ul li a")];

  function scrollTo(event) {
    event.preventDefault();
    let destination = event.target.getAttribute("href");
    destination.classList.add("highlight");
    destination.scrollIntoView({ behavior: "smooth" });
    console.log(destination);
  }
});
// a.addEventListener("click", (e) => {
//   e.preventDefault();
//   let destination = e.target.getAttribute("href");
//   console.log(destination);
// });
