import { apiFetch } from "./client";

export async function importAll() {
  return apiFetch("/space-data/import/all", "POST");
}

export async function importAgencies() {
  return apiFetch("/space-data/import/agencies", "POST");
}

export async function importRockets() {
  return apiFetch("/space-data/import/rockets", "POST");
}

export async function importLaunchSites() {
  return apiFetch("/space-data/import/launch-sites", "POST");
}

export async function importMissions() {
  return apiFetch("/space-data/import/missions", "POST");
}
