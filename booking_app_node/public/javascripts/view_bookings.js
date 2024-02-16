document.addEventListener("DOMContentLoaded", async () => {
  class Booking {
    #dates;
    #templates;

    constructor() {
      this.#dates = null;
      this.#templates = {};
      this.bookingDates = null;
    }

    init() {
      this.getTemplates();
      this.renderBookings().then(() => this.bindEventListeners());
    }

    getTemplates() {
      this.#templates.bookingDatesTemplate = Handlebars.compile(
        $("#datesTemplate").html()
      );

      this.#templates.bookingDetailTemplate = Handlebars.compile(
        $("#bookingDetails").html()
      );
    }

    bindEventListeners() {
      function dateClickEvent(event) {
        let date = $(event.target).attr("data-date");

        this.renderDetails(date);
      }

      $("#booking_dates").on("click", dateClickEvent.bind(this));
    }

    renderDetails(date) {
      this.getDetails(date)
        .then((res) => this.parseDetails(res))
        .then((res) => {
          let $ele = $(`[data-date=${date}]`);
          if ($ele.children().length > 0) {
            $ele
              .children()
              .replaceWith(this.#templates.bookingDetailTemplate(res));
          } else {
            $ele.append(this.#templates.bookingDetailTemplate(res));
          }
        })
        .catch(console.error);
    }

    parseDetails(infoArray) {
      let result = infoArray.map((details) => {
        let [staff, studentEmail, time] = details;
        return { staff, studentEmail, time };
      });

      return result;
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

          if (request.error) {
            reject(
              `Error encountered during bookings request. ${request.status}`
            );
          }

          resolve(JSON.parse(request.response));
        });

        request.send();
      });

      return requestPromise;
    }

    getDetails(date) {
      let requestPromise = new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open("GET", `/api/bookings/${date}`);
        request.setRequestHeader(
          "Content-Type",
          "application/json; charset=utf-8"
        );

        request.onload = () => {
          if (request.status < 200 || request.status >= 300) {
            reject(
              `Failed to load booking details. ${request.status}: ${request.statusText}`
            );
          }

          this.bookingDates = JSON.parse(request.response);
          resolve(this.bookingDates);
        };

        request.onerror = () => {
          reject(`Booking details request failed due to ${request.status}`);
        };

        request.send();
      });

      return requestPromise;
    }

    renderBookings() {
      let $main = $("main");

      return this.getDates()
        .then((res) => {
          return this.#templates.bookingDatesTemplate(res);
        })
        .then((res) => $main.append(res))
        .catch(console.error);
    }
  }

  let app = new Booking();
  app.init();
});
