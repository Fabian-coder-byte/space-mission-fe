import Link from "next/link";
import { serverFetch } from "@/lib/api/server";

export const metadata = {
  title: "Razzi",
  description: "Esplora i principali razzi utilizzati nelle missioni spaziali.",
};

function formatFirstFlight(dateStr) {
  if (!dateStr) return "—";
  return new Intl.DateTimeFormat("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateStr));
}

const STATUS_LABEL = {
  ACTIVE: "Active",
  RETIRED: "Retired",
  IN_DEVELOPMENT: "In Development",
};

function getStatusClasses(status) {
  switch (status) {
    case "ACTIVE": return "border-emerald-500/30 bg-emerald-500/10 text-emerald-300";
    case "RETIRED": return "border-slate-600 bg-slate-800 text-slate-300";
    case "IN_DEVELOPMENT": return "border-violet-500/30 bg-violet-500/10 text-violet-300";
    default: return "border-slate-700 bg-slate-800 text-slate-300";
  }
}

function getReusableClasses(reusable) {
  return reusable
    ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-300"
    : "border-amber-500/30 bg-amber-500/10 text-amber-300";
}

function formatMass(kg) {
  if (!kg) return "—";
  return kg.toLocaleString("it-IT") + " kg";
}

function formatPayload(kg) {
  if (!kg) return "—";
  return kg.toLocaleString("it-IT") + " kg";
}

function formatMeters(m) {
  if (!m) return "—";
  return m.toFixed(1) + " m";
}

export default async function RocketsPage() {
  const rockets = await serverFetch("/rockets") ?? [];

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
        <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
          <div>
            <h2 className="text-lg font-semibold text-white">Catalogo razzi</h2>
            <p className="mt-1 text-sm text-slate-400">
              {rockets.length} razzi nel database.
            </p>
          </div>
        </div>

        {rockets.length === 0 ? (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-12 text-center text-slate-400">
            Nessun razzo disponibile al momento.
          </div>
        ) : (
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
                        className={`rounded-full border px-3 py-1 text-xs font-medium ${getStatusClasses(rocket.status)}`}
                      >
                        {STATUS_LABEL[rocket.status] ?? rocket.status ?? "Unknown"}
                      </span>

                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-medium ${getReusableClasses(rocket.reusable)}`}
                      >
                        {rocket.reusable ? "Reusable" : "Non-reusable"}
                      </span>
                    </div>

                    <h2 className="mt-4 text-2xl font-semibold text-white transition group-hover:text-cyan-400">
                      {rocket.name}
                    </h2>

                    {rocket.manufacturer && (
                      <p className="mt-2 text-sm text-slate-400">
                        Produttore: {rocket.manufacturer}
                      </p>
                    )}

                    {rocket.description && (
                      <p className="mt-4 leading-7 text-slate-300">
                        {rocket.description}
                      </p>
                    )}

                    <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                      <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                          Altezza
                        </p>
                        <p className="mt-2 text-sm text-slate-200">
                          {formatMeters(rocket.heightMeters)}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                          Diametro
                        </p>
                        <p className="mt-2 text-sm text-slate-200">
                          {formatMeters(rocket.diameterMeters)}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                          Massa
                        </p>
                        <p className="mt-2 text-sm text-slate-200">
                          {formatMass(rocket.massKg)}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                          Payload LEO
                        </p>
                        <p className="mt-2 text-sm text-slate-200">
                          {formatPayload(rocket.payloadToLeoKg)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:min-w-[180px]">
                    <Link
                      href={`/rockets/${rocket.id}`}
                      className="inline-flex w-full items-center justify-center rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                    >
                      Dettagli razzo
                    </Link>

                    {rocket.firstFlightDate && (
                      <p className="mt-3 text-center text-xs text-slate-500">
                        Primo volo: {formatFirstFlight(rocket.firstFlightDate)}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
