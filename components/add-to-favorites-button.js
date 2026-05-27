"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  checkFavorite,
  addFavorite,
  removeFavoriteByLaunchId,
} from "@/lib/api/favorites";

export default function AddToFavoritesButton({
  missionId,
  missionName,
  agencyName,
  launchDate,
  imageUrl,
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("sb_access_token");
    if (!token) {
      setLoading(false);
      return;
    }
    setIsLoggedIn(true);
    checkFavorite(missionId)
      .then((data) => {
        setIsFavorite(data.isFavorite);
        setFavoriteId(data.favoriteId);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [missionId]);

  async function handleToggle() {
    setSaving(true);
    try {
      if (isFavorite) {
        await removeFavoriteByLaunchId(missionId);
        setIsFavorite(false);
        setFavoriteId(null);
      } else {
        const data = await addFavorite({
          launchId: missionId,
          launchName: missionName,
          agencyName: agencyName || undefined,
          net: launchDate || undefined,
          imageUrl: imageUrl || undefined,
        });
        setIsFavorite(true);
        setFavoriteId(data.id);
      }
    } catch {
      // silently fail
    } finally {
      setSaving(false);
    }
  }

  if (loading) return null;

  if (!isLoggedIn) {
    return (
      <Link
        href="/login"
        className="inline-flex w-full items-center justify-center rounded-xl border border-slate-700 px-4 py-3 text-sm font-medium text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400"
      >
        Accedi per salvare nei preferiti
      </Link>
    );
  }

  return (
    <button
      onClick={handleToggle}
      disabled={saving}
      className={`inline-flex w-full items-center justify-center rounded-xl border px-4 py-3 text-sm font-semibold transition disabled:opacity-60 ${
        isFavorite
          ? "border-red-500/40 bg-red-500/10 text-red-300 hover:border-red-500/60 hover:bg-red-500/20"
          : "border-cyan-500/40 bg-cyan-500/10 text-cyan-300 hover:border-cyan-500/60 hover:bg-cyan-500/20"
      }`}
    >
      {saving ? "..." : isFavorite ? "★ Rimuovi dai preferiti" : "☆ Aggiungi ai preferiti"}
    </button>
  );
}
