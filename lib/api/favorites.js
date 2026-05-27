import { apiFetch } from "./client";

export async function getFavorites() {
  return apiFetch("/favorites");
}

export async function checkFavorite(launchId) {
  return apiFetch(`/favorites/check/${launchId}`);
}

export async function addFavorite(data) {
  return apiFetch("/favorites", "POST", data);
}

export async function removeFavorite(id) {
  return apiFetch(`/favorites/${id}`, "DELETE");
}

export async function removeFavoriteByLaunchId(launchId) {
  return apiFetch(`/favorites/launch/${launchId}`, "DELETE");
}
