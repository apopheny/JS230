document.addEventListener("DOMContentLoaded", async () => {
  Handlebars.registerPartial(
    "staffDropdownPartial",
    document.querySelector("#staffDropdownPartial").innerHTML
  );

  Handlebars.registerPartial(
    "staffDatesPartial",
    document.querySelector("#staffDropdownPartial").innerHTML
  );

  Handlebars.registerPartial(
    "staffTimePartial",
    document.querySelector("#staffTimePartial").innerHTML
  );

  let formTemplate = Handlebars.compile(
    document.querySelector("#schedulingTemplate").innerHTML
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

  async function retrieveDates(staff_id) {
    try {
      let request = await fetch(`/api/schedules/#{staff_id}`, {
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

  retrieveDates();

  let dropdownRenderer;
  async function makeNamesDropdownRenderer(count = 0) {
    if (!dropdownRenderer) {
      try {
        const staff = await retrieveStaff();
        console.log(staff);
        let staffRosterHTML = formTemplate({ data: staff });

        dropdownRenderer = function () {
          main.insertAdjacentHTML("beforeend", staffRosterHTML);
        };
      } catch (error) {
        if (count >= 3) throw error;

        count += 1;
        return makeNamesDropdownRenderer(count);
      }
    }

    return dropdownRenderer;
  }

  dropdownRenderer = await makeNamesDropdownRenderer()
    .then((renderer) => renderer())
    .catch((error) =>
      console.error(
        `Attempt to fetch staff roster failed after multiple attempts. Reason: ${error.message}`
      )
    );

  newSchedule.addEventListener("click", await makeNamesDropdownRenderer());

  document.body.insertAdjacentElement("beforeend", submit);
});
