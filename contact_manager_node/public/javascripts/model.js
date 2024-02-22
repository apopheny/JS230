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
  #placeholderTags = [
    { tag: "full-stack" },
    { tag: "programmer" },
    { tag: "pug" },
    { tag: "good boi" },
  ];

  constructor() {
    this.#contacts = null;
    this.#tags = null;
  }

  init() {
    this.resetDataStore();
    this.#contacts = JSON.parse(localStorage.getItem("contacts"));
    this.#tags = JSON.parse(localStorage.getItem("tags"));
  }

  resetDataStore() {
    localStorage.setItem("contacts", JSON.stringify(this.#placeholderContacts));
    localStorage.setItem("tags", JSON.stringify(this.#placeholderTags));
  }

  copyField(field) {
    return JSON.parse(JSON.stringify(field));
  }

  contacts() {
    return this.copyField(this.#contacts);
  }

  tags() {
    return this.copyField(this.#tags);
  }

  updateContacts(data) {
    this.#contacts.push(data);
    localStorage.setItem("contacts", JSON.stringify(data));
    return this.#contacts.length;
  }

  updateTags(data) {
    this.#tags.push(data);
    localStorage.setItem("tags", JSON.stringify(data));
    return this.#tags.length;
  }
}

export { Model };
