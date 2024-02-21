import { Model } from "./model.js";
import { View } from "./view.js";

document.addEventListener("DOMContentLoaded", () => {
  class Controller {
    #model;
    #view;
    constructor() {
      this.#model = new Model();
      this.#view = new View();
    }

    init() {
      this.#model.init();
      this.#view.init();
    }
  }

  let app = new Controller();
  app.init();
});
