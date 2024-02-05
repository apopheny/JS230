const downloadFilePromise = async function () {
  console.log("Downloading file...");

  let message = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Download Complete!");
    }, 1500);
  });

  return message;
};

downloadFilePromise().then((message) => {
  console.log(message);
});
