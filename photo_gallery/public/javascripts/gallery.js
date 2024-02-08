"use strict";
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
      this.bindEventListeners();
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
      let photoInfoHTML = this.photoInfoTemplate(this.photosJSON[id - 1]);
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

    cyclePrevious() {
      let lastFigure = [...slides.children];
      lastFigure = lastFigure[lastFigure.length - 1];

      slides.insertAdjacentElement("afterbegin", lastFigure);
      let currentPhotoID = slides.firstElementChild.getAttribute("data-id");
      this.renderPhotoInfo(currentPhotoID);
      this.renderComments(currentPhotoID);
    }

    cycleNext() {
      slides.insertAdjacentElement("beforeend", slides.firstElementChild);
      let currentPhotoID = slides.firstElementChild.getAttribute("data-id");

      this.renderPhotoInfo(currentPhotoID);
      this.renderComments(currentPhotoID);
    }

    bindEventListeners() {
      prevArrow.addEventListener("click", (event) => {
        event.preventDefault();
        browserGallery.cyclePrevious();
      });

      nextArrow.addEventListener("click", (event) => {
        event.preventDefault();
        browserGallery.cycleNext();
      });
    }
  }

  let photoInfoHeader,
    browserGallery,
    slides,
    commentsDiv,
    prevArrow,
    nextArrow;

  document.addEventListener("DOMContentLoaded", () => {
    slides = document.querySelector("#slides");
    photoInfoHeader = document.querySelector("section header");
    commentsDiv = document.querySelector("#comments");
    prevArrow = document.querySelector(".prev");
    nextArrow = document.querySelector(".next");
    browserGallery = new Gallery();
  });
})();
