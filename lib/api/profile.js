import { apiFetch } from "./client";

export async function updateProfile(data) {
  return apiFetch("/auth/profile", "PATCH", data);
}

export async function changePassword(data) {
  return apiFetch("/auth/change-password", "POST", data);
}
