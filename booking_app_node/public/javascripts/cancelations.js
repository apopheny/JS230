document.addEventListener("DOMContentLoaded", () => {
  class Canceler {
    #templates;
    #bookings;
    constructor() {
      this.#templates = {};
      this.#bookings = null;
    }

    init() {
      $("div.student_cancel").remove();
      this.getTemplates();

      this.updateBookings().then(() => {
        this.renderSchedules();
        this.renderBookings();
      });
    }

    getTemplates() {
      this.#templates.displayBooked = Handlebars.compile(
        $("#bookedSchedulesTemplate").html()
      );

      this.#templates.displayStudent = Handlebars.compile(
        $("#studentBookingsTemplate").html()
      );

      this.#templates.displaySchedules = Handlebars.compile(
        $("#staffSchedulesTemplate").html()
      );
    }

    bindEventListeners() {
      $(".studentCancel").on("click", this.renderStudentCancel.bind(this));
      $(".staffCancel").on("click", this.cancelStaffSchedule.bind(this));
    }

    bindStudentCancelListener() {
      $("#student_cancel").on("submit", this.cancelStudentBooking.bind(this));
    }

    renderStudentCancel(event) {
      let date = event.target.closest("ul").id;
      $("main").children().remove();

      $("main").append(
        this.#templates.displayStudent(this.filterBookingInfo(date))
      );

      this.bindStudentCancelListener();
    }

    renderSchedules() {
      $("div#staffSchedules").remove();
      let $div = $(document.createElement("div"));
      $div.attr("id", "staffSchedules");
      $div.append(this.#templates.displaySchedules(this.#bookings));

      if ($("div#studentBookings").length > 0) {
        $div.insertAfter($("div#studentBookings"));
      } else {
        $("main").append($div);
      }
    }

    renderBookings() {
      this.getBookings().then((result) => {
        $("div#studentBookings").remove();
        let $div = $(document.createElement("div"));
        $div.attr("id", "studentBookings");
        $div.append(this.#templates.displayBooked(result));

        if ($("div#staffSchedules").length > 0) {
          $div.insertBefore($("div#staffSchedules"));
        } else {
          $("main").append($div);
        }

        this.bindEventListeners();
      });
    }

    updateBookings() {
      return this.getBookingInfo()
        .then((result) => (this.#bookings = result))
        .catch(console.error);
    }

    getBookingInfo() {
      let promiseRequest = new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open("GET", "/api/schedules");
        request.responseType = "json";
        request.setRequestHeader(
          "Content-Type",
          "application/json; charset=utf-8"
        );

        request.timeout = 7100;

        request.ontimeout = () => {
          reject(
            `Retrieving booking information failed due to slow network responsed. ${request.statusText}`
          );
        };

        request.onerror = () => {
          reject(
            `Retrieving student booking information failed. ${request.status}: ${request.statusText}`
          );
        };

        request.onload = () => {
          resolve(request.response);
        };

        request.send();
      });

      return promiseRequest;
    }

    cancelStaffSchedule(event) {
      let time = $(event.target).parent().siblings(".time").text();
      let date = $(event.target)
        .parent()
        .siblings(".date")
        .text()
        .match(/(\S+$)/)[1];
      let staff_id = $(event.target)
        .parent()
        .siblings("strong")
        .text()
        .match(/(\S+$)/)[1];
      let email = $(event.target).parent().siblings(".warning").text();
      email = email.length || null;

      this.postStaffCancelation(staff_id, date, time, email)
        .then(() => this.init())
        .catch(console.error);
    }

    postStaffCancelation(staff_id, date, time, email) {
      let info = { staff_id, date, time };
      if (email !== null) {
        alert(
          "This schedule cannot be canceled. Student has not canceled previously booked appointment."
        );
        return Promise.resolve("Unable to cancel schedule with booking");
      }

      let keys = Object.getOwnPropertyNames(info);
      let schedule = this.#bookings
        .filter((booking) => {
          return keys.every(
            (property) => info[property] === String(booking[property])
          );
        })
        .at(0);

      let promiseRequest = new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open("DELETE", `/api/schedules/${schedule.id}`);
        request.setRequestHeader(
          "Content-Type",
          "application/json; charset=utf-8"
        );

        request.onerror = () =>
          reject(
            `Staff schedule deletion failed: ${request.status}: ${request.statusText}`
          );

        request.onload = () => {
          if (request.status < 200 || request.status >= 300) {
            reject(request.response);
          } else {
            alert(
              `Schedule for Staff Member ${staff_id} successfully deleted!`
            );
            resolve(
              `Schedule for Staff Member ${staff_id} successfully deleted!`
            );
          }
        };

        request.send();
      });

      return promiseRequest;
    }

    cancelStudentBooking(event) {
      event.preventDefault();
      let email = $("#email")
        .text()
        .match(/(\S+$)/)[1];
      let date = $("h1")
        .text()
        .match(/(\S+$)/)[1];

      let info = this.filterBookingInfo(date, email);
      this.putStudentCancelation(info)
        .then(() => this.init())
        .catch(console.error);
    }

    putStudentCancelation([info]) {
      let promiseRequest = new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open("PUT", `/api/bookings/${info.id}`);
        request.setRequestHeader(
          "Content-Type",
          "application/json; charset=utf-8"
        );

        request.onerror = () => {
          reject(
            `Student cancelation request failed. ${request.status}: ${request.statusText}`
          );
        };

        request.onload = () => {
          alert(
            `Student cancelation request for ${info.student_email} successful!`
          );
          resolve(
            `Student cancelation request for ${info.student_email} successful!`
          );
        };

        request.send();
      });

      return promiseRequest;
    }

    filterBookingInfo(date, email) {
      if (email) {
        return this.#bookings.filter(
          (booking) => booking.date === date && booking.student_email === email
        );
      }

      return this.#bookings.filter(
        (booking) => booking.date === date && booking.student_email !== null
      );
    }

    getBookings() {
      let promiseRequest = new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open("GET", "/api/bookings");
        request.responseType = "json";
        request.setRequestHeader(
          "Content-Type",
          "application/json; charset=utf-8"
        );

        request.onerror = () => {
          reject(
            `Retrieving schedules failed. ${request.status}: ${request.statusText}`
          );
        };

        request.onload = () => {
          resolve(request.response);
        };

        request.send();
      });

      return promiseRequest;
    }
  }

  let app = new Canceler();
  app.init();
});
