class View {
  #templates;

  constructor(homeTemplate) {
    this.#templates = {};
  }

  init() {
    this.#templates.home = Handlebars.compile(
      document.getElementById("defaultPageTemplate").innerHTML
    );
    Handlebars.registerPartial(
      "contactsList",
      document.getElementById("contactInfoPartial").innerHTML
    );

    this.renderHome();
  }

  renderHome() {
    let html = this.#templates.home({
      contacts: [
        {
          name: "Chris",
          phone: "7274596446",
          email: "cedouglass@gmail.com",
          tags: ["programmer", "full-stack"],
        },
        {
          name: "Dunkin",
          phone: "7277276969",
          email: "dunkleisthebest@gmail.com",
          tags: ["pug", "good boi"],
        },
      ],
    });

    document.getElementById("contacts").insertAdjacentHTML("afterbegin", html);
  }
}

export { View };
