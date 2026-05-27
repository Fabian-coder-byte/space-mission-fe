import { apiFetch } from "./client";

export async function getLaunchSites() {
  return apiFetch("/launch-sites");
}

export async function getLaunchSitesPaginated(
  page = 1,
  limit = 10,
  search = "",
) {
  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("limit", String(limit));
  if (search) params.set("search", search);
  return apiFetch(`/launch-sites/paginated?${params.toString()}`);
}

export async function getOneLaunchSite(id) {
  return apiFetch(`/launch-sites/${id}`);
}

export async function createLaunchSite(data) {
  return apiFetch("/launch-sites", "POST", data);
}

export async function updateLaunchSite(id, data) {
  return apiFetch(`/launch-sites/${id}`, "PATCH", data);
}

export async function deleteLaunchSite(id) {
  return apiFetch(`/launch-sites/${id}`, "DELETE");
}
