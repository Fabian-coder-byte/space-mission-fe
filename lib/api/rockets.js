import { apiFetch } from "./client";

export async function getRockets() {
  return apiFetch("/rockets");
}

export async function getRocketsPaginated(page = 1, limit = 10, search = "") {
  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("limit", String(limit));
  if (search) params.set("search", search);
  return apiFetch(`/rockets/paginated?${params.toString()}`);
}

export async function getOneRocket(id) {
  return apiFetch(`/rockets/${id}`);
}

export async function createRocket(data) {
  return apiFetch("/rockets", "POST", data);
}

export async function updateRocket(id, data) {
  return apiFetch(`/rockets/${id}`, "PATCH", data);
}

export async function deleteRocket(id) {
  return apiFetch(`/rockets/${id}`, "DELETE");
}
