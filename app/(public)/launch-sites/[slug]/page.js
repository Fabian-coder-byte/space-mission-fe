import Link from "next/link";
import { notFound } from "next/navigation";

const launchSites = [
  {
    id: 1,
    name: "Kennedy Space Center",
    slug: "kennedy-space-center",
    code: "KSC",
    country: "Stati Uniti",
    region: "Florida",
    locationName: "Cape Canaveral",
    status: "Active",
    launches: "Storico",
    operator: "NASA",
    latitude: "28.5729",
    longitude: "-80.6490",
    description:
      "Uno dei più importanti complessi di lancio al mondo, sede di missioni NASA e partner commerciali.",
    longDescription:
      "Il Kennedy Space Center è uno dei centri spaziali più iconici della storia moderna. Da qui sono partite missioni Apollo, Space Shuttle e numerosi lanci contemporanei dedicati a esplorazione, telecomunicazioni e programmi scientifici avanzati.",
    highlights:
      "Centro storico per le missioni con equipaggio e punto chiave dell’infrastruttura spaziale americana.",
    imageUrl:
      "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 2,
    name: "Cape Canaveral Space Force Station",
    slug: "cape-canaveral-space-force-station",
    code: "CCSFS",
    country: "Stati Uniti",
    region: "Florida",
    locationName: "Cape Canaveral",
    status: "Active",
    launches: "Molto frequenti",
    operator: "United States Space Force",
    latitude: "28.4889",
    longitude: "-80.5778",
    description:
      "Base di lancio storica per missioni governative, commerciali e militari, spesso utilizzata da SpaceX e ULA.",
    longDescription:
      "Cape Canaveral Space Force Station è una struttura essenziale per il programma spaziale statunitense. Ospita numerosi pad di lancio e viene impiegata per missioni commerciali, satellitari, militari e di trasporto orbitale.",
    highlights:
      "Sito estremamente attivo, con una forte frequenza di lanci e un ruolo centrale nei programmi commerciali USA.",
    imageUrl:
      "https://images.unsplash.com/photo-1446776709462-d6b525c57bd3?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 3,
    name: "Guiana Space Centre",
    slug: "guiana-space-centre",
    code: "CSG",
    country: "Guyana Francese",
    region: "Kourou",
    locationName: "Kourou",
    status: "Active",
    launches: "Regolari",
    operator: "CNES / ESA / Arianespace",
    latitude: "5.2360",
    longitude: "-52.7680",
    description:
      "Principale spazioporto europeo, strategicamente posizionato vicino all’equatore per missioni orbitali efficienti.",
    longDescription:
      "Il Guiana Space Centre di Kourou è il principale spazioporto europeo. La sua posizione geografica vicina all’equatore offre vantaggi energetici importanti per i lanci orbitali, rendendolo ideale per missioni commerciali e istituzionali.",
    highlights:
      "Punto di riferimento per il programma spaziale europeo e per missioni con alta efficienza orbitale.",
    imageUrl:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 4,
    name: "Vandenberg Space Force Base",
    slug: "vandenberg-space-force-base",
    code: "VSFB",
    country: "Stati Uniti",
    region: "California",
    locationName: "Lompoc",
    status: "Active",
    launches: "Frequenti",
    operator: "United States Space Force",
    latitude: "34.7420",
    longitude: "-120.5724",
    description:
      "Sito di lancio chiave per missioni polari, militari e per satelliti destinati a orbite specializzate.",
    longDescription:
      "Vandenberg è noto soprattutto per i lanci verso orbite polari e sun-synchronous. La sua posizione sulla costa occidentale degli Stati Uniti lo rende perfetto per traiettorie che richiedono particolari inclinazioni orbitali.",
    highlights:
      "Fondamentale per missioni polari, militari e satelliti di osservazione terrestre.",
    imageUrl:
      "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 5,
    name: "Baikonur Cosmodrome",
    slug: "baikonur-cosmodrome",
    code: "BAI",
    country: "Kazakistan",
    region: "Baikonur",
    locationName: "Baikonur",
    status: "Active",
    launches: "Storico",
    operator: "Roscosmos",
    latitude: "45.9200",
    longitude: "63.3420",
    description:
      "Il più antico e iconico cosmodromo operativo, fondamentale nella storia dell’esplorazione spaziale.",
    longDescription:
      "Baikonur Cosmodrome è uno dei siti più celebri dell’intera storia spaziale. Da qui sono partite missioni pionieristiche che hanno segnato l’inizio dell’era spaziale, rendendolo ancora oggi un luogo simbolico e operativo.",
    highlights:
      "Uno dei siti più storici dell’esplorazione spaziale, con un’eredità immensa.",
    imageUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 6,
    name: "Satish Dhawan Space Centre",
    slug: "satish-dhawan-space-centre",
    code: "SDSC",
    country: "India",
    region: "Andhra Pradesh",
    locationName: "Sriharikota",
    status: "Active",
    launches: "Regolari",
    operator: "ISRO",
    latitude: "13.7199",
    longitude: "80.2304",
    description:
      "Centro di lancio principale dell’ISRO, utilizzato per missioni satellitari, lunari e interplanetarie.",
    longDescription:
      "Il Satish Dhawan Space Centre è la principale base di lancio dell’India. Supporta missioni satellitari, di navigazione e di esplorazione, contribuendo alla crescita del programma spaziale indiano a livello globale.",
    highlights:
      "Cuore operativo dei lanci indiani, con una crescente importanza internazionale.",
    imageUrl:
      "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=1400&q=80",
  },
];

function getLaunchSiteBySlug(slug) {
  return launchSites.find((site) => site.slug === slug);
}

function getStatusClasses(status) {
  switch (status) {
    case "Active":
      return "border-emerald-500/30 bg-emerald-500/10 text-emerald-300";
    case "Inactive":
      return "border-slate-600 bg-slate-800 text-slate-300";
    default:
      return "border-slate-700 bg-slate-800 text-slate-300";
  }
}

export function generateStaticParams() {
  return launchSites.map((site) => ({
    slug: site.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const site = getLaunchSiteBySlug(slug);

  if (!site) {
    return {
      title: "Sito di lancio non trovato",
      description: "Il sito di lancio richiesto non è disponibile.",
    };
  }

  return {
    title: site.name,
    description: site.description,
  };
}

export default async function LaunchSiteDetailPage({ params }) {
  const { slug } = await params;
  const site = getLaunchSiteBySlug(slug);

  if (!site) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 -z-10">
          <img
            src={site.imageUrl}
            alt={site.name}
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-slate-950/80" />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-20">
          <Link
            href="/launch-sites"
            className="inline-flex items-center text-sm text-cyan-400 transition hover:text-cyan-300"
          >
            ← Torna ai launch sites
          </Link>

          <div className="mt-8 max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`rounded-full border px-3 py-1 text-xs font-medium ${getStatusClasses(
                  site.status,
                )}`}
              >
                {site.status}
              </span>

              <span className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">
                {site.code}
              </span>
            </div>

            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
              {site.name}
            </h1>

            <p className="mt-4 text-sm text-slate-400">
              {site.locationName}, {site.region} • {site.country}
            </p>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              {site.longDescription}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-8">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-cyan-400">
                Panoramica
              </p>
              <p className="mt-4 leading-8 text-slate-300">
                {site.description}
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
              <h2 className="text-2xl font-semibold text-white">
                Punti chiave
              </h2>
              <p className="mt-4 leading-8 text-slate-300">{site.highlights}</p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
              <h2 className="text-2xl font-semibold text-white">
                Coordinate e posizione
              </h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Latitudine
                  </p>
                  <p className="mt-2 text-sm text-slate-200">{site.latitude}</p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Longitudine
                  </p>
                  <p className="mt-2 text-sm text-slate-200">
                    {site.longitude}
                  </p>
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
                    Codice
                  </p>
                  <p className="mt-2 text-sm text-slate-200">{site.code}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Operatore
                  </p>
                  <p className="mt-2 text-sm text-slate-200">{site.operator}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Località
                  </p>
                  <p className="mt-2 text-sm text-slate-200">
                    {site.locationName}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Regione
                  </p>
                  <p className="mt-2 text-sm text-slate-200">{site.region}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Paese
                  </p>
                  <p className="mt-2 text-sm text-slate-200">{site.country}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Attività lanci
                  </p>
                  <p className="mt-2 text-sm text-slate-200">{site.launches}</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
              <h2 className="text-xl font-semibold text-white">Navigazione</h2>

              <div className="mt-5 flex flex-col gap-3">
                <Link
                  href="/launch-sites"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-700 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-cyan-400 hover:text-cyan-400"
                >
                  Tutti i launch sites
                </Link>

                <Link
                  href="/missions"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-700 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-cyan-400 hover:text-cyan-400"
                >
                  Vai alle missioni
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
