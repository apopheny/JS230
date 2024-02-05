async function fetchUserProfile(userId) {
  try {
    const profile = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`,
      { method: "GET" }
    );
    if (!profile.ok) throw new Error("User profile not reachable");
    console.log(`User ${userId}'s profile loaded`);
    const profileData = await profile.json();
    console.log(profileData);
  } catch (error) {
    console.error(error);
  }

  try {
    const posts = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}/posts`,
      { method: "GET" }
    );
    if (!profile.ok) throw new Error("User posts not reachable");
    console.log(`User ${userId}'s posts loaded`);
    const postsData = await posts.json();
    console.log(postsData);
  } catch (error) {
    console.error(error);
  }

  try {
    const comments = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}/comments`,
      { method: "GET" }
    );
    if (!profile.ok) throw new Error("User posts not reachable");
    console.log(`User ${userId}'s comments loaded`);
    const commentsData = await comments.json();
    console.log(commentsData);
  } catch (error) {
    console.error(error);
  }
}

// Example usage:
fetchUserProfile(1);
// Logs user profile, posts, and comments. Catches and logs errors at each step if they occur.
