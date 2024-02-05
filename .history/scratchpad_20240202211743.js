const downloadFilePromise = async function () {
  console.log("Downloading file...");

  await setTimeout(() => {
    return "Download Complete!";
  }, 1500);
};

downloadFilePromise().then((message) => {
  console.log(message);
});
