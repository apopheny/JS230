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
        commentsList.innerHTML = commentsHTML;

        this.fetchNewButtons();
      } catch (error) {
        throw error;
      }
    }

    fetchNewButtons() {
      if ([likeButton, favoriteButton].every((ele) => !!ele)) {
        likeButton.removeEventListener("click", this.likeButtonEventListener);
        favoriteButton.removeEventListener(
          "click",
          this.favoriteButtonEventListener
        );
      }

      likeButton = document.querySelector(".button.like");
      favoriteButton = document.querySelector(".button.favorite");

      this.bindButtonListeners();
    }

    likeButtonEventListener(event) {
      event.preventDefault();
      browserGallery.postLikesFavorites("like");
    }

    favoriteButtonEventListener(event) {
      event.preventDefault();
      browserGallery.postLikesFavorites("favorite");
    }

    bindButtonListeners() {
      likeButton.addEventListener("click", this.likeButtonEventListener);

      favoriteButton.addEventListener(
        "click",
        this.favoriteButtonEventListener
      );
    }

    async postLikesFavorites(property) {
      try {
        this.fetchNewButtons();
        let buttonId = likeButton.getAttribute("data-id");
        let body = JSON.stringify({ photo_id: buttonId });

        let request = await fetch(`./photos/${property}`, {
          method: "POST",
          accept: "application/json",
          headers: {
            "Content-Type": "application/json",
          },
          body,
        });

        if (!request.ok) {
          throw new Error(
            `Failed to post ${property}. Status: ${request.status}`
          );
        }

        let response = await request.json();
        this.updateButtons(property, response);
      } catch (error) {
        console.error(error.message);
      }
    }

    updateButtons(button, count) {
      let buttontext;
      let currentButton;
      switch (button) {
        case "like":
          currentButton = likeButton;
          buttontext = likeButton.innerText;
          break;
        case "favorite":
          currentButton = favoriteButton;
          buttontext = favoriteButton.innerText;
          break;
      }

      buttontext = buttontext.replace(/\d+/, count.total);
      currentButton.innerText = buttontext;
    }

    async submitComment() {
      // body, name, photo_id, email
      try {
        let id = slides.firstElementChild.getAttribute("data-id");
        let form = new FormData(commentsForm);
        form.append("photo_id", id);
        const json = Object.fromEntries([...form.entries()]);

        let request = await fetch("./comments/new", {
          method: "POST",
          body: JSON.stringify(json),
          accept: "application/json",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!request.ok) {
          throw new Error(
            `Form post request failed. Status: ${request.status}`
          );
        }

        commentsForm.reset();
        let response = await request.json();
        this.addNewComment(response);
      } catch (error) {
        console.error(error.message);
      }
    }

    addNewComment(body) {
      console.log(body);
      let newComment = this.commentsTemplate({ comments: [body] });
      commentsList.insertAdjacentHTML("beforeend", newComment);
    }

    cyclePrevious() {
      let lastFigure = [...slides.children];
      lastFigure = lastFigure[lastFigure.length - 1];

      slides.insertAdjacentElement("afterbegin", lastFigure);
      let currentPhotoID = slides.firstElementChild.getAttribute("data-id");

      this.updatePhotosJSON();
      this.renderPhotoInfo(currentPhotoID);
      this.renderComments(currentPhotoID);
    }

    cycleNext() {
      slides.insertAdjacentElement("beforeend", slides.firstElementChild);
      let currentPhotoID = slides.firstElementChild.getAttribute("data-id");

      this.updatePhotosJSON();
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

      commentsForm.addEventListener("submit", (event) => {
        event.preventDefault();
        browserGallery.submitComment();
      });
    }
  }

  let photoInfoHeader,
    browserGallery,
    slides,
    commentsList,
    prevArrow,
    nextArrow,
    likeButton,
    favoriteButton,
    commentsForm;

  document.addEventListener("DOMContentLoaded", () => {
    slides = document.querySelector("#slides");
    photoInfoHeader = document.querySelector("section header");
    commentsList = document.querySelector("#comments ul");
    prevArrow = document.querySelector(".prev");
    nextArrow = document.querySelector(".next");
    commentsForm = document.querySelector("form");

    browserGallery = new Gallery();
  });
})();
