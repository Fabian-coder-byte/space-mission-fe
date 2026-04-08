import Link from "next/link";
import { notFound } from "next/navigation";

const agencies = [
  {
    id: 1,
    name: "NASA",
    slug: "nasa",
    country: "Stati Uniti",
    type: "Government",
    foundedYear: 1958,
    status: "Active",
    website: "https://www.nasa.gov",
    headquarters: "Washington, D.C.",
    description:
      "L'agenzia spaziale statunitense responsabile di programmi scientifici, esplorazione umana e missioni robotiche.",
    longDescription:
      "La NASA è una delle istituzioni spaziali più influenti al mondo. Coordina programmi di esplorazione umana, sonde robotiche, osservazione della Terra e ricerca aerospaziale avanzata. Nel corso della sua storia ha guidato missioni iconiche che hanno ridefinito i confini della scienza e della tecnologia.",
    highlights:
      "Punto di riferimento globale per l’esplorazione umana e scientifica dello spazio.",
    imageUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 2,
    name: "ESA",
    slug: "esa",
    country: "Europa",
    type: "Intergovernmental",
    foundedYear: 1975,
    status: "Active",
    website: "https://www.esa.int",
    headquarters: "Parigi, Francia",
    description:
      "L'Agenzia Spaziale Europea coordina missioni scientifiche, osservazione terrestre e programmi di navigazione satellitare.",
    longDescription:
      "L’ESA riunisce diversi stati membri europei per sviluppare programmi spaziali comuni. Si occupa di missioni scientifiche, osservazione della Terra, telecomunicazioni, navigazione satellitare ed esplorazione planetaria, collaborando spesso con partner internazionali.",
    highlights:
      "Cuore della cooperazione spaziale europea e protagonista di grandi missioni scientifiche.",
    imageUrl:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 3,
    name: "SpaceX",
    slug: "spacex",
    country: "Stati Uniti",
    type: "Private",
    foundedYear: 2002,
    status: "Active",
    website: "https://www.spacex.com",
    headquarters: "Hawthorne, California",
    description:
      "Azienda aerospaziale privata focalizzata su lanci orbitali, riutilizzo dei razzi e missioni spaziali commerciali.",
    longDescription:
      "SpaceX ha rivoluzionato il settore dei lanci spaziali grazie al riutilizzo dei booster e a una forte integrazione verticale. L’azienda opera missioni commerciali, governative e di supporto alle infrastrutture satellitari, con un ruolo centrale anche nello sviluppo di sistemi per voli umani.",
    highlights:
      "Una delle aziende che ha trasformato di più il settore spaziale commerciale moderno.",
    imageUrl:
      "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 4,
    name: "Roscosmos",
    slug: "roscosmos",
    country: "Russia",
    type: "Government",
    foundedYear: 1992,
    status: "Active",
    website: "https://www.roscosmos.ru",
    headquarters: "Mosca, Russia",
    description:
      "L'agenzia spaziale russa gestisce programmi di lancio, voli spaziali e infrastrutture orbitali.",
    longDescription:
      "Roscosmos è l’agenzia spaziale federale russa e porta avanti una lunga tradizione nel settore spaziale, erede di una storia che risale ai primi anni dell’era cosmica. Gestisce missioni di lancio, programmi orbitali e infrastrutture storiche di grande rilievo.",
    highlights:
      "Erede di una delle tradizioni spaziali più storiche e influenti del pianeta.",
    imageUrl:
      "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 5,
    name: "ISRO",
    slug: "isro",
    country: "India",
    type: "Government",
    foundedYear: 1969,
    status: "Active",
    website: "https://www.isro.gov.in",
    headquarters: "Bengaluru, India",
    description:
      "L'agenzia spaziale indiana sviluppa missioni scientifiche, satelliti e programmi di esplorazione planetaria.",
    longDescription:
      "L’ISRO è protagonista della crescita spaziale indiana e ha sviluppato programmi satellitari, di navigazione e di esplorazione con crescente impatto internazionale. Negli ultimi anni ha attirato grande attenzione per missioni ambiziose e costi estremamente competitivi.",
    highlights:
      "Una delle realtà spaziali in più rapida crescita e con forte ambizione internazionale.",
    imageUrl:
      "https://images.unsplash.com/photo-1446776709462-d6b525c57bd3?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 6,
    name: "Blue Origin",
    slug: "blue-origin",
    country: "Stati Uniti",
    type: "Private",
    foundedYear: 2000,
    status: "Active",
    website: "https://www.blueorigin.com",
    headquarters: "Kent, Washington",
    description:
      "Società privata impegnata nello sviluppo di sistemi di lancio riutilizzabili e voli suborbitali e orbitali.",
    longDescription:
      "Blue Origin sviluppa sistemi di lancio riutilizzabili e tecnologie legate al volo spaziale commerciale. L’azienda punta sia al trasporto suborbitale sia a programmi più ampi per infrastrutture spaziali e lanci orbitali.",
    highlights:
      "Importante attore del comparto privato con focus su riutilizzo e accesso commerciale allo spazio.",
    imageUrl:
      "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1400&q=80",
  },
];

function getAgencyBySlug(slug) {
  return agencies.find((agency) => agency.slug === slug);
}

function getTypeClasses(type) {
  switch (type) {
    case "Government":
      return "border-cyan-500/30 bg-cyan-500/10 text-cyan-300";
    case "Private":
      return "border-violet-500/30 bg-violet-500/10 text-violet-300";
    case "Intergovernmental":
      return "border-amber-500/30 bg-amber-500/10 text-amber-300";
    default:
      return "border-slate-700 bg-slate-800 text-slate-300";
  }
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
  return agencies.map((agency) => ({
    slug: agency.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const agency = getAgencyBySlug(slug);

  if (!agency) {
    return {
      title: "Agenzia non trovata",
      description: "L'agenzia richiesta non è disponibile.",
    };
  }

  return {
    title: agency.name,
    description: agency.description,
  };
}

export default async function AgencyDetailPage({ params }) {
  const { slug } = await params;
  const agency = getAgencyBySlug(slug);

  if (!agency) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 -z-10">
          <img
            src={agency.imageUrl}
            alt={agency.name}
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-slate-950/80" />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-20">
          <Link
            href="/agencies"
            className="inline-flex items-center text-sm text-cyan-400 transition hover:text-cyan-300"
          >
            ← Torna alle agenzie
          </Link>

          <div className="mt-8 max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`rounded-full border px-3 py-1 text-xs font-medium ${getTypeClasses(
                  agency.type,
                )}`}
              >
                {agency.type}
              </span>

              <span
                className={`rounded-full border px-3 py-1 text-xs font-medium ${getStatusClasses(
                  agency.status,
                )}`}
              >
                {agency.status}
              </span>
            </div>

            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
              {agency.name}
            </h1>

            <p className="mt-4 text-sm text-slate-400">
              {agency.country} • Fondata nel {agency.foundedYear}
            </p>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              {agency.longDescription}
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
                {agency.description}
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
              <h2 className="text-2xl font-semibold text-white">
                Punti chiave
              </h2>
              <p className="mt-4 leading-8 text-slate-300">
                {agency.highlights}
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
              <h2 className="text-2xl font-semibold text-white">
                Informazioni generali
              </h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Sede principale
                  </p>
                  <p className="mt-2 text-sm text-slate-200">
                    {agency.headquarters}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Anno di fondazione
                  </p>
                  <p className="mt-2 text-sm text-slate-200">
                    {agency.foundedYear}
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
                    Tipo
                  </p>
                  <p className="mt-2 text-sm text-slate-200">{agency.type}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Stato
                  </p>
                  <p className="mt-2 text-sm text-slate-200">{agency.status}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Paese / Area
                  </p>
                  <p className="mt-2 text-sm text-slate-200">
                    {agency.country}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Sede
                  </p>
                  <p className="mt-2 text-sm text-slate-200">
                    {agency.headquarters}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Sito ufficiale
                  </p>
                  <a
                    href={agency.website}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex text-sm text-cyan-400 transition hover:text-cyan-300"
                  >
                    Visita il sito
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
              <h2 className="text-xl font-semibold text-white">Navigazione</h2>

              <div className="mt-5 flex flex-col gap-3">
                <Link
                  href="/agencies"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-700 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-cyan-400 hover:text-cyan-400"
                >
                  Tutte le agenzie
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
