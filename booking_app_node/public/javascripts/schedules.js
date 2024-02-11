//  entries in the schedules route:
// [{"id":1,"staff_id":1,"student_email":null,"date":"07-01-18","time":"06:10"},{"id":2,"staff_id":1,"student_email":null,"date":"07-02-18","time":"06:20"},{"id":3,"staff_id":1,"student_email":"marquise@jacobi.info","date":"07-03-18","time":"06:30"},{"id":4,"staff_id":2,"student_email":null,"date":"08-01-18","time":"07:10"},{"id":5,"staff_id":2,"student_email":"keaton@morar.io","date":"08-02-18","time":"07:20"},{"id":6,"staff_id":3,"student_email":null,"date":"09-01-18","time":"08:10"},{"id":7,"staff_id":3,"student_email":"aniya@dachkuphal.biz","date":"09-02-18","time":"08:20"},{"id":8,"staff_id":3,"student_email":null,"date":"09-03-18","time":"08:30"},{"id":9,"staff_id":3,"student_email":null,"date":"09-04-18","time":"08:40"}]

async function fetchSchedules() {
  try {
    let request = fetch("/api/schedules", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    let timeout = new Promise((resolve) => {
      setTimeout(() => {
        resolve(new Error("Request timed out. Please try again."));
      }, 5000);
    });

    let response = await Promise.race([request, timeout]);

    if (response instanceof Error) {
      throw response;
    } else if (!response.ok) {
      throw error(`Request error. Status: ${response.status}`);
    } else {
      let body = await response.json();
      return body;
    }
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function countSchedules() {
  let response = await fetchSchedules();
  if (response instanceof Error) {
    console.error("Unable to provide schedule status at this time.");
    return undefined;
  }

  let schedules = {};

  for (let entry of response) {
    if (entry.student_email === null) {
      schedules[`staff ${entry.staff_id}`] =
        schedules[`staff ${entry.staff_id}`] + 1 || 1;
    }
  }

  if (Object.getOwnPropertyNames(schedules).length == 0) {
    console.log("There are currently no schedules available");
  } else {
    console.log(JSON.stringify(schedules));
  }
}

countSchedules();
