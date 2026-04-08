import Link from "next/link";

const rockets = [
  {
    id: 1,
    name: "Falcon 9",
    slug: "falcon-9",
    manufacturer: "SpaceX",
    status: "Active",
    reusable: true,
    height: "70 m",
    diameter: "3.7 m",
    mass: "549,054 kg",
    payloadLeo: "22,800 kg",
    firstFlight: "4 Giugno 2010",
    description:
      "Razzo orbitale a due stadi progettato da SpaceX per missioni commerciali, governative e di rifornimento.",
  },
  {
    id: 2,
    name: "Falcon Heavy",
    slug: "falcon-heavy",
    manufacturer: "SpaceX",
    status: "Active",
    reusable: true,
    height: "70 m",
    diameter: "12.2 m",
    mass: "1,420,788 kg",
    payloadLeo: "63,800 kg",
    firstFlight: "6 Febbraio 2018",
    description:
      "Uno dei razzi operativi più potenti al mondo, progettato per missioni pesanti verso orbite terrestri e oltre.",
  },
  {
    id: 3,
    name: "Space Launch System",
    slug: "space-launch-system",
    manufacturer: "NASA",
    status: "Active",
    reusable: false,
    height: "98 m",
    diameter: "8.4 m",
    mass: "2,600,000 kg",
    payloadLeo: "95,000 kg",
    firstFlight: "16 Novembre 2022",
    description:
      "Sistema di lancio super pesante sviluppato per supportare il programma Artemis e missioni deep space.",
  },
  {
    id: 4,
    name: "Ariane 6",
    slug: "ariane-6",
    manufacturer: "ArianeGroup / ESA",
    status: "Active",
    reusable: false,
    height: "63 m",
    diameter: "5.4 m",
    mass: "530,000 kg",
    payloadLeo: "21,650 kg",
    firstFlight: "9 Luglio 2024",
    description:
      "Nuovo lanciatore europeo sviluppato per missioni istituzionali e commerciali con diverse configurazioni.",
  },
];

function getStatusClasses(status) {
  switch (status) {
    case "Active":
      return "border-emerald-500/30 bg-emerald-500/10 text-emerald-300";
    case "Retired":
      return "border-slate-600 bg-slate-800 text-slate-300";
    case "Development":
      return "border-violet-500/30 bg-violet-500/10 text-violet-300";
    default:
      return "border-slate-700 bg-slate-800 text-slate-300";
  }
}

function getReusableClasses(reusable) {
  return reusable
    ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-300"
    : "border-amber-500/30 bg-amber-500/10 text-amber-300";
}

export const metadata = {
  title: "Razzi",
  description: "Esplora i principali razzi utilizzati nelle missioni spaziali.",
};

export default function RocketsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
            Rockets
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Razzi e veicoli di lancio
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Consulta i principali razzi utilizzati nelle missioni spaziali, con
            informazioni tecniche, stato operativo e capacità di carico.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/50 p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Catalogo razzi</h2>
            <p className="mt-1 text-sm text-slate-400">
              Una selezione dei veicoli di lancio più importanti.
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
              Reusable
            </button>
          </div>
        </div>

        <div className="grid gap-6">
          {rockets.map((rocket) => (
            <article
              key={rocket.id}
              className="group rounded-3xl border border-slate-800 bg-slate-900/50 p-6 transition hover:border-cyan-400/40 hover:bg-slate-900"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-4xl">
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-medium ${getStatusClasses(
                        rocket.status,
                      )}`}
                    >
                      {rocket.status}
                    </span>

                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-medium ${getReusableClasses(
                        rocket.reusable,
                      )}`}
                    >
                      {rocket.reusable ? "Reusable" : "Non-reusable"}
                    </span>
                  </div>

                  <h2 className="mt-4 text-2xl font-semibold text-white transition group-hover:text-cyan-400">
                    {rocket.name}
                  </h2>

                  <p className="mt-2 text-sm text-slate-400">
                    Produttore: {rocket.manufacturer}
                  </p>

                  <p className="mt-4 leading-7 text-slate-300">
                    {rocket.description}
                  </p>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Altezza
                      </p>
                      <p className="mt-2 text-sm text-slate-200">
                        {rocket.height}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Diametro
                      </p>
                      <p className="mt-2 text-sm text-slate-200">
                        {rocket.diameter}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Massa
                      </p>
                      <p className="mt-2 text-sm text-slate-200">
                        {rocket.mass}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Payload LEO
                      </p>
                      <p className="mt-2 text-sm text-slate-200">
                        {rocket.payloadLeo}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:min-w-[180px]">
                  <Link
                    href={`/rockets/${rocket.slug}`}
                    className="inline-flex w-full items-center justify-center rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                  >
                    Dettagli razzo
                  </Link>

                  <p className="mt-3 text-center text-xs text-slate-500">
                    Primo volo: {rocket.firstFlight}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
