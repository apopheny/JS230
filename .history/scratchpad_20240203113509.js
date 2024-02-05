let request = new XMLHttpRequest();
request.open("GET", "hts://api.github.com/repos/rails/rails");
request.setRequestHeader("Accept", "application/json");

request.addEventListener("load", (event) => {
  console.log(request.status);
  let data = JSON.parse(request.response);
  console.log(data.open_issues);
});

request.addEventListener("error", (event) => {
  console.log("The request could not be completed!");
});

request.send();
