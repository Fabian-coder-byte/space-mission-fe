import Link from "next/link";

const mission = {
  id: "1",
  name: "Artemis II",
  slug: "artemis-ii",
  description:
    "Missione con equipaggio del programma Artemis, pensata per riportare esseri umani nelle vicinanze della Luna e validare i sistemi per le future missioni di esplorazione profonda.",
  missionType: "CREWED",
  status: "SCHEDULED",
  launchDate: "2026-05-21T14:30",
  windowStart: "2026-05-21T14:00",
  windowEnd: "2026-05-21T16:00",
  destination: "Moon",
  orbit: "Lunar Flyby",
  isCrewed: true,
  imageUrl:
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80",
  detailsUrl: "https://www.nasa.gov",
  agencyId: "a1",
  rocketId: "r1",
  launchSiteId: "l1",
};

const agencies = [
  { id: "a1", name: "NASA" },
  { id: "a2", name: "ESA" },
  { id: "a3", name: "SpaceX" },
  { id: "a4", name: "JAXA" },
];

const rockets = [
  { id: "r1", name: "SLS Block 1" },
  { id: "r2", name: "Falcon 9" },
  { id: "r3", name: "Ariane 6" },
  { id: "r4", name: "H3" },
];

const launchSites = [
  { id: "l1", name: "Kennedy Space Center LC-39B" },
  { id: "l2", name: "Vandenberg SLC-4E" },
  { id: "l3", name: "Guiana Space Centre ELA-4" },
  { id: "l4", name: "Tanegashima Yoshinobu Launch Complex" },
];

export const metadata = {
  title: "Modifica Missione",
};

export default function EditMissionPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-8">
          <Link
            href={`/admin/missions/${mission.id}`}
            className="inline-flex items-center text-sm text-cyan-400 transition hover:text-cyan-300"
          >
            ← Torna al dettaglio missione
          </Link>

          <p className="mt-4 text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
            Admin Panel
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            Modifica Missione
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Aggiorna i dati della missione selezionata.
          </p>
        </div>

        <form className="space-y-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Informazioni principali
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Modifica i dati base della missione.
            </p>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Nome
                </label>
                <input
                  type="text"
                  defaultValue={mission.name}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Slug
                </label>
                <input
                  type="text"
                  defaultValue={mission.slug}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Tipo missione
                </label>
                <select
                  defaultValue={mission.missionType}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500"
                >
                  <option value="CREWED">CREWED</option>
                  <option value="SATELLITE">SATELLITE</option>
                  <option value="CARGO">CARGO</option>
                  <option value="TEST_FLIGHT">TEST_FLIGHT</option>
                  <option value="COMMUNICATION">COMMUNICATION</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Stato
                </label>
                <select
                  defaultValue={mission.status}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500"
                >
                  <option value="PLANNED">PLANNED</option>
                  <option value="SCHEDULED">SCHEDULED</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Descrizione
                </label>
                <textarea
                  rows={5}
                  defaultValue={mission.description}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8">
            <h2 className="text-lg font-semibold text-white">Programmazione</h2>
            <p className="mt-1 text-sm text-slate-400">
              Gestisci data e finestra di lancio.
            </p>

            <div className="mt-5 grid gap-5 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Data lancio
                </label>
                <input
                  type="datetime-local"
                  defaultValue={mission.launchDate}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Window Start
                </label>
                <input
                  type="datetime-local"
                  defaultValue={mission.windowStart}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Window End
                </label>
                <input
                  type="datetime-local"
                  defaultValue={mission.windowEnd}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8">
            <h2 className="text-lg font-semibold text-white">Destinazione</h2>
            <p className="mt-1 text-sm text-slate-400">
              Specifica obiettivo e orbita della missione.
            </p>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Destinazione
                </label>
                <input
                  type="text"
                  defaultValue={mission.destination}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Orbita
                </label>
                <input
                  type="text"
                  defaultValue={mission.orbit}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8">
            <h2 className="text-lg font-semibold text-white">Relazioni</h2>
            <p className="mt-1 text-sm text-slate-400">
              Collega la missione alle entità del sistema.
            </p>

            <div className="mt-5 grid gap-5 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Agenzia
                </label>
                <select
                  defaultValue={mission.agencyId}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500"
                >
                  {agencies.map((agency) => (
                    <option key={agency.id} value={agency.id}>
                      {agency.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Razzo
                </label>
                <select
                  defaultValue={mission.rocketId}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500"
                >
                  {rockets.map((rocket) => (
                    <option key={rocket.id} value={rocket.id}>
                      {rocket.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Launch Site
                </label>
                <select
                  defaultValue={mission.launchSiteId}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500"
                >
                  {launchSites.map((site) => (
                    <option key={site.id} value={site.id}>
                      {site.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8">
            <h2 className="text-lg font-semibold text-white">
              Media e riferimenti
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Immagine, link ufficiale e opzioni aggiuntive.
            </p>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Image URL
                </label>
                <input
                  type="text"
                  defaultValue={mission.imageUrl}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Details URL
                </label>
                <input
                  type="text"
                  defaultValue={mission.detailsUrl}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-200">
                  <input
                    type="checkbox"
                    defaultChecked={mission.isCrewed}
                    className="h-4 w-4 rounded border-slate-600 bg-slate-900 text-cyan-500 focus:ring-cyan-500"
                  />
                  Missione con equipaggio
                </label>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6">
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
              <button
                type="button"
                className="rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500/20"
              >
                Elimina Missione
              </button>

              <div className="flex flex-col-reverse gap-3 sm:flex-row">
                <Link
                  href={`/admin/missions/${mission.id}`}
                  className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-sm font-medium text-slate-200 transition hover:bg-slate-700"
                >
                  Annulla
                </Link>

                <button
                  type="submit"
                  className="rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                >
                  Salva modifiche
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}
