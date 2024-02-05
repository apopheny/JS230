function loadData() {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.7) {
      resolve("Data loaded from server");
    }

    reject(new Error("Network error"));
  });
}

function useCache() {
  return new Promise((resolve) => resolve("Data loaded from cache"));
}

loadData()
  .then(console.log)
  .catch((error) => {
    console.log(error);
    useCache().then(console.log);
  });
