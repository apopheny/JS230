// Implement a function that tracks events on a web page by wrapping a callback function in a function that adds each event to a tracker object before invoking the callback. In other words, your function should take a callback function as an argument and return a new function that:

//     Records the event, if the specific event hasn't been recorded before.
//     Executes the original callback function.

/*
Problem
Create a function which takes a callback function argument. It should return a new function which invokes the callback, as well as keep track of whether the event has been executed before.

Examples
Assume that the user clicks the elements in the following order: div#blue, div#red, div#orange, and div#green. 

divRed.addEventListener('click', track(event => {
  document.body.style.background = 'red';
}));

divBlue.addEventListener('click', track(event => {
  event.stopPropagation();
  document.body.style.background = 'blue';
}));

divOrange.addEventListener('click', track(event => {
  document.body.style.background = 'orange';
}));

divGreen.addEventListener('click', track(event => {
  document.body.style.background = 'green';
}));

tracker.list().length
4
Insights: there are 4 separate events. One for each click, or one for each listener?
Clarification: One for each event (click). Additionally, we can assume that our function should only be concerned with click events, as there would be additional events stored if it were concerned with all events, as in order to click on these elements we would also mouseover and hover.

tracker.elements()
[div#blue, div#red, div#orange, div#green]
tracker.elements()[0] === document.querySelector('#blue')
true
tracker.elements()[3] === document.querySelector('#green')
true
Insights: Function keeps a list of elements on which there are listeners. This should only be accessed as an interface method

tracker.list()[0]
click { target: div#blue, buttons: 0, clientX: 195, clientY: 190, layerX: 195, layerY: 190 }
 The event listed in `tracker` can differ by browser (Chrome - PointerEvent, Firefox - click)
Insights: the list keeps track of the events

tracker.clear()
0
tracker.list()
[]
tracker.list()[0] = 'abc'
tracker.list().length
0
Insights: the function has a clear method which empties out the events list (and probably the elements list), and the lists are private data

Other insights: The events are not passed into the function we are implementing. It should keep track of all events on a page (after DOMContentLoaded) without needing to be invoked directly.

Approach
- Use a class-based structure for private data and easy instantiation
  - This isn't going to work as the examples invoke a function named `track` and pass the callback in
- Attach a click event listener to document in order to capture all events as they bubble up
- When fired, this event listener should push this event to its list property, and push the event.target to its elements property
- The clear method should reset these two properties

*/

function track(callback, metaListener = tracker) {
  return function (event) {
    metaListener.addEvent(event);
    metaListener.addElement(event.target);

    callback(event);
  };
}

class EventTracker {
  #eventList;
  #elementsList;

  constructor() {
    this.clear();
  }

  addEvent(event) {
    if (!this.#eventList.includes(event)) this.#eventList.push(event);
  }

  addElement(element) {
    if (!this.#elementsList.includes(element)) this.#elementsList.push(element);
  }

  clear() {
    this.#elementsList = [];
    this.#eventList = [];
    return Number.max(this.#eventList.length, this.#elementsList.length);
  }

  list() {
    return this.#eventList.slice();
  }

  elements() {
    return this.#elementsList.slice();
  }
}

let tracker = new EventTracker();
const divRed = document.querySelector("#red");
const divBlue = document.querySelector("#blue");
const divOrange = document.querySelector("#orange");
const divGreen = document.querySelector("#green");

divRed.addEventListener(
  "click",
  track((event) => {
    document.body.style.background = "red";
  })
);

divBlue.addEventListener(
  "click",
  track((event) => {
    event.stopPropagation();
    document.body.style.background = "blue";
  })
);

divOrange.addEventListener(
  "click",
  track((event) => {
    document.body.style.background = "orange";
  })
);

divGreen.addEventListener(
  "click",
  track((event) => {
    document.body.style.background = "green";
  })
);

tracker.list().length;
// 4
tracker.elements();
// [div#blue, div#red, div#orange, div#green]
tracker.elements()[0] === document.querySelector("#blue");
// true
tracker.elements()[3] === document.querySelector("#green");
// true
tracker.list()[0];
// click { target: div#blue, buttons: 0, clientX: 195, clientY: 190, layerX: 195, layerY: 190 }
//  The event listed in `tracker` can differ by browser (Chrome - PointerEvent, Firefox - click)
tracker.clear();
// 0
tracker.list();
// []
tracker.list()[0] = "abc";
tracker.list().length;
// 0
