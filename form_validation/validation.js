document.addEventListener("DOMContentLoaded", () => {
  let form = document.querySelector("form");
  let firstName = document.getElementById("first-name");
  let lastName = document.getElementById("last-name");
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let phone = document.getElementById("phone-number");
  let submitButton = document.querySelector(".submit");

  function validateName(element) {
    if (element.value.length === 0) {
      return false;
    }

    return true;
  }

  function validatePassword(element) {
    if (element.value.length < 10) {
      return false;
    }

    return true;
  }

  function validatePhoneNumber(element) {
    if (element.value.length === 0) return true;
    else if (!element.value.match(/^\d{3}-\d{3}-\d{4}$/)) {
      return false;
    }

    return true;
  }

  function validateEmail(element) {
    if (!element.value.match(/.+@.+/)) {
      return false;
    }

    return true;
  }

  function submitToggle() {
    if (document.querySelector(".displayed-error-message")) {
      submitButton.disabled = true;
      submitButton.value = "Please fix errors";
    } else {
      submitButton.disabled = false;
      submitButton.value = "Sign Up";
    }
  }

  form.addEventListener("focusout", (event) => {
    submitToggle();

    let dispatchTable = {
      "first-name": validateName(event.target),
      "last-name": validateName(event.target),
      email: validateEmail(event.target),
      password: validatePassword(event.target),
      "phone-number": validatePhoneNumber(event.target),
    };

    let messageArea = event.target.nextElementSibling;
    let isValid = dispatchTable[event.target.id];
    if (isValid) messageArea.className = "hidden-error-message";
    else messageArea.className = "displayed-error-message";
  });

  form.addEventListener("focusin", (event) => {
    let messageArea = event.target.nextElementSibling;
    messageArea.className = "hidden-error-message";

    submitToggle();
  });
});
