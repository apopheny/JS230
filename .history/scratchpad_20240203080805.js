async function fetchResource(url) {
  try {
    const request = await fetch(url);
    if (!request.ok) {
      throw new Error(request.status);
    } else {
      console.log("Resource loaded");
      const responseJson = request.json();
      console.log(responseJson);
    }
  } catch (error) {
    console.error(`Failed to load resource\nReason: ${error.message}`);
  } finally {
    console.log("Resource fetch attempt made");
  }
}

// Example usage:
fetchResource("https://jsonplaceholder.typicode.com/todos/1");
fetchResource("https://jsonplaceholder.typicode.com/todos/nonexistant");
// Logs fetched data, then "Resource fetch attempt made"
// On error, logs "Failed to load resource", then "Resource fetch attempt made"
