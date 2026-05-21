export async function loginApi(data) {
  const response = await fetch("http://localhost:5000/auth/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  let result = null;
  console.log("response", response);

  try {
    result = await response.json();
  } catch {
    result = null;
  }

  if (!response.ok) {
    throw new Error(result?.message || "Errore durante il login");
  }

  return result;
}
