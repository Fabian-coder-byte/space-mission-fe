const API_URL = process.env.BACKEND_URL || "http://localhost:5000";

export async function serverFetch(path) {
  try {
    const res = await fetch(`${API_URL}${path}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
