import { apiFetch } from "./client";

export async function getUsersPaginated(page = 1, limit = 10, search = "") {
  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("limit", String(limit));
  if (search) params.set("search", search);
  return apiFetch(`/users?${params.toString()}`);
}

export async function getOneUser(id) {
  return apiFetch(`/users/${id}`);
}
