import { apiFetch } from "./client";

export async function getRockets() {
  return apiFetch("/rockets");
}
