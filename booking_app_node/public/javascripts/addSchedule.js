document.addEventListener("DOMContentLoaded", () => {
  Handlebars.registerPartial(
    "staffDropdownPartial",
    document.querySelector("#staffDropdownPartial").innerHTML
  );

  let formTemplate = Handlebars.compile(
    document.querySelector("#schedulingTemplate").innerHTML
  );

  const main = document.querySelector("#main");
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

  retrieveStaff()
    .then((data) => {
      main.insertAdjacentHTML("beforeend", formTemplate({ data }));
    })
    .catch(console.error);
});
