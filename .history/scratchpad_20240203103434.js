//  Write JavaScript code that makes a GET request to this URL: `https://api.github.com/repos/rails/rails`.

function getRailsGithub() {
  const request = new XMLHttpRequest();
  request.open("GET");
  request.responseType("application/json charset=utf-8");
  request.send();
  console.log(request.status);
}
