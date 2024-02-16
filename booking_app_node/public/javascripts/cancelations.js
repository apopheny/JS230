document.addEventListener("DOMContentLoaded", () => {
  class Canceler {
    #templates;
    constructor() {
      this.#templates = {};
    }

    init() {
      this.getTemplates();
      this.renderBookings();
    }

    renderBookings() {
      this.getBookings().then((result) =>
        $("main").append(this.#templates.displayBooked(result))
      );
    }

    getTemplates() {
      this.#templates.displayBooked = Handlebars.compile(
        $("#bookedSchedulesTemplate").html()
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
