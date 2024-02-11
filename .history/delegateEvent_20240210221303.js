document.addEventListener("DOMContentLoaded", () => {
  function delegateEvent(parentElement, selector, eventType, callback) {
    if (!parentElement.contains("selector")) return false;
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
});
