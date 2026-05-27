import Link from "next/link";
import { notFound } from "next/navigation";
import { serverFetch } from "@/lib/api/server";

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

function fmt(value, suffix = "") {
  if (value == null) return "—";
  return typeof value === "number"
    ? value.toLocaleString("it-IT") + suffix
    : value + suffix;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const rocket = await serverFetch(`/rockets/${slug}`);
  if (!rocket) return { title: "Razzo non trovato" };
  return { title: rocket.name, description: rocket.description };
}

export default async function RocketDetailPage({ params }) {
  const { slug } = await params;
  const rocket = await serverFetch(`/rockets/${slug}`);

  if (!rocket) notFound();

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-slate-800">
        {rocket.imageUrl && (
          <div className="absolute inset-0 -z-10">
            <img
              src={rocket.imageUrl}
              alt={rocket.name}
              className="h-full w-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-slate-950/80" />
          </div>
        )}

        <div className="mx-auto max-w-7xl px-6 py-20">
          <Link
            href="/rockets"
            className="inline-flex items-center text-sm text-cyan-400 transition hover:text-cyan-300"
          >
            ← Torna ai razzi
          </Link>

          <div className="mt-8 max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              {rocket.status && (
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-medium ${getStatusClasses(rocket.status)}`}
                >
                  {STATUS_LABEL[rocket.status] ?? rocket.status}
                </span>
              )}

              <span
                className={`rounded-full border px-3 py-1 text-xs font-medium ${getReusableClasses(rocket.reusable)}`}
              >
                {rocket.reusable ? "Reusable" : "Non-reusable"}
              </span>
            </div>

            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
              {rocket.name}
            </h1>

            {(rocket.manufacturer || rocket.firstFlightDate) && (
              <p className="mt-4 text-sm text-slate-400">
                {rocket.manufacturer}
                {rocket.manufacturer && rocket.firstFlightDate ? " • " : ""}
                {rocket.firstFlightDate
                  ? `Primo volo ${formatFirstFlight(rocket.firstFlightDate)}`
                  : ""}
              </p>
            )}

            {rocket.description && (
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                {rocket.description}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-8">
            {rocket.description && (
              <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
                <p className="text-sm font-medium uppercase tracking-[0.25em] text-cyan-400">
                  Panoramica
                </p>
                <p className="mt-4 leading-8 text-slate-300">
                  {rocket.description}
                </p>
              </div>
            )}

            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
              <h2 className="text-2xl font-semibold text-white">
                Specifiche tecniche
              </h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Altezza
                  </p>
                  <p className="mt-2 text-sm text-slate-200">
                    {fmt(rocket.heightMeters, " m")}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Diametro
                  </p>
                  <p className="mt-2 text-sm text-slate-200">
                    {fmt(rocket.diameterMeters, " m")}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Massa
                  </p>
                  <p className="mt-2 text-sm text-slate-200">
                    {fmt(rocket.massKg, " kg")}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Payload LEO
                  </p>
                  <p className="mt-2 text-sm text-slate-200">
                    {fmt(rocket.payloadToLeoKg, " kg")}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Payload GTO
                  </p>
                  <p className="mt-2 text-sm text-slate-200">
                    {fmt(rocket.payloadToGtoKg, " kg")}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Riutilizzabile
                  </p>
                  <p className="mt-2 text-sm text-slate-200">
                    {rocket.reusable ? "Sì" : "No"}
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
                {rocket.manufacturer && (
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Produttore
                    </p>
                    <p className="mt-2 text-sm text-slate-200">
                      {rocket.manufacturer}
                    </p>
                  </div>
                )}

                {rocket.status && (
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Stato
                    </p>
                    <p className="mt-2 text-sm text-slate-200">
                      {STATUS_LABEL[rocket.status] ?? rocket.status}
                    </p>
                  </div>
                )}

                {rocket.agency && (
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Agenzia
                    </p>
                    <p className="mt-2 text-sm text-slate-200">
                      <Link
                        href={`/agencies/${rocket.agency.id}`}
                        className="text-cyan-400 hover:text-cyan-300"
                      >
                        {rocket.agency.name}
                      </Link>
                    </p>
                  </div>
                )}

                {rocket.firstFlightDate && (
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Primo volo
                    </p>
                    <p className="mt-2 text-sm text-slate-200">
                      {formatFirstFlight(rocket.firstFlightDate)}
                    </p>
                  </div>
                )}
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
