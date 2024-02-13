document.addEventListener("DOMContentLoaded", async () => {
  async function getAvailableSchedules() {
    try {
      let request = await fetch("/api/schedules", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!request.ok) {
        throw new Error(
          `Schedules GET request failed. Status: ${request.status}`
        );
      }

      let result = await request.json();
      return result.filter((slot) => slot.student_email === null);
    } catch (error) {
      throw error;
    }
  }

  async function getStaff() {
    try {
      let request = await fetch("/api/staff_members", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!request.ok) {
        throw new Error(`Staff GET request failed. Status: ${request.status}`);
      }

      return await request.json();
    } catch (error) {
      throw error;
    }
  }

  async function parseStaffSchedules() {
    try {
      let [schedule, staff] = await Promise.all([
        getAvailableSchedules(),
        getStaff(),
      ]);

      schedule.forEach((schedule) => {
        schedule.name = staff.find((ele) => ele.id === schedule.staff_id).name;
      });
      console.log(schedule);
      return { schedule };
    } catch (error) {
      throw error;
    }
  }

  async function renderDropdown(event) {
    if (scheduleDropdown.children.length > 1) return;
    try {
      let html = await parseStaffSchedules();
      html = scheduleDropdownRenderer(html);
      scheduleDropdown.innerHTML = html;
    } catch (error) {
      console.error(error);
    }
  }

  let getStudents = (function () {
    let students;

    function getStudents(isNewStudent) {
      if (isNewStudent) students = null;
      if (students) return Promise.resolve(students);

      return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open("GET", "/api/students");
        request.setRequestHeader("Accept", "application/json");
        request.addEventListener("loadend", (event) => {
          let response = event.target;
          if (response.status < 200 || response.status >= 300) {
            reject(
              new Error(`Student retrieval failed. Status: ${response.status}`)
            );
          } else {
            students = JSON.parse(response.responseText); // throws error, 'undefined' is not valid JSON
            resolve(students);
          }
        });

        request.send(); // in network tab, correct response is sent
      });
    }

    return getStudents;
  })();

  let onDropdownSelect = (function () {
    let selectedSchedule;

    function onDropdownSelect(event) {
      if (!event) return selectedSchedule;
      let scheduleValues = event.target.value.split("_");
      if (scheduleValues.length < 3) return null;
      selectedSchedule = {
        staff_id: scheduleValues[0],
        date: scheduleValues[1],
        time: scheduleValues[2],
        id: scheduleValues[3],
      };

      return selectedSchedule;
    }

    return onDropdownSelect;
  })();

  async function postSchedule(body) {
    try {
      let request = await fetch(`/api/bookings/`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      return request;
    } catch (error) {
      throw error;
    }
  }

  function renderNewStudentForm(templateBody) {
    let html = newStudentRenderer(templateBody);
    document.querySelector("main").insertAdjacentHTML("beforeend", html);
  }

  async function addNewStudent(requestBody) {
    try {
      let request = await fetch("/api/students", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
          // 'Accept': 'application/json'
        },
      });

      if (!request.ok)
        throw new Error(
          `New student addition failed. Status: ${request.status}`
        );

      let response = await request.text();
      return response;
    } catch (error) {
      throw error;
    }
  }

  function bindNewStudentListener() {
    newStudentForm = document.querySelector("#new-student-form");
    newStudentForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      let email = document.querySelector("#new-student-email-input").value;
      let name = document.querySelector("#new-student-name-input").value;
      let booking_sequence = document.querySelector(
        "#new-student-booking-sequence"
      ).value;

      try {
        let newStudentResult = await addNewStudent({
          email,
          name,
          booking_sequence,
        });

        alert(newStudentResult);
      } catch (error) {
        alert(error.message);
      }

      let scheduleID = document
        .getElementById("schedule-dropdown")
        .value.match(/\d+$/)[0];

      try {
        let scheduleAddResult = await postSchedule({
          id: scheduleID,
          student_email: email,
        });

        alert("Booked");
        newStudentForm.querySelector(".submit").disabled = true;
      } catch (error) {
        alert(error.message);
      }
    });
  }

  async function onScheduleSubmit(event) {
    event.preventDefault();
    scheduleSubmitForm.querySelector(".submit").disabled = true;

    let schedule = onDropdownSelect();
    console.log(schedule);
    let student_email = scheduleEmailInput.value;
    try {
      let response = await postSchedule({ id: schedule.id, student_email });
      if (!response.ok) {
        let bookingSequence = await response.text();
        bookingSequence = bookingSequence.match(/\d+$/)[0];
        renderNewStudentForm({
          email: student_email,
          sequence: bookingSequence,
        });
        bindNewStudentListener();
      } else {
        alert("Booked");
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  let scheduleSubmitForm = document.querySelector("#schedule-submit");
  let scheduleDropdown = document.getElementById("schedule-dropdown");
  let scheduleEmailInput = document.querySelector("#email-input");
  let newStudentForm;

  let scheduleDropdownRenderer = Handlebars.compile(
    document.querySelector("#scheduleDropownTemplate").innerHTML
  );

  let newStudentRenderer = Handlebars.compile(
    document.querySelector("#newStudentTemplate").innerHTML
  );

  scheduleDropdown.addEventListener("click", renderDropdown);
  scheduleSubmitForm.addEventListener("click", onDropdownSelect);
  scheduleSubmitForm.addEventListener("submit", onScheduleSubmit);
});
