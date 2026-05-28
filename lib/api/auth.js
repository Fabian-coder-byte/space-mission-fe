const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function loginApi(data) {
  console.log("Login API called with data:", API_URL, data);
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  let result = null;
  try {
    result = await response.json();
  } catch {
    result = null;
  }

  if (!response.ok) {
    throw new Error(result?.message || "Errore durante il login");
  }

  if (result?.session?.accessToken) {
    localStorage.setItem("sb_access_token", result.session.accessToken);
  }

  return result;
}

export async function registerApi(data) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  let result = null;
  try {
    result = await response.json();
  } catch {
    result = null;
  }

  if (!response.ok) {
    throw new Error(result?.message || "Errore durante la registrazione");
  }

  return result;
}

export async function forgotPasswordApi(data) {
  const response = await fetch(`${API_URL}/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  let result = null;
  try {
    result = await response.json();
  } catch {
    result = null;
  }

  if (!response.ok) {
    throw new Error(result?.message || "Errore durante il recupero password");
  }

  return result;
}

export async function resetPasswordApi(data) {
  const response = await fetch(`${API_URL}/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  let result = null;
  try {
    result = await response.json();
  } catch {
    result = null;
  }

  if (!response.ok) {
    throw new Error(
      result?.message || "Errore durante il reset della password",
    );
  }

  return result;
}

export async function logoutApi() {
  const accessToken =
    typeof window !== "undefined"
      ? localStorage.getItem("sb_access_token")
      : null;

  const headers = { "Content-Type": "application/json" };
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const response = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
    headers,
  });

  if (typeof window !== "undefined") {
    localStorage.removeItem("sb_access_token");
  }

  return response;
}

export async function getMeApi(accessToken) {
  const response = await fetch(`${API_URL}/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
}
