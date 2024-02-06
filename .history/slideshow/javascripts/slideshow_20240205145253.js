(function () {
  const memes = [
    {
      id: 0,
      alt: "UDP drops packets lol",
    },
    {
      id: 1,
      alt: "But why no JavaScript devs?",
    },
    {
      id: 2,
      alt: "I have never used PHP but still have an opinion somehow",
    },
    {
      id: 3,
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

  // let displayArea = document.querySelector("div.loadedPicture");
  let gallery = document.querySelector("div.image-gallery");
  let caption = document.querySelector("#captionText");

  function galleryLinkClick(event) {
    if (event.target.tagName === "IMG") event.preventDefault();
    else return;
    let currentDisplayImage = document.querySelector(".loadedPicture img");

    let galleryIndex = Number(event.target.getAttribute("data-index"));
    let newDisplayImage = document.createElement("img");
    newDisplayImage.setAttribute("src", `assets/pic_${galleryIndex}.png`);
    newDisplayImage.setAttribute("alt", memes[galleryIndex].alt);
    newDisplayImage.setAttribute("data-index", galleryIndex);
    newDisplayImage.classList.add("loadedPicture");

    currentDisplayImage.replaceWith(newDisplayImage);
    caption.textContent = memes[galleryIndex].alt;
  }

  document.addEventListener("DOMContentLoaded", () => {
    gallery.addEventListener("click", galleryLinkClick);
  });
})();
