document.addEventListener("DOMContentLoaded", () => {
  function delegateEvent(parentElement, selector, eventType, callback) {
    let child = document.querySelector(selector);
    // console.log(parentElement, child);
    if (!parentElement || !child) return undefined;
    if (!parentElement.contains(child)) return undefined;

    parentElement.addEventListener(eventType, callback);
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

  // console.log(delegateEvent(element1, "p", "click", callback) === undefined);
  // console.log(delegateEvent(element2, "p", "click", callback) === true);
  console.log(delegateEvent(element2, "h1", "click", callback) === true);
  // console.log(elegateEvent(element3, "h1", "click", callback) === true);
  // console.log(delegateEvent(element3, "aside p", "click", callback) === true);
  // console.log(delegateEvent(element2, "p", "click", callback) === true);
});
