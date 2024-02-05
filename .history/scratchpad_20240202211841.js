const downloadFilePromise = async function () {
  console.log("Downloading file...");

  await setTimeout(() => {}, 1500);

  return "Download Complete!";
};

downloadFilePromise().then((message) => {
  console.log(message);
});
