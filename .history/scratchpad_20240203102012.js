async function fetchUserProfile(userId) {
  try {
    const profile = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`,
      "GET"
    );
    if (!profile.ok) throw new Error("User profile not reachable");
    console.log(`User ${userId}'s profile loaded`);
  } catch (error) {
    console.error(message);
  }

  try {
    const posts = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}/posts`,
      "GET"
    );
    if (!profile.ok) throw new Error("User posts not reachable");
    console.log(`User ${userId}'s posts loaded`);
  } catch (error) {
    console.error(message);
  }

  try {
    const comments = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}/comments`,
      "GET"
    );
    if (!profile.ok) throw new Error("User posts not reachable");
    console.log(`User ${userId}'s comments loaded`);
  } catch (error) {
    console.error(message);
  }
}

// Example usage:
fetchUserProfile(1);
// Logs user profile, posts, and comments. Catches and logs errors at each step if they occur.
