import Link from "next/link";
import { notFound } from "next/navigation";
import { serverFetch } from "@/lib/api/server";

const TYPE_LABEL = {
  GOVERNMENT: "Government",
  PRIVATE: "Private",
  INTERNATIONAL: "International",
};

function getTypeClasses(type) {
  switch (type) {
    case "GOVERNMENT": return "border-cyan-500/30 bg-cyan-500/10 text-cyan-300";
    case "PRIVATE": return "border-violet-500/30 bg-violet-500/10 text-violet-300";
    case "INTERNATIONAL": return "border-amber-500/30 bg-amber-500/10 text-amber-300";
    default: return "border-slate-700 bg-slate-800 text-slate-300";
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const agency = await serverFetch(`/agencies/${slug}`);
  if (!agency) return { title: "Agenzia non trovata" };
  return { title: agency.name, description: agency.description };
}

export default async function AgencyDetailPage({ params }) {
  const { slug } = await params;
  const agency = await serverFetch(`/agencies/${slug}`);

  if (!agency) notFound();

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-slate-800">
        {agency.logoUrl && (
          <div className="absolute inset-0 -z-10">
            <img
              src={agency.logoUrl}
              alt={agency.name}
              className="h-full w-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-slate-950/80" />
          </div>
        )}

        <div className="mx-auto max-w-7xl px-6 py-20">
          <Link
            href="/agencies"
            className="inline-flex items-center text-sm text-cyan-400 transition hover:text-cyan-300"
          >
            ← Torna alle agenzie
          </Link>

          <div className="mt-8 max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              {agency.type && (
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-medium ${getTypeClasses(agency.type)}`}
                >
                  {TYPE_LABEL[agency.type] ?? agency.type}
                </span>
              )}
            </div>

            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
              {agency.name}
            </h1>

            {(agency.country || agency.foundedYear) && (
              <p className="mt-4 text-sm text-slate-400">
                {[agency.country, agency.foundedYear ? `Fondata nel ${agency.foundedYear}` : null]
                  .filter(Boolean)
                  .join(" • ")}
              </p>
            )}

            {agency.description && (
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                {agency.description}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-8">
            {agency.description && (
              <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
                <p className="text-sm font-medium uppercase tracking-[0.25em] text-cyan-400">
                  Panoramica
                </p>
                <p className="mt-4 leading-8 text-slate-300">
                  {agency.description}
                </p>
              </div>
            )}

            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
              <h2 className="text-2xl font-semibold text-white">
                Informazioni generali
              </h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Paese / Area
                  </p>
                  <p className="mt-2 text-sm text-slate-200">
                    {agency.country ?? "—"}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Anno di fondazione
                  </p>
                  <p className="mt-2 text-sm text-slate-200">
                    {agency.foundedYear ?? "—"}
                  </p>
                </div>

                {agency.type && (
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Tipo
                    </p>
                    <p className="mt-2 text-sm text-slate-200">
                      {TYPE_LABEL[agency.type] ?? agency.type}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
              <h2 className="text-xl font-semibold text-white">
                Informazioni chiave
              </h2>

              <div className="mt-6 space-y-5">
                {agency.type && (
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Tipo
                    </p>
                    <p className="mt-2 text-sm text-slate-200">
                      {TYPE_LABEL[agency.type] ?? agency.type}
                    </p>
                  </div>
                )}

                {agency.country && (
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Paese / Area
                    </p>
                    <p className="mt-2 text-sm text-slate-200">
                      {agency.country}
                    </p>
                  </div>
                )}

                {agency.foundedYear && (
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Fondazione
                    </p>
                    <p className="mt-2 text-sm text-slate-200">
                      {agency.foundedYear}
                    </p>
                  </div>
                )}

                {agency.website && (
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
                )}
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
