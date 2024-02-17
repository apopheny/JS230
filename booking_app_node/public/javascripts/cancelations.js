document.addEventListener("DOMContentLoaded", () => {
  class Canceler {
    #templates;
    #bookings;
    constructor() {
      this.#templates = {};
      this.#bookings = null;
    }

    init() {
      this.getTemplates();

      this.renderBookings();
      if (!this.#bookings) {
        this.updateBookings()
          .then(() => this.renderSchedules())
          .then(() => this.bindEventListeners());
      } else {
        this.renderSchedules();
        this.bindEventListeners();
      }
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
      console.log(email);
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
        return;
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

    renderStudentCancel(event) {
      let date = event.target.closest("ul").id;
      $("main").children().remove();

      $("main").append(
        this.#templates.displayStudent(this.filterBookingInfo(date))
      );

      this.bindStudentCancelListener();
    }

    updateBookings() {
      return this.getBookingInfo()
        .then((result) => (this.#bookings = result))
        .catch(console.error);
    }

    renderBookings() {
      this.getBookings().then((result) => {
        $("main").children().remove();
        $("main").append(this.#templates.displayBooked(result));
      });
    }

    renderSchedules() {
      $("main").append(this.#templates.displaySchedules(this.#bookings));
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

        request.onError = () => {
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
