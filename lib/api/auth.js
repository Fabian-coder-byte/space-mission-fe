// src/lib/auth.js
import "server-only";
import { cookies } from "next/headers";
import { apiFetch } from "./client";

export async function getCurrentUser() {
  const token = (await cookies()).get("access_token")?.value;

  if (!token) return null;
  return apiFetch(`/auth/me`, {
    Authorization: `Bearer ${token}`,
  });
}
