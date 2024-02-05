//  Write JavaScript code that makes a GET request to this URL: `https://api.github.com/repos/rails/rails`.

function getRailsGithub() {
  const request = new XMLHttpRequest();
  request.open("GET", `https://api.github.com/repos/rails/rails`);
  request.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  request.send();
  console.log(request.status);
}

getRailsGithub();
