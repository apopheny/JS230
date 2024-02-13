document.addEventListener("DOMContentLoaded", async () => {
  let staticTemplate = Handlebars.compile(
    document.querySelector("#staticTemplate").innerHTML
  );

  let dynamicNameTemplate = Handlebars.compile(
    document.querySelector("#dynamicSchedulingTemplate").innerHTML
  );

  let dynamicDateTemplate = Handlebars.compile(
    document.querySelector("#dynamicDateTemplate").innerHTML
  );

  let dynamicTimeTemplate = Handlebars.compile(
    document.querySelector("#dynamicTimeTemplate").innerHTML
  );

  const main = document.querySelector("#main");
  const submit = document.querySelector("#scheduleSubmit");
  const newSchedule = document.querySelector("#newSchedule");

  async function retrieveStaff() {
    try {
      let request = await fetch("/api/staff_members", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!request.ok)
        throw new Error(`Staff retrieval failed. Status: ${request.status}`);

      return await request.json();
    } catch (error) {
      throw error;
    }
  }

  let renderOuterInput = (function () {
    let count = 0;
    async function renderOuterInput() {
      let innerHTML = staticTemplate({ count });
      count += 1;
      main.insertAdjacentHTML("beforeend", innerHTML);
      document.body.insertAdjacentElement("beforeend", submit);

      let newForm = document.querySelectorAll("form");
      newForm = newForm[newForm.length - 1];

      let nameDropdown = newForm.querySelector("[name^=staffNames]");
      nameDropdown.parentElement.addEventListener("click", populateDateTime);
      nameDropdown.addEventListener("click", renderStaffNames);

      let dateDropdown = newForm.querySelector("[name^=staffDates]");
      dateDropdown.addEventListener("click", makeChildrenVisible);

      let timeDropdown = newForm.querySelector("[name^=staffTime]");
      timeDropdown.addEventListener("click", makeChildrenVisible);
    }

    return renderOuterInput;
  })();

  function makeChildrenVisible(event) {
    event.stopPropagation();
    toggleVisibility(event.target);
  }

  function toggleVisibility(parent) {
    [...parent.querySelectorAll(".divDropdown")].forEach((ele) => {
      if (ele.hidden) ele.removeAttribute("hidden");
      else ele.hidden = true;
    });
  }

  let renderStaffNames = (function () {
    let data;
    async function renderBaseTemplate(event) {
      let id = event.target.id.match(/\d+$/)[0];
      let names = document.querySelector(`#staffNames_${id}`);

      if (names.parentElement.children.length > 1) {
        toggleVisibility(names.parentElement);
        return;
      }

      try {
        if (!data) data = await retrieveStaff();
        let innerHTML = dynamicNameTemplate(data);
        names.insertAdjacentHTML("afterend", innerHTML);
      } catch (error) {
        throw error;
      }
    }

    return renderBaseTemplate;
  })();

  async function retrieveDates(staff_id) {
    try {
      let request = await fetch(`/api/schedules/${staff_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!request.ok)
        throw new Error(`Staff retrieval failed. Status: ${request.status}`);

      let data = await request.json();
      data = data.filter((slot) => slot.student_email === null);

      return data;
    } catch (error) {
      throw error;
    }
  }

  async function populateDateTime(event) {
    event.stopPropagation();
    if (event.target.getAttribute("name") === "staffNames") return;

    let siblings = [...event.target.parentElement.children];
    let formID = siblings[0].id.match(/\d+$/)[0];

    siblings.forEach((ele) => {
      if (!ele.id.match("staffNames") && ele.id !== event.target.id)
        ele.hidden = true;
    });

    let dateDropdown = document.querySelector(`#staffDates_${formID}`);
    if (dateDropdown.parentElement.children.length > 1)
      [...dateDropdown.parentElement.children].forEach((child) => {
        if (Number.isFinite(Number(child.id))) child.remove();
      });

    let timeDropdown = document.querySelector(`#staffTime_${formID}`);
    if (timeDropdown.parentElement.children.length > 1)
      [...timeDropdown.parentElement.children].forEach((child) => {
        if (Number.isFinite(Number(child.id))) child.remove();
      });

    try {
      let data = await retrieveDates(event.target.id);

      let dateHTML = dynamicDateTemplate(data);
      let timeHTML = dynamicTimeTemplate(data);
      dateDropdown.insertAdjacentHTML("afterEnd", dateHTML);
      dateDropdown.parentElement.addEventListener("click", hideNonrelevant);
      timeDropdown.insertAdjacentHTML("afterEnd", timeHTML);
      timeDropdown.parentElement.addEventListener("click", hideNonrelevant);
    } catch (error) {
      throw error;
    }
  }

  function hideNonrelevant(event) {
    [...event.currentTarget.children].forEach((child) => {
      if (!child.id.match("staff") && child.id !== event.target.id)
        child.hidden = true;
    });

    let conformingTarget;
    if (event.target.parentElement.firstElementChild.id.match("staffDates")) {
      conformingTarget = event.target.parentElement.nextElementSibling;
    } else {
      conformingTarget = event.target.parentElement.previousElementSibling;
    }

    [...conformingTarget.children].forEach((child) => {
      if (Number.isFinite(Number(child.id)) && child.id !== event.target.id) {
        child.hidden = true;
      }
    });
  }

  function formMap(forms, formID) {
    let selectedElements = ["#staffNames_", "#staffDates_", "#staffTime_"]
      .map((selector) => {
        return [
          ...forms.querySelector(selector + formID).parentElement.children,
        ].filter((child) => !child.hidden && Number.isFinite(Number(child.id)));
      })
      .flat();

    let values = selectedElements.map((ele) => ele.getAttribute("value"));
    return values;
  }

  function valuesToJSON(values) {
    return values.map((value) => {
      let schedule = {};
      value.forEach((value, index) => {
        switch (index) {
          case 0:
            schedule.staff_id = value;
            break;
          case 1:
            schedule.date = value;
            break;
          case 2:
            schedule.time = value;
            break;
        }
      });
      return schedule;
    });
  }

  function compileData() {
    let forms = [...document.querySelectorAll("[data-id=form]")];
    if (forms.length === 0) return null;
    let formIDs = [...forms.map((form) => form.id.match(/\d+$/)[0])];
    let values = formIDs.map((id, index) => formMap(forms[index], id));
    let schedules = valuesToJSON(values);
    let json = { schedules };

    return json;
  }

  async function postData() {
    let body = compileData();

    try {
      let request = await fetch("api/schedules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!request.ok)
        throw new Error(`POST request failed. Status: ${request.status}`);

      alert(`Schedule added!`);
      renderStaffNames();
    } catch (error) {
      alert(error.message);
    }
  }

  newSchedule.addEventListener("click", renderOuterInput);
  submit.addEventListener("click", postData);
  renderOuterInput();
});
