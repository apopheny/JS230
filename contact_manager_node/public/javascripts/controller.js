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
      if (document.querySelector("header")) return;
      this.#view.renderBase();
      this.#view.renderContacts(this.#model.contacts());
      this.#view.renderTags(this.#model.tags());
      this.updateElements();
    }

    updateElements() {
      if (document.getElementById("contact_search_bar")) {
        this.bindHomepageListeners(this.getHomePageElements());
      } else {
        this.bindContactListeners(this.getNewContactElements());
      }

      document
        .getElementById("go_home")
        .addEventListener("click", this.defaultView.bind(this));
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

    bindHomepageListeners([addContact, search, addTag]) {
      addContact.addEventListener(
        "click",
        this.displayNewContactForm.bind(this)
      );
      search.addEventListener("keyup", this.searchContacts.bind(this));
      addTag.addEventListener("click", this.addNewTag.bind(this));
      document.addEventListener("click", this.clickDelegator.bind(this));
    }

    getNewContactElements() {
      this.#elements.contactForm = document.querySelector("form");
      this.#elements.contactName = document.getElementById("full_name");
      if (document.getElementById("edit_contact_form")) {
        this.#elements.editIndex = this.#model.getContactIndex(
          this.#elements.contactName.value
        );
      }

      this.#elements.contactEmail = document.getElementById("email_address");
      this.#elements.contactPhone = document.getElementById("phone_number");
      this.#elements.contactTags = document.getElementById("contact_tags");

      return [
        this.#elements.contactForm,
        this.#elements.contactName,
        this.#elements.contactEmail,
        this.#elements.contactPhone,
        this.#elements.contactTags,
      ];
    }

    bindContactListeners([
      contactForm,
      contactName,
      contactEmail,
      contactPhone,
      contactTags,
    ]) {
      contactForm.addEventListener("submit", this.addNewContact.bind(this));
      contactName.addEventListener(
        "keydown",
        this.nameKeyValidation.bind(this)
      );
      contactEmail.addEventListener(
        "focusout",
        this.emailValidation.bind(this)
      );
      contactPhone.addEventListener(
        "focusout",
        this.phoneValidation.bind(this)
      );
      contactTags.addEventListener("focusin", this.popInTags.bind(this));
      contactTags.addEventListener("focusout", this.popOutTags.bind(this));
    }

    popInTags() {
      let div = document.createElement("div");
      div.id = "tags";
      div.classList.add("info_heading");
      document.body.insertAdjacentElement("beforeend", div);
      this.#view.renderTags(this.#model.tags());
    }

    popOutTags() {
      if (document.getElementById("tags"))
        document.getElementById("tags").remove();
    }

    errorMessage(message) {
      if (document.body.querySelector(".error")) return;

      let div = document.createElement("div");
      div.innerText = message;
      div.classList.add("error");
      document.body.insertAdjacentElement("beforeend", div);
    }

    removeErrorMessage() {
      if (document.body.querySelector(".error")) {
        document.body.querySelector(".error").remove();
      }
    }

    phoneValidation(event) {
      if (event instanceof Event) {
        if (!event.target.value.match(/^\d{10}$/)) {
          this.errorMessage(
            "Phone number must be 10 digits with no formatting"
          );
        } else {
          this.removeErrorMessage();
        }
      } else {
        return event.match(/^\d{10}$/);
      }
    }

    emailValidation(event) {
      if (event instanceof Event) {
        if (!event.target.value.match(/[\w\d+\-]+@\w+\.\w{2,}/)) {
          this.errorMessage("Must provide a valid email address");
        } else {
          this.removeErrorMessage();
        }
      } else {
        return event.match(/[\w\d+\-]+@\w+\.\w{2,}/);
      }
    }

    nameKeyValidation(event) {
      if (!event.key) return;
      if (event.key.match(/[^a-z0-9'\-\s]/i)) {
        event.preventDefault();
        this.errorMessage(
          "Names may only consist of letters, numbers, hyphens, and apostrophes"
        );
      } else {
        this.removeErrorMessage();
      }
    }

    nameUniqueValidation(name) {
      if (
        document.getElementById("new_contact_form") &&
        this.#model.contacts().some((contact) => contact.name === name)
      ) {
        this.errorMessage("That name has already been added");
        return false;
      }

      return true;
    }

    tagsValidation(tags) {
      if (tags === "") return true;

      tags = tags.split(", ");
      if (tags.some((tag) => tag.match(/\W/) && !tag.match(/[#\-]/))) {
        this.errorMessage(
          'Tags must be one word separated by ", " and must not include special characters other than "#" or "-"'
        );
        return false;
      } else {
        this.removeErrorMessage();
        let currentTags = this.#model.tags().map((data) => data.tag);
        tags.forEach((tagValue) => {
          tagValue = this.formatTag(tagValue);
          if (!currentTags.includes(tagValue)) {
            this.#model.updateTags({ tag: tagValue });
          }
        });

        return true;
      }
    }

    formatTag(value) {
      if (!value.match(/^#/)) return "#" + value;
      else return value;
    }

    validateForm(data) {
      let name = data.get("full_name");
      let email = data.get("email_address");
      let phone = data.get("phone_number");
      let tags = data.get("contact_tags");

      if ([name, email, phone].some((ele) => ele.length === 0)) {
        this.errorMessage("Name, email, and phone are required fields");
        return false;
      }
      if (!this.nameUniqueValidation(name)) return false;
      if (!this.emailValidation(email)) return false;
      if (!this.phoneValidation(phone)) return false;
      if (!this.tagsValidation(tags)) return false;

      return true;
    }

    addNewContact(event) {
      event.preventDefault();
      let data = new FormData(this.#elements.contactForm);
      if (!this.validateForm(data)) {
        return;
      } else {
        let name = data.get("full_name");
        let email = data.get("email_address");
        let phone = data.get("phone_number");
        let tags = data.get("contact_tags").split(", ");
        if (tags.at(0) !== "") tags = tags.map((tag) => this.formatTag(tag));

        if (document.getElementById("new_contact_form")) {
          this.#model.updateContacts({
            name,
            phone,
            email,
            tags,
          });
        } else
          this.#model.updateContact(this.#elements.editIndex, {
            name,
            phone,
            email,
            tags,
          });

        this.defaultView();
      }
    }

    displayNewContactForm(event) {
      event.preventDefault();
      this.#view.renderNewContact();
      this.updateElements();
    }

    searchContacts(event) {
      let contacts = this.filterContactsByName(
        this.#model.contacts(),
        event.target.value
      );
      this.#view.renderContacts(contacts);
    }

    displayContactEditForm(event) {
      event.preventDefault();
      let name = event.target.parentElement.querySelector("h3").dataset.name;
      let contact = this.#model
        .contacts()
        .filter((contact) => contact.name === name)
        .at(0);

      this.#view.renderNewContact(contact);
      this.updateElements();
    }

    clickDelegator(event) {
      if (event.target.classList.contains("tag_link")) {
        this.searchTags(event);
      } else if (event.target.classList.contains("contact_edit")) {
        this.displayContactEditForm(event);
      }
    }

    searchTags(event) {
      event.preventDefault();

      let contacts = this.filterContactsByTag(
        this.#model.contacts(),
        event.target.dataset.tag
      );
      this.#view.renderContacts(contacts);
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
