import Link from "next/link";
import { notFound } from "next/navigation";

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
    longDescription:
      "Artemis Explorer I è una missione progettata per testare nuove tecnologie e procedure operative per l’esplorazione oltre l’orbita terrestre bassa. L’obiettivo principale è validare sistemi di volo, comunicazione e supporto alle future missioni lunari con equipaggio.",
    objective:
      "Validare tecnologie e sistemi per future missioni verso la Luna.",
    payload: "Modulo sperimentale e strumenti scientifici",
    orbit: "Trans-Lunar Injection",
    imageUrl:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1400&q=80",
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
    longDescription:
      "La missione Starlink Deployment 12 prevede il rilascio in orbita di una nuova serie di satelliti per potenziare la copertura globale della rete Starlink. Il lancio sarà eseguito con un Falcon 9 riutilizzabile da Cape Canaveral.",
    objective:
      "Espandere la costellazione satellitare per la connettività globale.",
    payload: "Satelliti Starlink",
    orbit: "Low Earth Orbit",
    imageUrl:
      "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?auto=format&fit=crop&w=1400&q=80",
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
    longDescription:
      "Mars Probe Alpha è una missione scientifica pensata per raccogliere dati dettagliati sull’atmosfera marziana, sulle variazioni climatiche e sulla composizione di superficie. La sonda trasporterà strumenti ad alta precisione dedicati all’osservazione remota.",
    objective:
      "Analizzare atmosfera e superficie marziana con strumenti avanzati.",
    payload: "Sonda scientifica marziana",
    orbit: "Mars Transfer Orbit",
    imageUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80",
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
    longDescription:
      "Galileo Orbital Mission continua l’espansione e il rinnovamento della costellazione Galileo, migliorando precisione, copertura e affidabilità dei servizi di navigazione satellitare europei.",
    objective:
      "Rafforzare il sistema europeo di navigazione satellitare Galileo.",
    payload: "Satelliti di navigazione Galileo",
    orbit: "Medium Earth Orbit",
    imageUrl:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1400&q=80",
  },
];

function getMissionBySlug(slug) {
  return missions.find((mission) => mission.slug === slug);
}

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

export function generateStaticParams() {
  return missions.map((mission) => ({
    slug: mission.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const mission = getMissionBySlug(slug);

  if (!mission) {
    return {
      title: "Missione non trovata",
      description: "La missione richiesta non è disponibile.",
    };
  }

  return {
    title: mission.name,
    description: mission.description,
  };
}

export default async function MissionDetailPage({ params }) {
  const { slug } = await params;
  const mission = getMissionBySlug(slug);

  if (!mission) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 -z-10">
          <img
            src={mission.imageUrl}
            alt={mission.name}
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-slate-950/80" />
        </div>

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

            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
              {mission.name}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              {mission.longDescription}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-8">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-cyan-400">
                Panoramica missione
              </p>
              <p className="mt-4 leading-8 text-slate-300">
                {mission.description}
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
              <h2 className="text-2xl font-semibold text-white">Obiettivo</h2>
              <p className="mt-4 leading-8 text-slate-300">
                {mission.objective}
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
              <h2 className="text-2xl font-semibold text-white">
                Dettagli operativi
              </h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Payload
                  </p>
                  <p className="mt-2 text-sm text-slate-200">
                    {mission.payload}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Orbita
                  </p>
                  <p className="mt-2 text-sm text-slate-200">{mission.orbit}</p>
                </div>
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
                    {mission.agency}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Razzo
                  </p>
                  <p className="mt-2 text-sm text-slate-200">
                    {mission.rocket}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Launch Site
                  </p>
                  <p className="mt-2 text-sm text-slate-200">
                    {mission.launchSite}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Data di lancio
                  </p>
                  <p className="mt-2 text-sm text-slate-200">
                    {mission.launchDate}
                  </p>
                </div>
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
