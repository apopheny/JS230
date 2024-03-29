document.addEventListener("DOMContentLoaded", () => {
  let articleLinks = [...document.querySelectorAll("ul li a")];
  let articles = [...document.querySelectorAll("article")];

  function scrollTo(event) {
    event.preventDefault();
    event.stopPropagation();
    removeHighlights();
    let destination = document.querySelector(event.target.getAttribute("href"));
    destination.classList.add("highlight");
    destination.scrollIntoView({ behavior: "smooth" });
  }

  function removeHighlights() {
    [...document.getElementsByClassName("highlight")].forEach((element) =>
      element.classList.remove("highlight")
    );
  }

  function highlightParent(event) {
    removeHighlights();
    let article = event.target.closest("article");
    if (article) {
      article.classList.contains("highlight") ||
        article.classList.add("highlight");
    } else {
      let mainClassList = document.querySelector("main").classList;
      mainClassList.contains("highlight") || mainClassList.add("highlight");
    }
  }

  articleLinks.forEach((link) => link.addEventListener("click", scrollTo));
  document.addEventListener("click", highlightParent);
});
// a.addEventListener("click", (e) => {
//   e.preventDefault();
//   let destination = e.target.getAttribute("href");
//   console.log(destination);
// });
