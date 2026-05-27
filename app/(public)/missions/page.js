import Link from "next/link";
import { serverFetch } from "@/lib/api/server";

export const metadata = {
  title: "Missioni",
  description: "Esplora le prossime missioni spaziali e i dettagli di lancio.",
};

function formatLaunchDate(dateStr) {
  if (!dateStr) return "Data non confermata";
  return new Intl.DateTimeFormat("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  }).format(new Date(dateStr)) + " UTC";
}

const STATUS_LABEL = {
  SCHEDULED: "Scheduled",
  CONFIRMED: "Confirmed",
  DELAYED: "Delayed",
  SCRUBBED: "Scrubbed",
  CANCELLED: "Cancelled",
  COMPLETED: "Completed",
};

function getStatusClasses(status) {
  switch (status) {
    case "CONFIRMED": return "border-cyan-500/30 bg-cyan-500/10 text-cyan-300";
    case "SCHEDULED": return "border-violet-500/30 bg-violet-500/10 text-violet-300";
    case "COMPLETED": return "border-emerald-500/30 bg-emerald-500/10 text-emerald-300";
    case "DELAYED": return "border-amber-500/30 bg-amber-500/10 text-amber-300";
    case "SCRUBBED": return "border-orange-500/30 bg-orange-500/10 text-orange-300";
    case "CANCELLED": return "border-red-500/30 bg-red-500/10 text-red-300";
    default: return "border-slate-700 bg-slate-800 text-slate-300";
  }
}

export default async function MissionsPage() {
  const missions = await serverFetch("/missions") ?? [];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
            Missions
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Prossime missioni spaziali
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Segui i prossimi lanci, scopri i razzi coinvolti, le agenzie
            responsabili e i principali siti di partenza.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Missioni in evidenza
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              {missions.length} missioni trovate nel database.
            </p>
          </div>
        </div>

        {missions.length === 0 ? (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-12 text-center text-slate-400">
            Nessuna missione disponibile al momento.
          </div>
        ) : (
          <div className="grid gap-6">
            {missions.map((mission) => (
              <article
                key={mission.id}
                className="group rounded-3xl border border-slate-800 bg-slate-900/50 p-6 transition hover:border-cyan-400/40 hover:bg-slate-900"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-3xl">
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-medium ${getStatusClasses(mission.status)}`}
                      >
                        {STATUS_LABEL[mission.status] ?? mission.status}
                      </span>

                      <span className="text-sm text-slate-400">
                        {formatLaunchDate(mission.launchDate)}
                      </span>
                    </div>

                    <h2 className="mt-4 text-2xl font-semibold text-white transition group-hover:text-cyan-400">
                      {mission.name}
                    </h2>

                    {mission.description && (
                      <p className="mt-3 leading-7 text-slate-300">
                        {mission.description}
                      </p>
                    )}

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                          Agenzia
                        </p>
                        <p className="mt-2 text-sm text-slate-200">
                          {mission.agency?.name ?? "—"}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                          Razzo
                        </p>
                        <p className="mt-2 text-sm text-slate-200">
                          {mission.rocket?.name ?? "—"}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 sm:col-span-2">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                          Sito di lancio
                        </p>
                        <p className="mt-2 text-sm text-slate-200">
                          {mission.launchSite?.name ?? "—"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:min-w-[180px]">
                    <Link
                      href={`/missions/${mission.id}`}
                      className="inline-flex w-full items-center justify-center rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                    >
                      Dettagli missione
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
