document.addEventListener("DOMContentLoaded", () => {
  let articleLinks = [...document.querySelectorAll("ul li a")];
  let articles = [...document.querySelectorAll("article")];

  function scrollTo(event) {
    event.preventDefault();
    removeHighlights();
    let destination = document.querySelector(event.target.getAttribute("href"));
    destination.classList.add("highlight");
    destination.scrollIntoView({ behavior: "smooth" });
  }

  function removeHighlights() {
    removeHighlights();
    [...document.getElementsByClassName("highlight")].forEach((element) =>
      element.classList.remove("highlight")
    );
  }

  function highlightContainingArticle(event) {
    event.target.closest("article").classList.add("highlight");
  }

  articleLinks.forEach((link) => link.addEventListener("click", scrollTo));
  articles.forEach((article) =>
    article.addEventListener("click", highlightContainingArticle)
  );
});
// a.addEventListener("click", (e) => {
//   e.preventDefault();
//   let destination = e.target.getAttribute("href");
//   console.log(destination);
// });
