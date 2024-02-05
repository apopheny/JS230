const downloadFilePromise = async function () {
  console.log("Downloading file...");

  let message = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Download Complete!");
    }, 1500);
  });
};

downloadFilePromise().then((message) => {
  console.log(message);
});
