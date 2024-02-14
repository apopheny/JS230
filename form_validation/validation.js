document.addEventListener("DOMContentLoaded", () => {
  let form = document.querySelector("form");
  let firstName = document.getElementById("first-name");
  let lastName = document.getElementById("last-name");
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let phone = document.getElementById("phone-number");
  let submitButton = document.querySelector(".submit");

  [firstName, lastName].forEach((element) =>
    element.addEventListener("keydown", validateNameChars)
  );

  function validateNameChars(event) {
    if (!event.key.match(/[a-z]/i)) {
      event.preventDefault();
      displayErrorMessage(returnNextErrorElement(event.target), {
        message: "Names must consist only of letters",
      });
    }
  }

  phone.addEventListener("keydown", validatePhoneChars);

  function validatePhoneChars(event) {
    if (!event.key.match(/([0-9]|-)/)) {
      event.preventDefault();
      displayErrorMessage(returnNextErrorElement(event.target), {
        message:
          "Optional phone number must consist only of numbers and dashes",
      });
    }
  }

  [...document.querySelectorAll('[id^="credit-card"]')].forEach((element) =>
    element.addEventListener("keydown", validateCreditChars)
  );

  function validateCreditChars(event) {
    const UTILITY_KEYS = [
      "Tab",
      "Enter",
      `Escape`,
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
    ];

    if (!event.key.match(/[0-9]/) && !UTILITY_KEYS.includes(event.key)) {
      event.preventDefault();
      displayErrorMessage(returnNextErrorElement(event.target), {
        message: "Credit card fields must each be four numeric digits",
      });
    }
    if (event.target.value.length >= 4) {
      if (event.target.nextElementSibling.className === "credit-field") {
        console.log(event.target.nextElementSibling);
        event.target.nextElementSibling.focus();
      }
    }
  }

  function validateName(element) {
    let result = { status: true };
    if (element.value.length === 0) {
      result.status = false;
      result.message = "Required field";
    } else if (!element.value.match(/[a-z]/i)) {
      result.status = false;
      result.message = "Names must consist only of letters";
    }

    return result;
  }

  function validatePassword(element) {
    let result = { status: true };
    if (element.value.length < 10) {
      result.status = false;
      result.message = "Password must be 10 or more characters";
    }

    return result;
  }

  function validatePhoneNumber(element) {
    let result = { status: true };

    if (element.value.length === 0) {
      return result;
    } else if (!element.value.match(/^([0-9]|-)+$/)) {
      result.status = false;
      result.message =
        "Optional phone number must consist of numbers and dashes";
    } else if (!element.value.match(/^\d{3}-\d{3}-\d{4}$/)) {
      result.status = false;
      result.message =
        "Optional phone number must follow the pattern 123-456-7890";
    }

    return result;
  }

  function validateEmail(element) {
    let result = { status: true };
    if (!element.value.match(/.+@.+/)) {
      result.status = false;
      result.message = "Please enter a valid email address";
    }

    return result;
  }

  function validateCreditCard(element) {
    let result = { status: true };
    if (element.value.length !== 4) {
      result.status = false;
      result.message = "Credit card segment must be 4 digits long";
    } else if (element.value.match(/[^0-9]/)) {
      result.status = false;
      result.message = "Credit card segment must be numbers only";
    }

    return result;
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

  function returnNextErrorElement(element) {
    if (!element) return null;
    if (element.id.match("-error")) return element;
    else return returnNextErrorElement(element.nextElementSibling);
  }

  function displayErrorMessage(inputField, statusObject) {
    let messageArea = inputField.id.match("-error")
      ? inputField
      : returnNextErrorElement(inputField);
    messageArea.className = "displayed-error-message";
    messageArea.innerText = statusObject.message;
  }

  function offclickValidator(event) {
    if (event.target === submitButton) return;
    submitToggle();

    let dispatchTable = {
      "first-name": validateName(event.target),
      "last-name": validateName(event.target),
      email: validateEmail(event.target),
      password: validatePassword(event.target),
      "phone-number": validatePhoneNumber(event.target),
      "credit-card-": validateCreditCard(event.target),
    };

    let messageArea = returnNextErrorElement(event.target);
    let name = event.target.id.replace(/\d+$/, "");
    let validation = dispatchTable[name];

    if (validation.status) messageArea.className = "hidden-error-message";
    else displayErrorMessage(messageArea, validation);
  }

  form.addEventListener("focusout", offclickValidator);

  form.addEventListener("focusin", (event) => {
    if (event.target === submitButton) return;
    if (document.querySelector("#form-error")) {
      document.querySelector("#form-error").remove();
    }

    let messageArea = returnNextErrorElement(event.target);
    if (event.target.id.match("credit-card")) {
      if (
        [...document.querySelectorAll('[id^="credit-card"]')].some((ele) =>
          returnNextErrorElement(ele).className.match("displayed-error")
        )
      ) {
        messageArea.className = "displayed-error-message";
      } else {
        messageArea.className = "hidden-error-message";
      }
    } else {
      messageArea.className = "hidden-error-message";
    }

    submitToggle();
  });

  function fieldValidator(element) {
    submitToggle();

    let dispatchTable = {
      "first-name": validateName(element),
      "last-name": validateName(element),
      email: validateEmail(element),
      password: validatePassword(element),
      "phone-number": validatePhoneNumber(element),
      "credit-card-": validateCreditCard(element),
    };

    let name = element.id.replace(/\d+$/, "");
    let validation = dispatchTable[name];
    return validation;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (
      [firstName, lastName, email, password, phone].some((ele) => {
        return fieldValidator(ele).status === false;
      })
    ) {
      let error = document.createElement("div");
      error.className = "displayed-error-message";
      error.id = "form-error";
      error.innerText = "Please correct errors before submission";
      document.querySelector("main").insertAdjacentElement("afterbegin", error);
      submitToggle();
    }
  });
});
