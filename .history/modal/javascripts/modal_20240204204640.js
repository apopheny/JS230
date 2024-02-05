$(function () {
  const team = [
    {
      name: "Kevin Wang",
      image: "kevin",
      info: "This is some written text to disambiguate this block of text from all the latin placeholders on this site.",
    },
    {
      name: "Louis Burton",
      image: "louis",
      info: "This is some written text to disambiguate this block of text from all the latin placeholders on this site.",
    },
    {
      name: "Kasper Salto",
      image: "kasper",
      info: "This is some written text to disambiguate this block of text from all the latin placeholders on this site.",
    },
    {
      name: "Chris Lee",
      image: "chris",
      info: "This is some written text to disambiguate this block of text from all the latin placeholders on this site.",
    },
  ];

  let template = $("#modalTemplate").html();
  let modalRenderer = Handlebars.compile(template);

  $("#team a").on("click", (event) => {
    event.preventDefault();

    let name = event.currentTarget.firstElementChild.getAttribute("alt");
    let current = team.filter((ele) => ele.name === name);

    let modal = $(modalRenderer(current[0])).hide();
    $("body").prepend(modal);
    modal.fadeIn();

    $("a.close").on("click", (event) => {
      event.preventDefault();
      modal.fadeOut(400, () => {
        modal.remove();
      });
    });
  });
});
