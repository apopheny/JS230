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
    // adds an event listener to this.input with a callback of valueChanged bound to Autocomplete
    this.input.addEventListener("input", this.valueChanged.bind(this));
  },

  valueChanged() {
    // retrieves the text from the input
    let value = this.input.value;

    if (value.length > 0) {
      // if input length is > 0, invokes fetchMatches with the input text and a callback argument
      this.fetchMatches(value, (matches) => {
        // in callback, set Autocomplete.visible to true, set Autocomplete.matches to the response (which should be json), and invoke the draw method
        this.visible = true;
        this.matches = matches;
        this.draw();
      });
    } else {
      // change state back to default
      this.reset();
    }
  },

  fetchMatches(query, callback) {
    let request = new XMLHttpRequest();

    request.addEventListener("load", () => {
      // when request is loaded, invoke the callback argument and pass it the request response, which should be json (set below)
      callback(request.response);
    });

    // ensure safe strings and set response type to json
    request.open("GET", `${this.url}${encodeURIComponent(query)}`);
    request.responseType = "json";
    request.send();
  },

  draw() {
    // empty out the list UI if it has elements leftover from the last state change
    while (this.listUI.lastChild) {
      this.listUI.removeChild(this.listUI.lastChild);
    }

    // Autocomplete.visible serves as a flag to display the list UI or not, depending on if there is text entered in the input. If it's not visible, the overlay shouldn't have text
    if (!this.visible) {
      // this.overlay.textContent = "";
      return;
    }

    // otherwise iterate through the matches returned by fetchMatches. We'll create a li for each one of them in order and append them as children of the list UI, filling from top to bottom
    this.matches.forEach((match) => {
      let li = document.createElement("li");
      li.classList.add("autocomplete-ui-choice");

      li.textContent = match.name;
      this.listUI.appendChild(li);
    });
  },

  reset() {
    this.visible = false;
    this.draw();
    this.matches = [];
  },

  init() {
    this.input = document.querySelector("input");
    this.url = "/countries?matching=";

    this.listUI = null;
    this.overlay = null;

    this.visible = false;
    this.matches = [];

    this.wrapInput();
    this.createUI();
    this.bindEvents();
  },
};

document.addEventListener("DOMContentLoaded", () => {
  Autocomplete.init();
});
