function downloadFile (func) {
  console.log('Downloading file...');

  setTimeout(() => {
    func()
  }, 1500)
}

function logDownloadComplete () {
  console.log('Downloading complete!');
}

downloadFile(logDownloadComplete);