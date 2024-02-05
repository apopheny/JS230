function fetchUserData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject({ error: "User not found" }), 500);
  });
}

fetchUserData()
  .catch((message) => console.log(message.error))
  .finally(console.log("Fetching complete"));
