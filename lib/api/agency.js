import { apiFetch } from "./client";

export async function getAgencies() {
  return apiFetch("/agencies");
}

export async function createAgencies(data) {
  return apiFetch("/agencies", "POST", data);
}

export async function getAgenciesPagination(page, limit, search) {
  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("limit", String(limit));
  if (search) params.set("search", search);
  return apiFetch(`/agencies/paginated?${params.toString()}`);
}

export async function deleteAgency(id) {
  return apiFetch(`/agencies/${id}`, "DELETE");
}

export async function getOneAgency(id) {
  return apiFetch(`/agencies/${id}`);
}

export async function updateAgency(id, data) {
  return apiFetch(`/agencies/${id}`, "PATCH", data);
}

export async function exportAgenciesCsv() {
  const res = await fetch(`http://localhost:5000/agencies/export/csv`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Errore durante l'esportazione CSV");
  }

  return res.blob();
}
