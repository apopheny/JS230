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
    [...document.getElementsByClassName("highlight")].forEach((element) =>
      element.classList.remove("highlight")
    );
  }

  function highlightParent(event) {
    removeHighlights();
    event.target
      .closest(`${event.target.closest("article") ? "article" : "main"}`)
      .classList.add("highlight");
  }

  articleLinks.forEach((link) => link.addEventListener("click", scrollTo));
  articles.forEach((article) =>
    article.addEventListener("click", highlightParent)
  );
});
// a.addEventListener("click", (e) => {
//   e.preventDefault();
//   let destination = e.target.getAttribute("href");
//   console.log(destination);
// });
