class View {
  #templates;

  constructor(homeTemplate) {
    this.#templates = {};
  }

  init() {
    this.#templates.base = Handlebars.compile(
      document.getElementById("base").innerHTML
    );
    this.#templates.contacts = Handlebars.compile(
      document.getElementById("defaultPageTemplate").innerHTML
    );
    this.#templates.tags = Handlebars.compile(
      document.getElementById("tagTemplate").innerHTML
    );
    this.#templates.addContact = Handlebars.compile(
      document.getElementById("createContactTemplate").innerHTML
    );
    Handlebars.registerPartial(
      "contactsList",
      document.getElementById("contactInfoPartial").innerHTML
    );
  }

  renderBase() {
    document.body.insertAdjacentHTML("beforeend", this.#templates.base(""));
  }

  renderContacts(data) {
    let html;
    if (data) {
      html = this.#templates.contacts({ contacts: data });
      document.getElementById("contacts").innerHTML = html;
    }
  }

  renderTags(data) {
    let html;
    if (data) {
      html = this.#templates.tags(data);
      document.getElementById("tags").innerHTML = html;
    }
  }

  renderNewContact() {
    [...document.querySelectorAll("header, footer")].forEach((ele) =>
      ele.remove()
    );
    document.querySelector("main").innerHTML = this.#templates.addContact("");
  }
}

export { View };
