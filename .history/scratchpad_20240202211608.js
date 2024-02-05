const downloadFilePromise = function () {
  console.log("Downloading file...");

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Download Complete!");
    }, 1500);
  });
};

downloadFilePromise().then((message) => {
  console.log(message);
});
