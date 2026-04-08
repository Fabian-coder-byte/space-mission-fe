import Link from "next/link";

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
    description:
      "L'agenzia spaziale statunitense responsabile di programmi scientifici, esplorazione umana e missioni robotiche.",
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
    description:
      "L'Agenzia Spaziale Europea coordina missioni scientifiche, osservazione terrestre e programmi di navigazione satellitare.",
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
    description:
      "Azienda aerospaziale privata focalizzata su lanci orbitali, riutilizzo dei razzi e missioni spaziali commerciali.",
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
    description:
      "L'agenzia spaziale russa gestisce programmi di lancio, voli spaziali e infrastrutture orbitali.",
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
    description:
      "L'agenzia spaziale indiana sviluppa missioni scientifiche, satelliti e programmi di esplorazione planetaria.",
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
    description:
      "Società privata impegnata nello sviluppo di sistemi di lancio riutilizzabili e voli suborbitali e orbitali.",
  },
];

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

export const metadata = {
  title: "Agenzie",
  description: "Esplora le principali agenzie e aziende spaziali del mondo.",
};

export default function AgenciesPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
            Agencies
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Agenzie e organizzazioni spaziali
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Scopri le principali agenzie governative, organizzazioni
            internazionali e aziende private che guidano il settore spaziale.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/50 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Catalogo agenzie
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Una panoramica delle organizzazioni più rilevanti nel panorama
              spaziale.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400">
              Tutte
            </button>
            <button className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400">
              Government
            </button>
            <button className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400">
              Private
            </button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {agencies.map((agency) => (
            <article
              key={agency.id}
              className="group rounded-3xl border border-slate-800 bg-slate-900/50 p-6 transition hover:border-cyan-400/40 hover:bg-slate-900"
            >
              <div className="flex h-full flex-col justify-between">
                <div>
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

                  <h2 className="mt-4 text-2xl font-semibold text-white transition group-hover:text-cyan-400">
                    {agency.name}
                  </h2>

                  <p className="mt-2 text-sm text-slate-400">
                    {agency.country} • Fondata nel {agency.foundedYear}
                  </p>

                  <p className="mt-4 leading-7 text-slate-300">
                    {agency.description}
                  </p>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Paese / Area
                      </p>
                      <p className="mt-2 text-sm text-slate-200">
                        {agency.country}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Fondazione
                      </p>
                      <p className="mt-2 text-sm text-slate-200">
                        {agency.foundedYear}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={`/agencies/${agency.slug}`}
                    className="inline-flex items-center justify-center rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                  >
                    Dettagli agenzia
                  </Link>

                  <a
                    href={agency.website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-400"
                  >
                    Sito ufficiale
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
