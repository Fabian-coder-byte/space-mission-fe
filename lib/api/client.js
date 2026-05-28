const API_URL = process.env.BACKEND_URL || "http://localhost:5000";

export async function apiFetch(path, method = "GET", body, options = {}) {
  const accessToken =
    typeof window !== "undefined"
      ? localStorage.getItem("sb_access_token")
      : null;

  const authHeaders = accessToken
    ? { Authorization: `Bearer ${accessToken}` }
    : {};

  const response = await fetch(`${API_URL}${path}`, {
    method,
    credentials: "include",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders,
      ...(options.headers || {}),
    },
    body: body ? JSON.stringify(body) : null,
    cache: "no-store",
  });

  if (!response.ok) {
    let errorMsg = `API error: ${response.status}`;
    try {
      const err = await response.json();
      errorMsg = err?.message || errorMsg;
    } catch {
      // ignore
    }
    throw new Error(errorMsg);
  }

  return response.json();
}
