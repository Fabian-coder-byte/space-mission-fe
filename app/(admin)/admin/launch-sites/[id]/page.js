import Link from "next/link";
import { notFound } from "next/navigation";
import { getOneLaunchSite } from "@/lib/api/launch-sites";
import DeleteLaunchSiteButtonList from "@/components/delete-launch-site-button-list";

function getStatusClasses(status) {
  switch (status) {
    case "ACTIVE":
      return "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30";
    case "INACTIVE":
      return "bg-slate-500/15 text-slate-300 ring-1 ring-slate-500/30";
    case "MAINTENANCE":
      return "bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/30";
    default:
      return "bg-slate-500/15 text-slate-300 ring-1 ring-slate-500/30";
  }
}

function getMissionStatusClasses(status) {
  switch (status) {
    case "SCHEDULED":
      return "bg-cyan-500/15 text-cyan-400 ring-1 ring-cyan-500/30";
    case "COMPLETED":
      return "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30";
    case "PLANNED":
      return "bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/30";
    default:
      return "bg-slate-500/15 text-slate-300 ring-1 ring-slate-500/30";
  }
}

function InfoRow({ label, value }) {
  return (
    <div className="border-b border-slate-800 pb-4 last:border-b-0 last:pb-0">
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-sm text-slate-200">{value || "—"}</p>
    </div>
  );
}

export const metadata = {
  title: "Dettaglio Launch Site",
};

export default async function LaunchSiteDetailPage({ params }) {
  const { id } = await params;

  let site;
  try {
    site = await getOneLaunchSite(id);
  } catch {
    notFound();
  }

  if (!site) notFound();

  return (
    <>
      <div className="mb-3 flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/50 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
            Admin Panel
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold text-white">{site.name}</h1>

            {site.status && (
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(site.status)}`}
              >
                {site.status}
              </span>
            )}
          </div>

          <p className="mt-2 text-sm text-slate-400">
            Vista dettagliata del launch site.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/launch-sites"
            className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
          >
            Torna alla lista
          </Link>

          <Link
            href={`/admin/launch-sites/${id}/edit`}
            className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Modifica
          </Link>

          <DeleteLaunchSiteButtonList id={id} redirectTo="/admin/launch-sites" size="md" />
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="space-y-6">
          {site.imageUrl && (
            <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/50">
              <div className="h-72 w-full bg-slate-800">
                <img
                  src={site.imageUrl}
                  alt={site.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          )}

          <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
            <h2 className="text-xl font-semibold text-white">Descrizione</h2>
            <p className="mt-3 leading-7 text-slate-300">
              {site.description || "Nessuna descrizione disponibile."}
            </p>
          </div>

          {site.missions?.length > 0 && (
            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
              <h2 className="text-xl font-semibold text-white">
                Missioni collegate
              </h2>

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
                      {site.missions.map((mission) => (
                        <tr
                          key={mission.id}
                          className="border-b border-slate-800/80 text-slate-200 hover:bg-slate-800/40"
                        >
                          <td className="px-4 py-3 font-medium text-white">
                            {mission.name}
                          </td>

                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getMissionStatusClasses(mission.status)}`}
                            >
                              {mission.status}
                            </span>
                          </td>

                          <td className="px-4 py-3 text-slate-300">
                            {mission.launchDate
                              ? new Date(mission.launchDate).toLocaleString(
                                  "it-IT",
                                )
                              : "—"}
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
          )}
        </div>

        <div className="space-y-6">
          {site.launchesCount !== undefined && (
            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-5">
              <p className="text-sm text-slate-400">Lanci registrati</p>
              <p className="mt-2 text-3xl font-bold text-cyan-400">
                {site.launchesCount}
              </p>
            </div>
          )}

          <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
            <h2 className="text-lg font-semibold text-white">
              Informazioni principali
            </h2>

            <div className="mt-5 space-y-4">
              <InfoRow label="ID" value={site.id} />
              <InfoRow label="Nome" value={site.name} />
              <InfoRow label="Slug" value={site.slug} />
              <InfoRow label="Pad Code" value={site.padCode} />
              <InfoRow label="Località" value={site.locationName} />
              <InfoRow label="Regione" value={site.region} />
              <InfoRow label="Paese" value={site.country} />
              <InfoRow label="Stato" value={site.status} />
            </div>
          </div>

          {(site.latitude !== undefined || site.longitude !== undefined) && (
            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
              <h2 className="text-lg font-semibold text-white">Coordinate</h2>

              <div className="mt-5 space-y-4">
                <InfoRow
                  label="Latitudine"
                  value={site.latitude !== undefined ? String(site.latitude) : null}
                />
                <InfoRow
                  label="Longitudine"
                  value={site.longitude !== undefined ? String(site.longitude) : null}
                />
              </div>
            </div>
          )}

          {site.sourceUrl && (
            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
              <h2 className="text-lg font-semibold text-white">
                Fonte ufficiale
              </h2>
              <a
                href={site.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex break-all text-sm text-cyan-400 hover:text-cyan-300"
              >
                {site.sourceUrl}
              </a>
            </div>
          )}

          <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
            <h2 className="text-lg font-semibold text-white">Metadata</h2>

            <div className="mt-5 space-y-4">
              <InfoRow
                label="Creato il"
                value={
                  site.createdAt
                    ? new Date(site.createdAt).toLocaleString("it-IT")
                    : null
                }
              />
              <InfoRow
                label="Aggiornato il"
                value={
                  site.updatedAt
                    ? new Date(site.updatedAt).toLocaleString("it-IT")
                    : null
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
