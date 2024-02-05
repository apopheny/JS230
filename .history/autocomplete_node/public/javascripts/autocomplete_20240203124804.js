const Autocomplete = {
  wrapInput() {
    let wrapper = document.createElement("div");
    wrapper.classList.add("autocomplete-wrapper");
    // take the div we've created and make it a sibling of an input element we've selected and stored in Autocomplete.input during a call to Autocomplete.init
    this.input.parentNode.appendChild(wrapper);
    // take that same input element that we've stored and move it to be a child of the div we've created
    wrapper.appendChild(this.input);
  },

  createUI() {
    let listUI = document.createElement("ul");
    listUI.classList.add("autocomplete-ui");
    // make an unordered list and make it a sibling after the input element we've stored (we call createUI after wrapInput) -- current lastChild of the div we created in wrapInput(). Store it in Autocomplete.listUI for future reference
    this.input.parentNode.appendChild(listUI);
    this.listUI = listUI;

    let overlay = document.createElement("div");
    overlay.classList.add("autocomplete-overlay");
    overlay.style.width = `${this.input.clientWidth}px`;

    // take the new div and make it a sibling after the listUI element (current lastChild of the div we created in wrapInput), store it for future reference
    this.input.parentNode.appendChild(overlay);
    this.overlay = overlay;
  },

  bindEvents() {
    this.input.addEventListener("input", this.valueChanged.bind(this));
  },

  valueChanged() {
    let value = this.input.value;

    if (value.length > 0) {
      this.fetchMatches(value, (matches) => {
        this.visible = true;
        this.matches = matches;
        this.draw();
      });
    } else {
      this.reset();
    }
  },

  fetchMatches(query, callback) {
    let request = new XMLHttpRequest();

    request.addEventListener("load", () => {
      callback(request.response);
    });

    request.open("GET", `${this.url}${encodeURIComponent(query)}`);
    request.responseType = "json";
    request.send();
  },

  init() {
    this.input = document.querySelector("input");
    this.url = "/countries?matching=";

    this.listUI = null;
    this.overlay = null;

    this.visible = false;
    this.matchs = [];

    this.wrapInput();
    this.createUI();
    this.bindEvents();
  },
};

// is there some reason we can't pass Autocomplete.init.bind(Autocomplete) as a second argument?
document.addEventListener("DOMContentLoaded", () => {
  Autocomplete.init();
});
