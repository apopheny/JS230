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