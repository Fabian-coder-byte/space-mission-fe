import Link from "next/link";

const launchSite = {
  id: "1",
  name: "Kennedy Space Center LC-39A",
  slug: "kennedy-space-center-lc-39a",
  locationName: "Merritt Island",
  region: "Florida",
  country: "USA",
  padCode: "LC-39A",
  status: "ACTIVE",
  launchesCount: 128,
  latitude: 28.6084,
  longitude: -80.6043,
  imageUrl:
    "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?auto=format&fit=crop&w=1400&q=80",
  sourceUrl: "https://www.nasa.gov",
  description:
    "Storico sito di lancio situato al Kennedy Space Center, utilizzato per numerose missioni spaziali con equipaggio e senza equipaggio. È uno dei pad più iconici della storia dell’esplorazione spaziale.",
  createdAt: "2026-04-01T10:30:00.000Z",
  updatedAt: "2026-04-08T15:45:00.000Z",
};

const relatedMissions = [
  {
    id: "m1",
    name: "Artemis Support Mission",
    status: "SCHEDULED",
    launchDate: "2026-05-18T13:30:00.000Z",
  },
  {
    id: "m2",
    name: "Starlink Batch 12",
    status: "COMPLETED",
    launchDate: "2026-03-14T09:15:00.000Z",
  },
  {
    id: "m3",
    name: "Crew Orbital Test",
    status: "SCHEDULED",
    launchDate: "2026-06-02T18:00:00.000Z",
  },
];

function getStatusClasses(status) {
  switch (status) {
    case "ACTIVE":
      return "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30";
    case "INACTIVE":
      return "bg-slate-500/15 text-slate-300 ring-1 ring-slate-500/30";
    case "MAINTENANCE":
      return "bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/30";
    case "SCHEDULED":
      return "bg-cyan-500/15 text-cyan-400 ring-1 ring-cyan-500/30";
    case "COMPLETED":
      return "bg-violet-500/15 text-violet-400 ring-1 ring-violet-500/30";
    default:
      return "bg-slate-500/15 text-slate-300 ring-1 ring-slate-500/30";
  }
}

export const metadata = {
  title: "Dettaglio Launch Site",
};

export default function LaunchSiteDetailPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <Link
              href="/admin/launch-sites"
              className="inline-flex items-center text-sm text-cyan-400 transition hover:text-cyan-300"
            >
              ← Torna alla lista launch sites
            </Link>

            <p className="mt-4 text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
              Admin Panel
            </p>

            <div className="mt-2 flex flex-col gap-3 md:flex-row md:items-center">
              <h1 className="text-3xl font-bold tracking-tight">
                {launchSite.name}
              </h1>

              <span
                className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                  launchSite.status,
                )}`}
              >
                {launchSite.status}
              </span>
            </div>

            <p className="mt-3 max-w-3xl text-sm text-slate-400">
              Vista dettagliata del launch site con informazioni principali,
              coordinate, collegamenti esterni e missioni associate.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/admin/launch-sites/${launchSite.id}/edit`}
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
                  src={launchSite.imageUrl}
                  alt={launchSite.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="p-6">
                <h2 className="text-xl font-semibold text-white">
                  Descrizione
                </h2>
                <p className="mt-3 leading-7 text-slate-300">
                  {launchSite.description}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <h2 className="text-xl font-semibold text-white">
                Missioni collegate
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Elenco delle missioni associate a questo launch site.
              </p>

              <div className="mt-5 overflow-hidden rounded-xl border border-slate-800">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm">
                    <thead className="bg-slate-900 text-slate-300">
                      <tr className="border-b border-slate-800">
                        <th className="px-4 py-3 font-semibold">Missione</th>
                        <th className="px-4 py-3 font-semibold">Stato</th>
                        <th className="px-4 py-3 font-semibold">Data lancio</th>
                        <th className="px-4 py-3 font-semibold text-right">
                          Azione
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {relatedMissions.map((mission) => (
                        <tr
                          key={mission.id}
                          className="border-b border-slate-800/80 text-slate-200 hover:bg-slate-800/40"
                        >
                          <td className="px-4 py-3 font-medium text-white">
                            {mission.name}
                          </td>

                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                                mission.status,
                              )}`}
                            >
                              {mission.status}
                            </span>
                          </td>

                          <td className="px-4 py-3 text-slate-300">
                            {new Date(mission.launchDate).toLocaleString(
                              "it-IT",
                            )}
                          </td>

                          <td className="px-4 py-3 text-right">
                            <Link
                              href={`/admin/missions/${mission.id}`}
                              className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:border-cyan-500 hover:text-cyan-400"
                            >
                              Dettaglio
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
                <p className="text-sm text-slate-400">Launches collegate</p>
                <p className="mt-2 text-3xl font-bold text-cyan-400">
                  {launchSite.launchesCount}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
                <p className="text-sm text-slate-400">Pad Code</p>
                <p className="mt-2 text-2xl font-bold text-white">
                  {launchSite.padCode}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <h2 className="text-lg font-semibold text-white">
                Informazioni principali
              </h2>

              <div className="mt-5 space-y-4">
                <InfoRow label="ID" value={launchSite.id} />
                <InfoRow label="Nome" value={launchSite.name} />
                <InfoRow label="Slug" value={launchSite.slug} />
                <InfoRow label="Località" value={launchSite.locationName} />
                <InfoRow label="Regione" value={launchSite.region} />
                <InfoRow label="Paese" value={launchSite.country} />
                <InfoRow label="Stato" value={launchSite.status} />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <h2 className="text-lg font-semibold text-white">Coordinate</h2>

              <div className="mt-5 space-y-4">
                <InfoRow
                  label="Latitudine"
                  value={String(launchSite.latitude)}
                />
                <InfoRow
                  label="Longitudine"
                  value={String(launchSite.longitude)}
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
                    href={launchSite.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-flex break-all text-sm text-cyan-400 hover:text-cyan-300"
                  >
                    {launchSite.sourceUrl}
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
              <h2 className="text-lg font-semibold text-white">Metadata</h2>

              <div className="mt-5 space-y-4">
                <InfoRow
                  label="Creato il"
                  value={new Date(launchSite.createdAt).toLocaleString("it-IT")}
                />
                <InfoRow
                  label="Ultimo aggiornamento"
                  value={new Date(launchSite.updatedAt).toLocaleString("it-IT")}
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
