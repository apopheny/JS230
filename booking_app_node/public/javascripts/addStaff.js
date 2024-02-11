document.addEventListener("DOMContentLoaded", () => {
  let staffForm = document.querySelector("#staffForm");
  let email = document.querySelector("#email");
  let name = document.querySelector("#name");

  async function onStaffPost(name, email) {
    try {
      let request = await fetch("/api/staff_members", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      if (!request.ok) throw new Error(await request.text());
      let response = await request.json();
      return response;
    } catch (error) {
      console.error(error.message);
      return error;
    }
  }

  async function onStaffSubmit(event) {
    event.preventDefault();
    let response = await onStaffPost(name.value, email.value);

    if (response instanceof Error) alert(response);
    else alert(`Successfully created staff with id: ${response.id}`);
  }

  staffForm.addEventListener("submit", onStaffSubmit);
});
