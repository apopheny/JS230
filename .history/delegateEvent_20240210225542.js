document.addEventListener("DOMContentLoaded", () => {
  function delegateEvent(parentElement, selector, eventType, callback) {
    if (!parentElement) return undefined;
    let child = parentElement.querySelector(selector);

    function wtf(event) {
      const validTargets = [...parentElement.querySelectorAll(selector)];
      if (validTargets.includes(event.target)) callback(event);
    }

    parentElement.addEventListener(eventType, wtf);
    return true;
  }

  // Possible elements for use with the scenarios
  const element1 = document.querySelector("table");
  const element2 = document.querySelector("main h1");
  const element3 = document.querySelector("main");

  const callback = ({ target, currentTarget }) => {
    alert(
      `Target: ${target.tagName}\nCurrent Target: ${currentTarget.tagName}`
    );
  };

  const newP = document.createElement("P");
  const newContent = document.createTextNode("New Paragraph");
  newP.appendChild(newContent);

  element2.appendChild(newP);
  // console.log(delegateEvent(element1, "p", "click", callback) === undefined);
  // console.log(delegateEvent(element2, "p", "click", callback) === true);
  // console.log(delegateEvent(element2, "h1", "click", callback) === true);
  // console.log(delegateEvent(element3, "h1", "click", callback) === true);
  // console.log(delegateEvent(element3, "aside p", "click", callback) === true);
  console.log(delegateEvent(element2, "p", "click", callback) === true);
});
