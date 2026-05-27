import { apiFetch } from "./client";

export async function getSiteSettings() {
  return apiFetch("/site-settings");
}

export async function updateSiteSettings(data) {
  return apiFetch("/site-settings", "PATCH", data);
}
