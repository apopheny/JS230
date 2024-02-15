document.addEventListener("DOMContentLoaded", () => {
  let filters = document.querySelector("#selection-filters");
  let classifications = document.querySelector("#animal-classifications");
  let animals = document.querySelector("#animals");
  let clear = document.querySelector("#clear");
  let backup = filters.cloneNode(true);

  const BY_CLASSIFICATION = {
    Vertebrate: ["Bear", "Turtle", "Whale", "Salmon", "Ostrich"],
    "Warm-blooded": ["Bear", "Whale", "Ostrich"],
    "Cold-blooded": ["Salmon", "Turtle"],
    Bird: ["Ostrich"],
  };

  const BY_ANIMAL = {
    Bear: ["Vertebrate", "Warm-blooded", "Mammal"],
    Whale: ["Vertebrate", "Warm-blooded", "Mammal"],
    Ostrich: ["Vertebrate", "Warm-blooded", "Bird"],
    Turtle: ["Vertebrate", "Cold-blooded"],
    Salmon: ["Vertebrate", "Cold-blooded"],
  };

  function toggleByList(event) {
    let listType = event.target.id;
    let value = event.target.value;

    let matches =
      listType === "animals" ? BY_ANIMAL[value] : BY_CLASSIFICATION[value];
    let children =
      listType === "animals"
        ? [...classifications.children]
        : [...animals.children];
    let otherParent =
      event.target.previousElementSibling || event.target.nextElementSibling;

    children.forEach((element) => element.remove());
    matches.forEach((match) => {
      let element = document.createElement("option");
      element.value = match;
      element.innerText = match;

      otherParent.appendChild(element);
    });
  }

  function bindListeners() {
    classifications = document.querySelector("#animal-classifications");
    animals = document.querySelector("#animals");
    classifications.addEventListener("change", toggleByList);
    animals.addEventListener("change", toggleByList);
  }

  function reset(event) {
    event.preventDefault();
    filters = document.querySelector("#selection-filters");
    filters.parentElement.appendChild(backup);
    filters.remove();
    bindListeners();
  }

  classifications.addEventListener("change", toggleByList);
  animals.addEventListener("change", toggleByList);
  clear.addEventListener("click", reset);
});
