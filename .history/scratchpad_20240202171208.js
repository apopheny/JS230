/*
Rewrite the `downloadFile` callback function from the last practice problem as a new promise-based function called `downloadFilePromise`. Instead of using a callback, it should return a promise that resolves with the message `"Download complete!"` after a delay.

```js
/*
Previous version:
function downloadFile (func) {
  console.log('Downloading file...');

  setTimeout(() => {
    func('Downloading complete!');
  }, 1500)
}

function logMessage (message) {
  console.log(message);
}

downloadFile(logMessage);
*/

function downloadFilePromise(func) {
  function downloadFile(resolve, reject) {
    console.log("Downloading file...");

    setTimeout(() => {
      resolve("Downloading complete!");
    }, 1500);
  }

  return new Promise(downloadFile);
}

downloadFilePromise().then(console.log);
