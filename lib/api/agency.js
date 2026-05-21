import { apiFetch } from "./client";

export async function getAgencies() {
  return apiFetch("/agencies");
}

export async function createAgencies(data) {
  return apiFetch("/agencies", "POST", data);
}

export async function getAgenciesPagination(page, limit, search) {
  console.log("PARLE", page, limit);
  const params = new URLSearchParams({
    page: Number(page),
    limit: Number(limit),
    search: String(search),
  });
  return apiFetch(`/agencies/paginated?${params.toString()}`);
}

export async function deleteAgency() {
  return apiFetch("/agencies", "DELETE");
}

export async function getOneAgency(id) {
  return apiFetch(`/agencies/${id}`);
}
