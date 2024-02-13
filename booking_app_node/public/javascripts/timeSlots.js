document.addEventListener("DOMContentLoaded", async () => {
  let scheduleSubmitForm = document.querySelector("#schedule-submit");
  let scheduleDropdown = document.getElementById("schedule-dropdown");
  let scheduleEmailInput = document.querySelector("#email-input");

  let scheduleDropdownRenderer = Handlebars.compile(
    document.querySelector("#scheduleDropownTemplate").innerHTML
  );

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
    console.log(event.target.parentElement.children.length);
    if (scheduleDropdown.children.length > 1) return;
    try {
      let html = await parseStaffSchedules();
      html = scheduleDropdownRenderer(html);
      scheduleDropdown.insertAdjacentHTML("beforeend", html);
    } catch (error) {
      console.error(error);
    }
  }

  scheduleDropdown.addEventListener("click", renderDropdown);
});
