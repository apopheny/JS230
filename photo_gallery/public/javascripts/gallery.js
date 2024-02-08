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
        const request = await fetch("./photos/", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!request.ok) {
          throw new Error(
            `Error retrieving photos. Request status: ${request.status}`
          );
        }

        const data = await request.json();
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

    async renderPhoto(id = 1) {
      try {
        await this.updatePhotosJSON();
        let imageHTML = this.photosTemplate({ photos: this.photosJSON });
        slides.innerHTML = imageHTML;
        this.renderPhotoInfo(id);
        this.renderComments(id);
      } catch (error) {
        console.error(error.message);
      }
    }

    renderPhotoInfo(id) {
      let photoInfoHTML = this.photoInfoTemplate(this.photosJSON[id]);
      photoInfoHeader.innerHTML = photoInfoHTML;
    }

    async renderComments(id) {
      try {
        let request = await fetch(`./comments?photo_id=${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!request.ok) {
          throw new Error(
            `Failed to load photo comments. Status: ${request.status}`
          );
        }

        let data = await request.json();

        let commentsHTML = this.commentsTemplate({ comments: data });
        commentsDiv.innerHTML = commentsHTML;
      } catch (error) {
        throw error;
      }
    }
  }

  let photoInfoHeader, browserGallery, slides, commentsDiv;

  document.addEventListener("DOMContentLoaded", () => {
    browserGallery = new Gallery();
    slides = document.querySelector("#slides");
    photoInfoHeader = document.querySelector("section header");
    commentsDiv = document.querySelector("#comments");
  });
})();
