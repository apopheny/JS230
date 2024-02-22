import { Model } from "./model.js";
import { View } from "./view.js";

document.addEventListener("DOMContentLoaded", () => {
  class Controller {
    #model;
    #view;
    #elements;
    constructor() {
      this.#model = new Model();
      this.#view = new View();
      this.#elements = {};
    }

    init() {
      this.#model.init();
      this.#view.init();
      this.defaultView();
      this.updateElements();
    }

    defaultView() {
      this.#view.renderBase();
      this.#view.renderContacts(this.#model.contacts());
      this.#view.renderTags(this.#model.tags());
    }

    updateElements() {
      if (document.getElementById("contact_search_bar")) {
        this.bindHomepageListeners(this.getHomePageElements());
      } else {
        this.getNewContactElements();
      }
    }

    getHomePageElements() {
      this.#elements.addContact = document.getElementById("contact_add");
      this.#elements.search = document.getElementById("contact_search_bar");
      this.#elements.addTag = document.getElementById("tag_add");
      return [
        this.#elements.addContact,
        this.#elements.search,
        this.#elements.addTag,
      ];
    }

    getNewContactElements() {}

    bindHomepageListeners([addContact, search, addTag]) {
      addContact.addEventListener("click", this.addNewContact.bind(this));
      search.addEventListener("keyup", this.searchContacts.bind(this));
      addTag.addEventListener("click", this.addNewTag.bind(this));
      document.addEventListener("click", this.searchTags.bind(this));
    }

    addNewContact(event) {
      event.preventDefault();
      this.#view.renderNewContact();
    }

    searchContacts(event) {
      let contacts = this.filterContactsByName(
        this.#model.contacts(),
        event.target.value
      );
      this.#view.renderContacts(contacts);
    }

    searchTags(event) {
      if (event.target.tagName === "A") {
        event.preventDefault();

        let contacts = this.filterContactsByTag(
          this.#model.contacts(),
          event.target.dataset.tag
        );
        this.#view.renderContacts(contacts);
      }
    }

    addNewTag(event) {
      event.preventDefault();
    }

    filterContactsByName(data, string) {
      string = string.replace(/[\W]/g, "");
      let regex = new RegExp(string, "i");
      return data.filter((ele) => ele.name.match(regex));
    }

    filterContactsByTag(data, tag) {
      if (!tag) return data;
      return data.filter((ele) => ele.tags.includes(tag));
    }
  }

  let app = new Controller();
  app.init();
});
