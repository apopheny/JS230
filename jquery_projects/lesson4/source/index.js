$(() => {
  const $form = $("form");

  $(document).on("keyup", function (event) {
    $form.lastKey = this.key;
  });

  $form.on("submit", (event) => {
    event.preventDefault();
    $(document)
      .off("keyup")
      .on("keyup", function (event) {
        $form.lastKey = this.key;
      });
  });
});

document.querySelector("#header").addEventListener("click", function (e) {
  if (e.target.tagName === "P") {
    // do something
  }
});

document.querySelector("#header").addEventListener("click", function (e) {
  if (e.currentTarget.tagName === "P") {
    // do something
  }
});
