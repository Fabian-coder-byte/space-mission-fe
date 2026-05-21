const API_URL = "http://localhost:5000";

export async function apiFetch(path, method = "GET", body, options = {}) {
  console.log("PATH", path);
  const response = await fetch(`${API_URL}${path}`, {
    method: method,
    credentials: "include",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    body: body ? JSON.stringify(body) : null,
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  let data = await response.json();
  console.log("DATA2RES", data);
  return data;
}
