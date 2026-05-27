"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getMeApi } from "@/lib/api/auth";
import { updateProfile } from "@/lib/api/profile";
import { getFavorites, removeFavoriteByLaunchId } from "@/lib/api/favorites";

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Intl.DateTimeFormat("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  }).format(new Date(dateStr)) + " UTC";
}

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: "", username: "", bio: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [favorites, setFavorites] = useState([]);
  const [favLoading, setFavLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const token = localStorage.getItem("sb_access_token");
        const data = await getMeApi(token);
        if (data?.user) {
          const u = {
            id: data.user.id,
            email: data.user.email,
            name: data.user.userMetadata?.name || "",
            username: data.user.userMetadata?.username || data.user.email?.split("@")[0] || "",
            bio: data.user.userMetadata?.bio || "",
            role: data.user.role,
            createdAt: data.user.createdAt,
          };
          setUser(u);
          setForm({ name: u.name, username: u.username, bio: u.bio });
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  useEffect(() => {
    getFavorites()
      .then(setFavorites)
      .catch(() => setFavorites([]))
      .finally(() => setFavLoading(false));
  }, []);

  async function handleRemoveFavorite(launchId) {
    setRemovingId(launchId);
    try {
      await removeFavoriteByLaunchId(launchId);
      setFavorites((prev) => prev.filter((f) => f.launchId !== launchId));
    } catch {
      // ignore
    } finally {
      setRemovingId(null);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      await updateProfile(form);
      setSuccess("Profilo aggiornato con successo.");
      setUser((prev) => ({ ...prev, ...form }));
    } catch (err) {
      setError(err.message || "Errore durante il salvataggio.");
    } finally {
      setSaving(false);
    }
  }

  function handleCancel() {
    if (user) {
      setForm({ name: user.name, username: user.username, bio: user.bio });
    }
    setError("");
    setSuccess("");
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-400">
        Caricamento...
      </main>
    );
  }

  const initials = (user?.username || "U").slice(0, 2).toUpperCase();
  const joinedAt = user?.createdAt
    ? new Intl.DateTimeFormat("it-IT", { dateStyle: "long" }).format(new Date(user.createdAt))
    : "—";

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
            Profilo utente
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Il tuo profilo
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Gestisci le informazioni del tuo account e tieni sotto controllo le
            impostazioni principali.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1.9fr]">
          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-cyan-500 text-2xl font-bold text-slate-950">
                  {initials}
                </div>

                <h2 className="mt-4 text-2xl font-semibold text-white">
                  {form.name || user?.username || "—"}
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  @{form.username || "—"}
                </p>

                <span className="mt-4 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-cyan-300">
                  {user?.role || "USER"}
                </span>
              </div>

              <div className="mt-8 space-y-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Email
                  </p>
                  <p className="mt-2 text-sm text-slate-200">
                    {user?.email || "—"}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Iscritto dal
                  </p>
                  <p className="mt-2 text-sm text-slate-200">{joinedAt}</p>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <Link
                  href="/change-password"
                  className="inline-flex items-center justify-center rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                >
                  Cambia password
                </Link>

                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-400"
                >
                  Torna alla dashboard
                </Link>
              </div>
            </div>
          </aside>

          <div className="space-y-8">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
              <div>
                <h2 className="text-2xl font-semibold text-white">
                  Informazioni personali
                </h2>
                <p className="mt-2 text-sm text-slate-400">
                  Aggiorna i dati principali del tuo account.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-slate-200"
                    >
                      Nome completo
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="username"
                      className="mb-2 block text-sm font-medium text-slate-200"
                    >
                      Username
                    </label>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      value={form.username}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-200"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3.5 text-slate-400 outline-none cursor-not-allowed"
                  />
                </div>

                <div>
                  <label
                    htmlFor="bio"
                    className="mb-2 block text-sm font-medium text-slate-200"
                  >
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={5}
                    value={form.bio}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  />
                </div>

                {error && (
                  <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                    {success}
                  </div>
                )}

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center justify-center rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-60"
                  >
                    {saving ? "Salvataggio..." : "Salva modifiche"}
                  </button>

                  <button
                    type="button"
                    onClick={handleCancel}
                    className="inline-flex items-center justify-center rounded-2xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-400"
                  >
                    Annulla
                  </button>
                </div>
              </form>
            </div>

            {/* Sezione preferiti */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-white">
                Missioni preferite
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Le missioni che hai salvato per tenerle d&apos;occhio.
              </p>

              <div className="mt-6">
                {favLoading ? (
                  <p className="text-sm text-slate-400">Caricamento preferiti...</p>
                ) : favorites.length === 0 ? (
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6 text-center">
                    <p className="text-sm text-slate-400">
                      Non hai ancora salvato nessuna missione.
                    </p>
                    <Link
                      href="/missions"
                      className="mt-4 inline-flex items-center text-sm font-medium text-cyan-400 transition hover:text-cyan-300"
                    >
                      Esplora le missioni →
                    </Link>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {favorites.map((fav) => (
                      <div
                        key={fav.id}
                        className="flex items-start justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-4"
                      >
                        <div className="min-w-0 flex-1">
                          <h3 className="truncate text-sm font-semibold text-white">
                            {fav.launchName}
                          </h3>
                          {fav.agencyName && (
                            <p className="mt-0.5 text-xs text-slate-400">
                              {fav.agencyName}
                            </p>
                          )}
                          {fav.net && (
                            <p className="mt-1 text-xs text-slate-500">
                              {formatDate(fav.net)}
                            </p>
                          )}
                        </div>

                        <div className="flex shrink-0 items-center gap-2">
                          <Link
                            href={`/missions/${fav.launchId}`}
                            className="rounded-xl border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:border-cyan-400 hover:text-cyan-400"
                          >
                            Dettagli
                          </Link>
                          <button
                            onClick={() => handleRemoveFavorite(fav.launchId)}
                            disabled={removingId === fav.launchId}
                            className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-300 transition hover:border-red-500/50 hover:bg-red-500/20 disabled:opacity-50"
                          >
                            {removingId === fav.launchId ? "..." : "Rimuovi"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-white">
                Sicurezza account
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Gestisci le impostazioni legate alla sicurezza del tuo profilo.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                  <p className="text-sm font-medium text-white">Password</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Aggiorna la password del tuo account per mantenerlo sicuro.
                  </p>

                  <Link
                    href="/change-password"
                    className="mt-4 inline-flex text-sm font-medium text-cyan-400 transition hover:text-cyan-300"
                  >
                    Cambia password
                  </Link>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                  <p className="text-sm font-medium text-white">Accesso</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Controlla le impostazioni base del tuo account e le sessioni
                    future.
                  </p>

                  <Link
                    href="/dashboard"
                    className="mt-4 inline-flex text-sm font-medium text-cyan-400 transition hover:text-cyan-300"
                  >
                    Vai alla dashboard
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
