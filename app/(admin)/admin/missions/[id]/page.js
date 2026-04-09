import Link from "next/link";

const mission = {
  id: "1",
  name: "Artemis II",
  slug: "artemis-ii",
  description:
    "Missione con equipaggio del programma Artemis, pensata per riportare esseri umani nelle vicinanze della Luna e validare i sistemi per le future missioni di esplorazione profonda.",
  missionType: "CREWED",
  status: "SCHEDULED",
  launchDate: "2026-05-21T14:30:00.000Z",
  windowStart: "2026-05-21T14:00:00.000Z",
  windowEnd: "2026-05-21T16:00:00.000Z",
  destination: "Moon",
  orbit: "Lunar Flyby",
  isCrewed: true,
  imageUrl:
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80",
  detailsUrl: "https://www.nasa.gov",
  createdAt: "2026-04-01T10:30:00.000Z",
  updatedAt: "2026-04-08T16:10:00.000Z",
  agency: {
    id: "a1",
    name: "NASA",
  },
  rocket: {
    id: "r1",
    name: "SLS Block 1",
  },
  launchSite: {
    id: "l1",
    name: "Kennedy Space Center LC-39B",
  },
};

function getStatusClasses(status) {
  switch (status) {
    case "SCHEDULED":
      return "bg-cyan-500/15 text-cyan-400 ring-1 ring-cyan-500/30";
    case "PLANNED":
      return "bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/30";
    case "COMPLETED":
      return "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30";
    case "CANCELLED":
      return "bg-red-500/15 text-red-400 ring-1 ring-red-500/30";
    default:
      return "bg-slate-500/15 text-slate-300 ring-1 ring-slate-500/30";
  }
}

function getMissionTypeClasses(type) {
  switch (type) {
    case "CREWED":
      return "bg-violet-500/15 text-violet-400 ring-1 ring-violet-500/30";
    case "SATELLITE":
      return "bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/30";
    case "CARGO":
      return "bg-orange-500/15 text-orange-400 ring-1 ring-orange-500/30";
    case "TEST_FLIGHT":
      return "bg-pink-500/15 text-pink-400 ring-1 ring-pink-500/30";
    case "COMMUNICATION":
      return "bg-teal-500/15 text-teal-400 ring-1 ring-teal-500/30";
    default:
      return "bg-slate-500/15 text-slate-300 ring-1 ring-slate-500/30";
  }
}

export const metadata = {
  title: "Dettaglio Missione",
};

export default function MissionDetailPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Link
              href="/admin/missions"
              className="inline-flex items-center text-sm text-cyan-400 transition hover:text-cyan-300"
            >
              ← Torna alla lista missioni
            </Link>

            <p className="mt-4 text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
              Admin Panel
            </p>

            <div className="mt-2 flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center">
              <h1 className="text-3xl font-bold tracking-tight">
                {mission.name}
              </h1>

              <span
                className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                  mission.status,
                )}`}
              >
                {mission.status}
              </span>

              <span
                className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${getMissionTypeClasses(
                  mission.missionType,
                )}`}
              >
                {mission.missionType}
              </span>

              {mission.isCrewed && (
                <span className="inline-flex w-fit rounded-full bg-violet-500/15 px-3 py-1 text-xs font-semibold text-violet-400 ring-1 ring-violet-500/30">
                  CREWED
                </span>
              )}
            </div>

            <p className="mt-3 max-w-3xl text-sm text-slate-400">
              Vista dettagliata della missione con dati operativi, collegamenti
              e riferimenti alle entità associate.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/admin/missions/${mission.id}/edit`}
              className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-400 transition hover:bg-amber-500/20"
            >
              Modifica
            </Link>

            <button className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/20">
              Elimina
            </button>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70">
              <div className="h-72 w-full bg-slate-800">
                <img
                  src={mission.imageUrl}
                  alt={mission.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-6">
                <h2 className="text-xl font-semibold text-white">
                  Descrizione
                </h2>
                <p className="mt-3 leading-7 text-slate-300">
                  {mission.description}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <h2 className="text-xl font-semibold text-white">
                Entità collegate
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Agenzia, razzo e launch site associati alla missione.
              </p>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <Link
                  href={`/admin/agencies/${mission.agency.id}`}
                  className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 transition hover:border-cyan-500/40 hover:bg-slate-900"
                >
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Agenzia
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {mission.agency.name}
                  </p>
                  <p className="mt-2 text-sm text-cyan-400">
                    Vai al dettaglio →
                  </p>
                </Link>

                <Link
                  href={`/admin/rockets/${mission.rocket.id}`}
                  className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 transition hover:border-cyan-500/40 hover:bg-slate-900"
                >
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Razzo
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {mission.rocket.name}
                  </p>
                  <p className="mt-2 text-sm text-cyan-400">
                    Vai al dettaglio →
                  </p>
                </Link>

                <Link
                  href={`/admin/launch-sites/${mission.launchSite.id}`}
                  className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 transition hover:border-cyan-500/40 hover:bg-slate-900"
                >
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Launch Site
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {mission.launchSite.name}
                  </p>
                  <p className="mt-2 text-sm text-cyan-400">
                    Vai al dettaglio →
                  </p>
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
                <p className="text-sm text-slate-400">Destinazione</p>
                <p className="mt-2 text-2xl font-bold text-cyan-400">
                  {mission.destination || "-"}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
                <p className="text-sm text-slate-400">Orbita</p>
                <p className="mt-2 text-2xl font-bold text-white">
                  {mission.orbit || "-"}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <h2 className="text-lg font-semibold text-white">
                Informazioni missione
              </h2>

              <div className="mt-5 space-y-4">
                <InfoRow label="ID" value={mission.id} />
                <InfoRow label="Nome" value={mission.name} />
                <InfoRow label="Slug" value={mission.slug} />
                <InfoRow label="Tipo missione" value={mission.missionType} />
                <InfoRow label="Stato" value={mission.status} />
                <InfoRow
                  label="Con equipaggio"
                  value={mission.isCrewed ? "Sì" : "No"}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <h2 className="text-lg font-semibold text-white">
                Finestra di lancio
              </h2>

              <div className="mt-5 space-y-4">
                <InfoRow
                  label="Data lancio"
                  value={new Date(mission.launchDate).toLocaleString("it-IT")}
                />
                <InfoRow
                  label="Window Start"
                  value={new Date(mission.windowStart).toLocaleString("it-IT")}
                />
                <InfoRow
                  label="Window End"
                  value={new Date(mission.windowEnd).toLocaleString("it-IT")}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <h2 className="text-lg font-semibold text-white">Collegamenti</h2>

              <div className="mt-5 space-y-4">
                <div className="border-b border-slate-800 pb-4 last:border-b-0 last:pb-0">
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Fonte ufficiale
                  </p>
                  <a
                    href={mission.detailsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-flex break-all text-sm text-cyan-400 hover:text-cyan-300"
                  >
                    {mission.detailsUrl}
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <h2 className="text-lg font-semibold text-white">Metadata</h2>

              <div className="mt-5 space-y-4">
                <InfoRow
                  label="Creato il"
                  value={new Date(mission.createdAt).toLocaleString("it-IT")}
                />
                <InfoRow
                  label="Ultimo aggiornamento"
                  value={new Date(mission.updatedAt).toLocaleString("it-IT")}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="border-b border-slate-800 pb-4 last:border-b-0 last:pb-0">
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-sm text-slate-200">{value || "-"}</p>
    </div>
  );
}
