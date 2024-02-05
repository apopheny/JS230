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
    document.getElementById("loadedPicturePartial")
  );
  Handlebars.registerPartial(
    "imageGalleryPartial",
    document.getElementById("imageGalleryPartial")
  );
  let galleryTemplate = Handlebars.compile(
    document.getElementById("galleryTemplate")
  );

  document.body.appendChild(galleryTemplate(memes));

  document.addEventListener("DOMContentLoaded", func);
})();
