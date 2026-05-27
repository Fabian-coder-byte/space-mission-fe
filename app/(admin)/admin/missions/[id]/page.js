import Link from "next/link";
import { notFound } from "next/navigation";
import { getOneMission } from "@/lib/api/missions";
import DeleteMissionButtonList from "@/components/delete-mission-button-list";

function getStatusClasses(status) {
  switch (status) {
    case "SCHEDULED":
      return "bg-cyan-500/15 text-cyan-400 ring-1 ring-cyan-500/30";
    case "PLANNED":
      return "bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/30";
    case "LAUNCHED":
      return "bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/30";
    case "COMPLETED":
      return "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30";
    case "FAILED":
      return "bg-red-500/15 text-red-400 ring-1 ring-red-500/30";
    case "CANCELED":
      return "bg-slate-500/15 text-slate-300 ring-1 ring-slate-500/30";
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
  title: "Dettaglio Missione",
};

export default async function MissionDetailPage({ params }) {
  const { id } = await params;

  let mission;
  try {
    mission = await getOneMission(id);
  } catch {
    notFound();
  }

  if (!mission) notFound();

  return (
    <>
      <div className="mb-3 flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/50 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
            Admin Panel
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold text-white">{mission.name}</h1>

            {mission.status && (
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(mission.status)}`}
              >
                {mission.status}
              </span>
            )}

            {mission.missionType && (
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getMissionTypeClasses(mission.missionType)}`}
              >
                {mission.missionType}
              </span>
            )}

            {mission.isCrewed && (
              <span className="inline-flex rounded-full bg-violet-500/15 px-3 py-1 text-xs font-semibold text-violet-400 ring-1 ring-violet-500/30">
                CREWED
              </span>
            )}
          </div>

          <p className="mt-2 text-sm text-slate-400">
            Vista dettagliata della missione.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/missions"
            className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
          >
            Torna alla lista
          </Link>

          <Link
            href={`/admin/missions/${id}/edit`}
            className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Modifica
          </Link>

          <DeleteMissionButtonList id={id} redirectTo="/admin/missions" size="md" />
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="space-y-6">
          {mission.imageUrl && (
            <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/50">
              <div className="h-72 w-full bg-slate-800">
                <img
                  src={mission.imageUrl}
                  alt={mission.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          )}

          <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
            <h2 className="text-xl font-semibold text-white">Descrizione</h2>
            <p className="mt-3 leading-7 text-slate-300">
              {mission.description || "Nessuna descrizione disponibile."}
            </p>
          </div>

          {(mission.agency || mission.rocket || mission.launchSite) && (
            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
              <h2 className="text-xl font-semibold text-white">
                Entità collegate
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Agenzia, razzo e launch site associati alla missione.
              </p>

              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {mission.agency && (
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
                )}

                {mission.rocket && (
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
                )}

                {mission.launchSite && (
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
                )}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            {mission.destination && (
              <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-5">
                <p className="text-sm text-slate-400">Destinazione</p>
                <p className="mt-2 text-2xl font-bold text-cyan-400">
                  {mission.destination}
                </p>
              </div>
            )}

            {mission.orbit && (
              <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-5">
                <p className="text-sm text-slate-400">Orbita</p>
                <p className="mt-2 text-2xl font-bold text-white">
                  {mission.orbit}
                </p>
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
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

          <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
            <h2 className="text-lg font-semibold text-white">
              Finestra di lancio
            </h2>

            <div className="mt-5 space-y-4">
              <InfoRow
                label="Data lancio"
                value={
                  mission.launchDate
                    ? new Date(mission.launchDate).toLocaleString("it-IT")
                    : null
                }
              />
              <InfoRow
                label="Window Start"
                value={
                  mission.windowStart
                    ? new Date(mission.windowStart).toLocaleString("it-IT")
                    : null
                }
              />
              <InfoRow
                label="Window End"
                value={
                  mission.windowEnd
                    ? new Date(mission.windowEnd).toLocaleString("it-IT")
                    : null
                }
              />
            </div>
          </div>

          {mission.detailsUrl && (
            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
              <h2 className="text-lg font-semibold text-white">
                Fonte ufficiale
              </h2>
              <a
                href={mission.detailsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex break-all text-sm text-cyan-400 hover:text-cyan-300"
              >
                {mission.detailsUrl}
              </a>
            </div>
          )}

          <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
            <h2 className="text-lg font-semibold text-white">Metadata</h2>

            <div className="mt-5 space-y-4">
              <InfoRow
                label="Creato il"
                value={
                  mission.createdAt
                    ? new Date(mission.createdAt).toLocaleString("it-IT")
                    : null
                }
              />
              <InfoRow
                label="Aggiornato il"
                value={
                  mission.updatedAt
                    ? new Date(mission.updatedAt).toLocaleString("it-IT")
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
