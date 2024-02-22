class View {
  #templates;
  #elements;

  constructor(homeTemplate) {
    this.#templates = {};
    this.#elements = {};
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
    Handlebars.registerPartial(
      "contactsList",
      document.getElementById("contactInfoPartial").innerHTML
    );
  }

  renderBase() {
    document.body.innerHTML = this.#templates.base("");
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
}

export { View };
