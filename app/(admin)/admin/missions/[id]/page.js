// app/(admin)/missions/[id]/page.jsx
import Link from "next/link";
import { notFound } from "next/navigation";

async function getMission(id) {
  const res = await fetch(`${process.env.API_URL}/missions/${id}`, {
    cache: "no-store",
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Errore nel recupero della missione");
  }

  return res.json();
}

function formatDate(date) {
  if (!date) return "—";

  return new Intl.DateTimeFormat("it-IT", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

function DetailItem({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-sm text-white">{value || "—"}</p>
    </div>
  );
}

export default async function MissionDetailPage({ params }) {
  const { id } = await params;
  const mission = await getMission(id);

  if (!mission) {
    notFound();
  }

  return (
    <main className="space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/50 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
            Mission Detail
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white">{mission.name}</h1>
          <p className="mt-2 text-sm text-slate-400">ID: {mission.id}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/missions"
            className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
          >
            Torna alla lista
          </Link>

          <Link
            href={`/admin/missions/${mission.id}/edit`}
            className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Modifica missione
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="space-y-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
            <h2 className="text-xl font-semibold text-white">
              Informazioni principali
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <DetailItem label="Nome" value={mission.name} />
              <DetailItem label="Slug" value={mission.slug} />
              <DetailItem label="Status" value={mission.status} />
              <DetailItem label="Mission Type" value={mission.missionType} />
              <DetailItem
                label="Con equipaggio"
                value={mission.isCrewed ? "Sì" : "No"}
              />
              <DetailItem label="Destinazione" value={mission.destination} />
              <DetailItem label="Orbita" value={mission.orbit} />
              <DetailItem
                label="Launch Date"
                value={formatDate(mission.launchDate)}
              />
              <DetailItem
                label="Window Start"
                value={formatDate(mission.windowStart)}
              />
              <DetailItem
                label="Window End"
                value={formatDate(mission.windowEnd)}
              />
              <DetailItem
                label="Creata il"
                value={formatDate(mission.createdAt)}
              />
              <DetailItem
                label="Aggiornata il"
                value={formatDate(mission.updatedAt)}
              />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
            <h2 className="text-xl font-semibold text-white">Descrizione</h2>
            <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-300">
              {mission.description || "Nessuna descrizione disponibile."}
            </p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
            <h2 className="text-xl font-semibold text-white">Link esterni</h2>

            <div className="mt-4 flex flex-col gap-3">
              {mission.imageUrl ? (
                <a
                  href={mission.imageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-slate-700 px-4 py-3 text-sm text-cyan-400 transition hover:bg-slate-800"
                >
                  Apri immagine missione
                </a>
              ) : (
                <p className="text-sm text-slate-400">
                  Nessuna immagine disponibile.
                </p>
              )}

              {mission.detailsUrl ? (
                <a
                  href={mission.detailsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-slate-700 px-4 py-3 text-sm text-cyan-400 transition hover:bg-slate-800"
                >
                  Apri pagina dettagli esterna
                </a>
              ) : (
                <p className="text-sm text-slate-400">
                  Nessun link dettagli disponibile.
                </p>
              )}
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
            <h2 className="text-xl font-semibold text-white">Relazioni</h2>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Agenzia
                </p>
                <p className="mt-2 text-sm text-white">
                  {mission.agency?.name || mission.agencyId}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Razzo
                </p>
                <p className="mt-2 text-sm text-white">
                  {mission.rocket?.name || mission.rocketId}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Launch Site
                </p>
                <p className="mt-2 text-sm text-white">
                  {mission.launchSite?.name || mission.launchSiteId}
                </p>
              </div>
            </div>
          </div>

          {mission.imageUrl && (
            <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/50">
              <div className="border-b border-slate-800 px-6 py-4">
                <h2 className="text-xl font-semibold text-white">Anteprima</h2>
              </div>

              <img
                src={mission.imageUrl}
                alt={mission.name}
                className="h-72 w-full object-cover"
              />
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
