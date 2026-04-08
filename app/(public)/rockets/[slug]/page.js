import Link from "next/link";
import { notFound } from "next/navigation";

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
    payloadGto: "8,300 kg",
    firstFlight: "4 Giugno 2010",
    stages: 2,
    description:
      "Razzo orbitale a due stadi progettato da SpaceX per missioni commerciali, governative e di rifornimento.",
    longDescription:
      "Falcon 9 è uno dei lanciatori più riconoscibili dell’era spaziale moderna. È stato sviluppato per offrire missioni affidabili e ad alta frequenza, con una forte enfasi sul riutilizzo del primo stadio. Questo approccio ha contribuito a ridurre i costi di accesso allo spazio e ad aumentare il ritmo operativo dei lanci.",
    highlights:
      "Uno dei simboli del riutilizzo moderno e della nuova economia orbitale.",
    imageUrl:
      "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?auto=format&fit=crop&w=1400&q=80",
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
    payloadGto: "26,700 kg",
    firstFlight: "6 Febbraio 2018",
    stages: 2,
    description:
      "Uno dei razzi operativi più potenti al mondo, progettato per missioni pesanti verso orbite terrestri e oltre.",
    longDescription:
      "Falcon Heavy è un veicolo di lancio heavy-lift progettato per trasportare carichi elevati in orbita terrestre e su traiettorie interplanetarie. Grazie alla configurazione a tre booster, offre prestazioni molto elevate pur mantenendo parte della filosofia di riutilizzo tipica di SpaceX.",
    highlights:
      "Tra i lanciatori operativi più potenti, ideale per missioni ad alta massa.",
    imageUrl:
      "https://images.unsplash.com/photo-1446776709462-d6b525c57bd3?auto=format&fit=crop&w=1400&q=80",
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
    payloadGto: "27,000 kg",
    firstFlight: "16 Novembre 2022",
    stages: 2,
    description:
      "Sistema di lancio super pesante sviluppato per supportare il programma Artemis e missioni deep space.",
    longDescription:
      "Lo Space Launch System è un lanciatore super heavy-lift concepito per missioni oltre l’orbita terrestre bassa, in particolare per il programma Artemis. È pensato per trasportare hardware, capsule e carichi destinati a missioni lunari e, in prospettiva, a scenari ancora più ambiziosi.",
    highlights:
      "Piattaforma chiave per le missioni lunari e deep space del programma Artemis.",
    imageUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=80",
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
    payloadGto: "11,500 kg",
    firstFlight: "9 Luglio 2024",
    stages: 2,
    description:
      "Nuovo lanciatore europeo sviluppato per missioni istituzionali e commerciali con diverse configurazioni.",
    longDescription:
      "Ariane 6 rappresenta l’evoluzione della capacità di lancio europea, con una piattaforma pensata per missioni flessibili e costi più competitivi. Supporta diversi profili di missione e rafforza l’autonomia europea nell’accesso allo spazio.",
    highlights:
      "Nuovo pilastro del sistema di lancio europeo per missioni istituzionali e commerciali.",
    imageUrl:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1400&q=80",
  },
];

function getRocketBySlug(slug) {
  return rockets.find((rocket) => rocket.slug === slug);
}

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

export function generateStaticParams() {
  return rockets.map((rocket) => ({
    slug: rocket.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const rocket = getRocketBySlug(slug);

  if (!rocket) {
    return {
      title: "Razzo non trovato",
      description: "Il razzo richiesto non è disponibile.",
    };
  }

  return {
    title: rocket.name,
    description: rocket.description,
  };
}

export default async function RocketDetailPage({ params }) {
  const { slug } = await params;
  const rocket = getRocketBySlug(slug);

  if (!rocket) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 -z-10">
          <img
            src={rocket.imageUrl}
            alt={rocket.name}
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-slate-950/80" />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-20">
          <Link
            href="/rockets"
            className="inline-flex items-center text-sm text-cyan-400 transition hover:text-cyan-300"
          >
            ← Torna ai razzi
          </Link>

          <div className="mt-8 max-w-4xl">
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

            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
              {rocket.name}
            </h1>

            <p className="mt-4 text-sm text-slate-400">
              {rocket.manufacturer} • Primo volo {rocket.firstFlight}
            </p>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              {rocket.longDescription}
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
                {rocket.description}
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
              <h2 className="text-2xl font-semibold text-white">
                Punti chiave
              </h2>
              <p className="mt-4 leading-8 text-slate-300">
                {rocket.highlights}
              </p>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
              <h2 className="text-2xl font-semibold text-white">
                Specifiche tecniche
              </h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Altezza
                  </p>
                  <p className="mt-2 text-sm text-slate-200">{rocket.height}</p>
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
                  <p className="mt-2 text-sm text-slate-200">{rocket.mass}</p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Payload LEO
                  </p>
                  <p className="mt-2 text-sm text-slate-200">
                    {rocket.payloadLeo}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Payload GTO
                  </p>
                  <p className="mt-2 text-sm text-slate-200">
                    {rocket.payloadGto}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Stadi
                  </p>
                  <p className="mt-2 text-sm text-slate-200">{rocket.stages}</p>
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
                    Produttore
                  </p>
                  <p className="mt-2 text-sm text-slate-200">
                    {rocket.manufacturer}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Stato
                  </p>
                  <p className="mt-2 text-sm text-slate-200">{rocket.status}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Riutilizzabile
                  </p>
                  <p className="mt-2 text-sm text-slate-200">
                    {rocket.reusable ? "Sì" : "No"}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Primo volo
                  </p>
                  <p className="mt-2 text-sm text-slate-200">
                    {rocket.firstFlight}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
              <h2 className="text-xl font-semibold text-white">Navigazione</h2>

              <div className="mt-5 flex flex-col gap-3">
                <Link
                  href="/rockets"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-700 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-cyan-400 hover:text-cyan-400"
                >
                  Tutti i razzi
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
