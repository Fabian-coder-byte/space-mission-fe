import Link from "next/link";

const missions = [
  {
    id: 1,
    name: "Artemis Explorer I",
    slug: "artemis-explorer-i",
    agency: "NASA / ESA",
    rocket: "Space Launch System",
    launchSite: "Kennedy Space Center",
    launchDate: "12 Maggio 2026 • 14:30 UTC",
    status: "Upcoming",
    description:
      "Missione dedicata all’esplorazione lunare con obiettivi scientifici e tecnologici avanzati.",
  },
  {
    id: 2,
    name: "Starlink Deployment 12",
    slug: "starlink-deployment-12",
    agency: "SpaceX",
    rocket: "Falcon 9",
    launchSite: "Cape Canaveral",
    launchDate: "18 Maggio 2026 • 09:15 UTC",
    status: "Upcoming",
    description:
      "Nuovo lancio dedicato al dispiegamento di satelliti per la costellazione Starlink.",
  },
  {
    id: 3,
    name: "Mars Probe Alpha",
    slug: "mars-probe-alpha",
    agency: "NASA",
    rocket: "Falcon Heavy",
    launchSite: "Kennedy Space Center",
    launchDate: "02 Giugno 2026 • 19:40 UTC",
    status: "Planned",
    description:
      "Missione interplanetaria con obiettivo di studio dell’atmosfera e della superficie marziana.",
  },
  {
    id: 4,
    name: "Galileo Orbital Mission",
    slug: "galileo-orbital-mission",
    agency: "ESA",
    rocket: "Ariane 6",
    launchSite: "Guiana Space Centre",
    launchDate: "21 Giugno 2026 • 07:00 UTC",
    status: "Planned",
    description:
      "Missione europea per il posizionamento di nuovi satelliti in orbita terrestre.",
  },
];

function getStatusClasses(status) {
  switch (status) {
    case "Upcoming":
      return "border-cyan-500/30 bg-cyan-500/10 text-cyan-300";
    case "Planned":
      return "border-violet-500/30 bg-violet-500/10 text-violet-300";
    case "Success":
      return "border-emerald-500/30 bg-emerald-500/10 text-emerald-300";
    case "Failed":
      return "border-red-500/30 bg-red-500/10 text-red-300";
    default:
      return "border-slate-700 bg-slate-800 text-slate-300";
  }
}

export const metadata = {
  title: "Missioni",
  description: "Esplora le prossime missioni spaziali e i dettagli di lancio.",
};

export default function MissionsPage() {
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
        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/50 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Missioni in evidenza
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Una panoramica delle missioni pianificate e in arrivo.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400">
              Tutte
            </button>
            <button className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400">
              Upcoming
            </button>
            <button className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400">
              Planned
            </button>
          </div>
        </div>

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
                      className={`rounded-full border px-3 py-1 text-xs font-medium ${getStatusClasses(
                        mission.status,
                      )}`}
                    >
                      {mission.status}
                    </span>

                    <span className="text-sm text-slate-400">
                      {mission.launchDate}
                    </span>
                  </div>

                  <h2 className="mt-4 text-2xl font-semibold text-white transition group-hover:text-cyan-400">
                    {mission.name}
                  </h2>

                  <p className="mt-3 leading-7 text-slate-300">
                    {mission.description}
                  </p>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Agenzia
                      </p>
                      <p className="mt-2 text-sm text-slate-200">
                        {mission.agency}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Razzo
                      </p>
                      <p className="mt-2 text-sm text-slate-200">
                        {mission.rocket}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 sm:col-span-2">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Sito di lancio
                      </p>
                      <p className="mt-2 text-sm text-slate-200">
                        {mission.launchSite}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:min-w-[180px]">
                  <Link
                    href={`/missions/${mission.slug}`}
                    className="inline-flex w-full items-center justify-center rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                  >
                    Dettagli missione
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
