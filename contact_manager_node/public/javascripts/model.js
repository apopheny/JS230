class Model {
  #contacts;
  #tags;
  #placeholderContacts = [
    {
      name: "Chris",
      phone: "8138138181",
      email: "cdisemail@gmail.com",
      tags: ["programmer", "full-stack"],
    },
    {
      name: "Dunkin",
      phone: "7277276969",
      email: "dunkleisthebest@gmail.com",
      tags: ["pug", "good boi"],
    },
  ];
  #placeholderTags = ["full-stack", "programmer", "pug", "good boi"];

  constructor() {
    this.#contacts = localStorage.getItem("contacts");
    this.#contacts = localStorage.getItem("tags");
  }

  init() {
    if (!this.#contacts) {
      this.resetDataStore();
      this.retrieveField(this.#contacts, "contacts");
      this.retrieveField(this.#tags, "tags");
    }
  }

  resetDataStore(contacts, tags) {
    localStorage.setItem("contacts", JSON.stringify(this.#placeholderContacts));
    localStorage.setItem("tags", JSON.stringify(this.#placeholderTags));
  }

  updateField(data, field, fieldName) {
    field.push(data);
    localStorage.setItem(fieldName, JSON.stringify(field));
    return field.length;
  }

  retrieveField(field, fieldName) {
    field = JSON.parse(localStorage.getItem(fieldName));
    return field;
  }
}

export { Model };
