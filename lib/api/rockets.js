const API_URL = "http://localhost:5000";

export async function getRocketsPaginated({
  page = 1,
  limit = 10,
  search = "",
} = {}) {
  const params = new URLSearchParams();

  params.set("page", String(page));
  params.set("limit", String(limit));

  if (search) {
    params.set("search", search);
  }

  const res = await fetch(`${API_URL}/rockets/paginated?${params.toString()}`, {
    method: "GET",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Errore durante il recupero dei razzi");
  }

  return res.json();
}

export async function deleteRocket(id) {
  const res = await fetch(`${API_URL}/rockets/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Errore durante l'eliminazione del razzo");
  }

  return res.json();
}
