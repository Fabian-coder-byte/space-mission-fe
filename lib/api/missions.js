import { apiFetch } from "./client";

export async function getMissions() {
  return apiFetch("/missions");
}

export async function getMissionsPaginated(page = 1, limit = 10, search = "") {
  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("limit", String(limit));
  if (search) params.set("search", search);
  return apiFetch(`/missions/paginated?${params.toString()}`);
}

export async function getOneMission(id) {
  return apiFetch(`/missions/${id}`);
}

export async function getMissionBySlug(slug) {
  return apiFetch(`/missions/${slug}`);
}

export async function createMission(data) {
  return apiFetch("/missions", "POST", data);
}

export async function updateMission(id, data) {
  return apiFetch(`/missions/${id}`, "PATCH", data);
}

export async function deleteMission(id) {
  return apiFetch(`/missions/${id}`, "DELETE");
}
