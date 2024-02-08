(function () {
  class Gallery {
    constructor() {
      this.photosTemplate = null;
      this.commentsTemplate = null;
      this.photoInfoTemplate = null;
      this.photosJSON = null;

      this.init();
    }

    init() {
      this.registerTemplates();
      this.renderPhoto();
    }

    async updatePhotosJSON() {
      try {
        this.photosJSON = await this.returnPhotosJSON();
      } catch (error) {
        throw error;
      }
    }

    async returnPhotosJSON() {
      try {
        const response = await fetch("./photos/", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error(
            `Error retrieving photos. Request status: ${response.status}`
          );
        }

        const data = await response.json();
        return data;
      } catch (error) {
        throw error;
      }
    }

    registerTemplates() {
      Handlebars.registerPartial(
        "comment",
        document.querySelector("#photo_comment").innerHTML
      );
      this.photosTemplate = Handlebars.compile(
        document.querySelector("#photos").innerHTML
      );
      this.commentsTemplate = Handlebars.compile(
        document.querySelector("#photo_comments").innerHTML
      );
      this.photoInfoTemplate = Handlebars.compile(
        document.querySelector("#photo_information").innerHTML
      );
    }

    async renderPhoto(id = 0) {
      try {
        await this.updatePhotosJSON();
        let imageHTML = this.photosTemplate({ photos: this.photosJSON });
        console.log(imageHTML);
        slides.innerHTML = imageHTML;
      } catch (error) {
        console.error(error.message);
      }
    }
  }

  let photosTemplate,
    commentsTemplate,
    photoInfo,
    browserGallery,
    slides,
    comments;

  document.addEventListener("DOMContentLoaded", () => {
    browserGallery = new Gallery();
    slides = document.querySelector("#slides");
  });
})();
