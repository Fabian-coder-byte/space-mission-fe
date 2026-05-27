import Link from "next/link";
import { notFound } from "next/navigation";
import { serverFetch } from "@/lib/api/server";
import AddToFavoritesButton from "@/components/add-to-favorites-button";

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

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const mission = await serverFetch(`/missions/${slug}`);
  if (!mission) return { title: "Missione non trovata" };
  return {
    title: mission.name,
    description: mission.description,
  };
}

export default async function MissionDetailPage({ params }) {
  const { slug } = await params;
  const mission = await serverFetch(`/missions/${slug}`);

  if (!mission) notFound();

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-slate-800">
        {mission.imageUrl && (
          <div className="absolute inset-0 -z-10">
            <img
              src={mission.imageUrl}
              alt={mission.name}
              className="h-full w-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-slate-950/80" />
          </div>
        )}

        <div className="mx-auto max-w-7xl px-6 py-20">
          <Link
            href="/missions"
            className="inline-flex items-center text-sm text-cyan-400 transition hover:text-cyan-300"
          >
            ← Torna alle missioni
          </Link>

          <div className="mt-8 max-w-4xl">
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

            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
              {mission.name}
            </h1>

            {mission.description && (
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                {mission.description}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-8">
            {mission.description && (
              <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
                <p className="text-sm font-medium uppercase tracking-[0.25em] text-cyan-400">
                  Panoramica missione
                </p>
                <p className="mt-4 leading-8 text-slate-300">
                  {mission.description}
                </p>
              </div>
            )}

            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
              <h2 className="text-2xl font-semibold text-white">
                Dettagli operativi
              </h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {mission.missionType && (
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Tipo missione
                    </p>
                    <p className="mt-2 text-sm text-slate-200">
                      {mission.missionType}
                    </p>
                  </div>
                )}

                {mission.orbit && (
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Orbita
                    </p>
                    <p className="mt-2 text-sm text-slate-200">{mission.orbit}</p>
                  </div>
                )}

                {mission.destination && (
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Destinazione
                    </p>
                    <p className="mt-2 text-sm text-slate-200">{mission.destination}</p>
                  </div>
                )}

                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Missione con equipaggio
                  </p>
                  <p className="mt-2 text-sm text-slate-200">
                    {mission.isCrewed ? "Sì" : "No"}
                  </p>
                </div>

                {mission.windowStart && (
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Finestra lancio (inizio)
                    </p>
                    <p className="mt-2 text-sm text-slate-200">
                      {formatLaunchDate(mission.windowStart)}
                    </p>
                  </div>
                )}

                {mission.windowEnd && (
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Finestra lancio (fine)
                    </p>
                    <p className="mt-2 text-sm text-slate-200">
                      {formatLaunchDate(mission.windowEnd)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
              <h2 className="text-xl font-semibold text-white">
                Informazioni chiave
              </h2>

              <div className="mt-6 space-y-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Agenzia
                  </p>
                  <p className="mt-2 text-sm text-slate-200">
                    {mission.agency ? (
                      <Link
                        href={`/agencies/${mission.agency.id}`}
                        className="text-cyan-400 hover:text-cyan-300"
                      >
                        {mission.agency.name}
                      </Link>
                    ) : "—"}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Razzo
                  </p>
                  <p className="mt-2 text-sm text-slate-200">
                    {mission.rocket ? (
                      <Link
                        href={`/rockets/${mission.rocket.id}`}
                        className="text-cyan-400 hover:text-cyan-300"
                      >
                        {mission.rocket.name}
                      </Link>
                    ) : "—"}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Launch Site
                  </p>
                  <p className="mt-2 text-sm text-slate-200">
                    {mission.launchSite ? (
                      <Link
                        href={`/launch-sites/${mission.launchSite.id}`}
                        className="text-cyan-400 hover:text-cyan-300"
                      >
                        {mission.launchSite.name}
                      </Link>
                    ) : "—"}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Data di lancio
                  </p>
                  <p className="mt-2 text-sm text-slate-200">
                    {formatLaunchDate(mission.launchDate)}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Azioni
              </h2>
              <div className="flex flex-col gap-3">
                <AddToFavoritesButton
                  missionId={mission.id}
                  missionName={mission.name}
                  agencyName={mission.agency?.name}
                  launchDate={mission.launchDate}
                  imageUrl={mission.imageUrl}
                />
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
              <h2 className="text-xl font-semibold text-white">Navigazione</h2>

              <div className="mt-5 flex flex-col gap-3">
                <Link
                  href="/missions"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-700 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-cyan-400 hover:text-cyan-400"
                >
                  Tutte le missioni
                </Link>

                <Link
                  href="/rockets"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-700 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-cyan-400 hover:text-cyan-400"
                >
                  Esplora i razzi
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
