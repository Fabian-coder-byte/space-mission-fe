"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getMeApi } from "@/lib/api/auth";
import { updateProfile } from "@/lib/api/profile";
import { getStats } from "@/lib/api/stats";
import { getUsersPaginated } from "@/lib/api/users";

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Intl.DateTimeFormat("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateStr));
}

export default function AdminProfilePage() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: "", username: "", bio: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [stats, setStats] = useState(null);
  const [userCount, setUserCount] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const token = localStorage.getItem("sb_access_token");
        const [meData, statsData, usersData] = await Promise.all([
          getMeApi(token),
          getStats().catch(() => null),
          getUsersPaginated(1, 1).catch(() => null),
        ]);

        if (meData?.user) {
          const u = {
            id: meData.user.id,
            email: meData.user.email,
            name: meData.user.userMetadata?.name || "",
            username:
              meData.user.userMetadata?.username ||
              meData.user.email?.split("@")[0] ||
              "",
            bio: meData.user.userMetadata?.bio || "",
            role: meData.user.role,
            createdAt: meData.user.createdAt,
          };
          setUser(u);
          setForm({ name: u.name, username: u.username, bio: u.bio });
        }

        setStats(statsData);
        setUserCount(usersData?.meta?.total ?? null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

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
      <main className="flex min-h-[40vh] items-center justify-center text-slate-400">
        Caricamento...
      </main>
    );
  }

  const initials = (user?.username || user?.email || "A").slice(0, 2).toUpperCase();
  const joinedAt = user?.createdAt ? formatDate(user.createdAt) : "—";

  const adminStats = [
    { label: "Utenti registrati", value: userCount ?? "—" },
    { label: "Missioni", value: stats?.missions ?? "—" },
    { label: "Razzi", value: stats?.rockets ?? "—" },
    { label: "Agenzie", value: stats?.agencies ?? "—" },
  ];

  return (
    <main className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
        <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
          Admin Panel
        </p>
        <h1 className="mt-2 text-3xl font-bold text-white">Profilo admin</h1>
        <p className="mt-3 text-sm text-slate-400">
          Gestisci le informazioni del tuo account amministratore.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {adminStats.map((s) => (
          <div
            key={s.label}
            className="rounded-3xl border border-slate-800 bg-slate-900/50 p-5"
          >
            <p className="text-sm text-slate-400">{s.label}</p>
            <p className="mt-3 text-3xl font-bold text-white">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
        <aside className="space-y-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
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

              <span className="mt-4 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-red-300">
                {user?.role || "ADMIN"}
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
                  Account creato il
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
                href="/admin"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-400"
              >
                Torna alla dashboard
              </Link>

              <Link
                href="/admin/users"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-400"
              >
                Gestione utenti
              </Link>
            </div>
          </div>
        </aside>

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
            <h2 className="text-xl font-semibold text-white">
              Informazioni personali
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Aggiorna i dati principali del tuo account.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200">
                    Nome completo
                  </label>
                  <input
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200">
                    Username
                  </label>
                  <input
                    name="username"
                    type="text"
                    value={form.username}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Email
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="w-full cursor-not-allowed rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3.5 text-slate-400 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Bio
                </label>
                <textarea
                  name="bio"
                  rows={4}
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

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-60"
                >
                  {saving ? "Salvataggio..." : "Salva modifiche"}
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  className="rounded-2xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-400"
                >
                  Annulla
                </button>
              </div>
            </form>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
            <h2 className="text-xl font-semibold text-white">
              Accessi rapidi admin
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Sezioni principali del pannello di amministrazione.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                { href: "/admin/users", label: "Gestione utenti" },
                { href: "/admin/missions", label: "Missioni" },
                { href: "/admin/rockets", label: "Razzi" },
                { href: "/admin/agencies", label: "Agenzie" },
                { href: "/admin/launch-sites", label: "Launch Sites" },
                { href: "/admin/settings", label: "Impostazioni sito" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-cyan-500/30 hover:text-cyan-400"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
