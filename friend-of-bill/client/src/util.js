export async function makeRequest(endpoint, method = 'GET', settings = {}) {
  const response = await fetch(endpoint, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    ...settings,
  });
  if(!response.ok) {
      throw new Error();
  }
  return response.json();
}
