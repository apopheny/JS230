document.addEventListener("DOMContentLoaded", async () => {
  class Booking {
    #dates;
    #templates;
    constructor() {
      this.#dates = null;
      this.#templates = {};
    }

    init() {
      this.getTemplates();
      this.renderBookings();
    }

    getTemplates() {
      this.#templates.bookingDatesTemplate = Handlebars.compile(
        document.getElementById("datesTemplate").innerHTML
      );
    }

    getDates() {
      let requestPromise = new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open("GET", "/api/bookings");
        request.setRequestHeader(
          "Content-Type",
          "application/json; charset=utf-8"
        );
        request.addEventListener("load", () => {
          if (request.status < 200 || request.status >= 300) {
            reject(
              `Failed to load bookings. ${request.status}: ${request.statusText}`
            );
          }

          resolve(JSON.parse(request.response));
        });

        request.send();
      });

      return requestPromise;
    }

    renderBookings() {
      let $main = $("main");
      this.getDates()
        .then((res) => this.#templates.bookingDatesTemplate(res))
        .then((res) => $main.append(res));
    }
  }

  let app = new Booking().init();
});
