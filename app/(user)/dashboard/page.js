"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { getMeApi } from "@/lib/api/auth";
import { getFavorites } from "@/lib/api/favorites";
import { getMissionChartStats } from "@/lib/api/missions";

const LaunchCharts = dynamic(() => import("./LaunchCharts"), { ssr: false });

function getStatusClasses(status) {
  switch (status) {
    case "SCHEDULED":
    case "CONFIRMED":
      return "border-cyan-500/30 bg-cyan-500/10 text-cyan-300";
    case "DELAYED":
      return "border-violet-500/30 bg-violet-500/10 text-violet-300";
    case "COMPLETED":
      return "border-emerald-500/30 bg-emerald-500/10 text-emerald-300";
    default:
      return "border-slate-700 bg-slate-800 text-slate-300";
  }
}

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Intl.DateTimeFormat("it-IT", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(dateStr));
}

export default function UserDashboardPage() {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const token = localStorage.getItem("sb_access_token");
        const [meData, favData, chartStats] = await Promise.all([
          getMeApi(token),
          getFavorites().catch(() => []),
          getMissionChartStats().catch(() => null),
        ]);

        if (meData?.user) {
          setUser({
            id: meData.user.id,
            email: meData.user.email,
            name:
              meData.user.userMetadata?.name ||
              meData.user.userMetadata?.username ||
              meData.user.email?.split("@")[0],
            username:
              meData.user.userMetadata?.username ||
              meData.user.email?.split("@")[0] ||
              "User",
            role: meData.user.role,
          });
        }

        setFavorites(Array.isArray(favData) ? favData : []);
        setChartData(chartStats);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-400">
        Caricamento...
      </main>
    );
  }

  const displayName = user?.name || user?.username || "Utente";
  const initials = (user?.username || "U").slice(0, 2).toUpperCase();
  const recentFavorites = favorites.slice(0, 3);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
            User Dashboard
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Benvenuto, {displayName}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Qui puoi gestire il tuo profilo, tenere d&apos;occhio le missioni
            salvate e controllare la tua attività recente.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_2fr]">
          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500 text-xl font-bold text-slate-950">
                  {initials}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {displayName}
                  </h2>
                  <p className="text-sm text-slate-400">
                    @{user?.username || "—"}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
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
                    Ruolo
                  </p>
                  <p className="mt-2 text-sm text-slate-200">
                    {user?.role || "—"}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <Link
                  href="/profile"
                  className="inline-flex items-center justify-center rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                >
                  Vai al profilo
                </Link>
                <Link
                  href="/change-password"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-400"
                >
                  Cambia password
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
              <h3 className="text-lg font-semibold text-white">
                Azioni rapide
              </h3>
              <div className="mt-5 grid gap-3">
                <Link
                  href="/missions"
                  className="rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-400 hover:text-cyan-400"
                >
                  Esplora missioni
                </Link>
                <Link
                  href="/rockets"
                  className="rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-400 hover:text-cyan-400"
                >
                  Guarda i razzi
                </Link>
                <Link
                  href="/agencies"
                  className="rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-400 hover:text-cyan-400"
                >
                  Agenzie spaziali
                </Link>
              </div>
            </div>
          </aside>

          <div className="space-y-8">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
                <p className="text-sm text-slate-400">Missioni preferite</p>
                <p className="mt-2 text-3xl font-bold text-white">
                  {favorites.length}
                </p>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
                <p className="text-sm text-slate-400">Lanci imminenti</p>
                <p className="mt-2 text-3xl font-bold text-white">
                  {chartData?.upcoming?.length ?? "—"}
                </p>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
                <p className="text-sm text-slate-400">Ruolo account</p>
                <p className="mt-2 text-sm font-bold text-white">
                  {user?.role || "—"}
                </p>
              </div>
            </div>

            {chartData && <LaunchCharts data={chartData} />}

            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-white">
                    Missioni preferite
                  </h2>
                  <p className="mt-2 text-sm text-slate-400">
                    Le missioni che hai salvato per seguirle più facilmente.
                  </p>
                </div>
                <Link
                  href="/profile"
                  className="text-sm font-medium text-cyan-400 transition hover:text-cyan-300"
                >
                  Vedi tutte
                </Link>
              </div>

              <div className="mt-6 grid gap-4">
                {recentFavorites.length === 0 ? (
                  <p className="text-sm text-slate-400">
                    Nessuna missione nei preferiti.{" "}
                    <Link
                      href="/missions"
                      className="text-cyan-400 hover:text-cyan-300"
                    >
                      Esplora le missioni
                    </Link>
                  </p>
                ) : (
                  recentFavorites.map((fav) => (
                    <article
                      key={fav.id}
                      className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            {fav.net && (
                              <span className="text-sm text-slate-400">
                                {formatDate(fav.net)}
                              </span>
                            )}
                            {fav.agencyName && (
                              <span className="text-xs text-slate-500">
                                {fav.agencyName}
                              </span>
                            )}
                          </div>
                          <h3 className="mt-3 text-xl font-semibold text-white">
                            {fav.launchName}
                          </h3>
                        </div>
                        <Link
                          href={`/missions/${fav.launchId}`}
                          className="inline-flex items-center justify-center rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-cyan-400 hover:text-cyan-400"
                        >
                          Dettagli
                        </Link>
                      </div>
                    </article>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
