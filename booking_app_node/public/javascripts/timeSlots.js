document.addEventListener("DOMContentLoaded", async () => {
  let scheduleSubmitForm = document.querySelector("#schedule-submit");
  let scheduleDropdown = document.querySelector("#schedule-dropdown");
  let scheduleEmailInput = document.querySelector("#email-input");

  let scheduleDropdownRenderer = document.querySelector(
    "#scheduleDropownTemplate"
  ).innerHTML;

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
      return Promise.all([getAvailableSchedules(), getStaff()]);
    } catch (error) {
      throw Error;
    }
  }

  parseStaffSchedules().then(console.log);
});
