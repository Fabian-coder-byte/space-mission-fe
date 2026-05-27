import Link from "next/link";
import { serverFetch } from "@/lib/api/server";

export const metadata = {
  title: "Agenzie",
  description: "Esplora le principali agenzie e aziende spaziali del mondo.",
};

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

export default async function AgenciesPage() {
  const agencies = await serverFetch("/agencies") ?? [];

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
        <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Catalogo agenzie
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              {agencies.length} agenzie nel database.
            </p>
          </div>
        </div>

        {agencies.length === 0 ? (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-12 text-center text-slate-400">
            Nessuna agenzia disponibile al momento.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {agencies.map((agency) => (
              <article
                key={agency.id}
                className="group rounded-3xl border border-slate-800 bg-slate-900/50 p-6 transition hover:border-cyan-400/40 hover:bg-slate-900"
              >
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      {agency.type && (
                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-medium ${getTypeClasses(agency.type)}`}
                        >
                          {TYPE_LABEL[agency.type] ?? agency.type}
                        </span>
                      )}
                    </div>

                    <h2 className="mt-4 text-2xl font-semibold text-white transition group-hover:text-cyan-400">
                      {agency.name}
                    </h2>

                    {(agency.country || agency.foundedYear) && (
                      <p className="mt-2 text-sm text-slate-400">
                        {[agency.country, agency.foundedYear ? `Fondata nel ${agency.foundedYear}` : null]
                          .filter(Boolean)
                          .join(" • ")}
                      </p>
                    )}

                    {agency.description && (
                      <p className="mt-4 leading-7 text-slate-300">
                        {agency.description}
                      </p>
                    )}

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
                          Fondazione
                        </p>
                        <p className="mt-2 text-sm text-slate-200">
                          {agency.foundedYear ?? "—"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href={`/agencies/${agency.id}`}
                      className="inline-flex items-center justify-center rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                    >
                      Dettagli agenzia
                    </Link>

                    {agency.website && (
                      <a
                        href={agency.website}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-400"
                      >
                        Sito ufficiale
                      </a>
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
