(function () {
  const memes = [
    {
      id: 1,
      alt: "UDP drops packets lol",
    },
    {
      id: 2,
      alt: "But why no JavaScript devs?",
    },
    {
      id: 3,
      alt: "I have never used PHP but still have an opinion somehow",
    },
    {
      id: 4,
      alt: "I am 1337 h4x0r and one day I'll learn grep and cURL",
    },
  ];

  Handlebars.registerPartial(
    "loadedPicturePartial",
    document.getElementById("loadedPicturePartial").innerHTML
  );

  Handlebars.registerPartial(
    "imageGalleryPartial",
    document.getElementById("imageGalleryPartial").innerHTML
  );

  let galleryTemplate = Handlebars.compile(
    document.getElementById("galleryTemplate").innerHTML
  );

  document.getElementById("slideshowContainer").innerHTML =
    galleryTemplate(memes);

  let displayArea = document.querySelector("div.loadedPicture");
  let gallery = document.querySelector("div.image-gallery");

  function galleryLinkClick(event) {
    if (event.target.tagName === "A") event.preventDefault();
    else return;

    let galleryIndex = Number(event.target.getAttribute("data-index"));
    console.log(galleryIndex);
  }

  document.addEventListener("DOMContentLoaded", () => {
    gallery.addEventListener("click", galleryLinkClick);
  });
})();
