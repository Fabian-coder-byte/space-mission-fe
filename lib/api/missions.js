import { apiFetch } from "./client";

export async function getMissions() {
  return apiFetch("/missions");
}

export async function getMissionBySlug(slug) {
  return apiFetch(`/missions/${slug}`);
}
