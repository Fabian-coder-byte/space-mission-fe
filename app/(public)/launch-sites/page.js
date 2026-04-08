import Link from "next/link";

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
    description:
      "Uno dei più importanti complessi di lancio al mondo, sede di missioni NASA e partner commerciali.",
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
    description:
      "Base di lancio storica per missioni governative, commerciali e militari, spesso utilizzata da SpaceX e ULA.",
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
    description:
      "Principale spazioporto europeo, strategicamente posizionato vicino all’equatore per missioni orbitali efficienti.",
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
    description:
      "Sito di lancio chiave per missioni polari, militari e per satelliti destinati a orbite specializzate.",
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
    description:
      "Il più antico e iconico cosmodromo operativo, fondamentale nella storia dell’esplorazione spaziale.",
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
    description:
      "Centro di lancio principale dell’ISRO, utilizzato per missioni satellitari, lunari e interplanetarie.",
  },
];

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
  title: "Launch Sites",
  description: "Esplora i principali siti di lancio spaziale nel mondo.",
};

export default function LaunchSitesPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
            Launch Sites
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Siti di lancio spaziale
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Scopri i principali spazioporti e complessi di lancio da cui partono
            missioni orbitali, lunari e interplanetarie.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/50 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Catalogo launch sites
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Una panoramica dei principali siti di lancio attivi nel mondo.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400">
              Tutti
            </button>
            <button className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400">
              Active
            </button>
            <button className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400">
              Storici
            </button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {launchSites.map((site) => (
            <article
              key={site.id}
              className="group rounded-3xl border border-slate-800 bg-slate-900/50 p-6 transition hover:border-cyan-400/40 hover:bg-slate-900"
            >
              <div className="flex h-full flex-col justify-between">
                <div>
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

                  <h2 className="mt-4 text-2xl font-semibold text-white transition group-hover:text-cyan-400">
                    {site.name}
                  </h2>

                  <p className="mt-2 text-sm text-slate-400">
                    {site.locationName}, {site.region} • {site.country}
                  </p>

                  <p className="mt-4 leading-7 text-slate-300">
                    {site.description}
                  </p>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Regione
                      </p>
                      <p className="mt-2 text-sm text-slate-200">
                        {site.region}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Attività lanci
                      </p>
                      <p className="mt-2 text-sm text-slate-200">
                        {site.launches}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Link
                    href={`/launch-sites/${site.slug}`}
                    className="inline-flex items-center justify-center rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                  >
                    Dettagli sito
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
