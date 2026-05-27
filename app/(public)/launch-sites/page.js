import Link from "next/link";
import { serverFetch } from "@/lib/api/server";

export const metadata = {
  title: "Launch Sites",
  description: "Esplora i principali siti di lancio spaziale nel mondo.",
};

export default async function LaunchSitesPage() {
  const sites = await serverFetch("/launch-sites") ?? [];

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
        <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Catalogo launch sites
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              {sites.length} siti di lancio nel database.
            </p>
          </div>
        </div>

        {sites.length === 0 ? (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-12 text-center text-slate-400">
            Nessun sito di lancio disponibile al momento.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {sites.map((site) => (
              <article
                key={site.id}
                className="group rounded-3xl border border-slate-800 bg-slate-900/50 p-6 transition hover:border-cyan-400/40 hover:bg-slate-900"
              >
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      {site.code && (
                        <span className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">
                          {site.code}
                        </span>
                      )}
                    </div>

                    <h2 className="mt-4 text-2xl font-semibold text-white transition group-hover:text-cyan-400">
                      {site.name}
                    </h2>

                    {(site.locationName || site.region || site.country) && (
                      <p className="mt-2 text-sm text-slate-400">
                        {[site.locationName, site.region, site.country]
                          .filter(Boolean)
                          .join(", ")}
                      </p>
                    )}

                    {site.description && (
                      <p className="mt-4 leading-7 text-slate-300">
                        {site.description}
                      </p>
                    )}

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                          Regione
                        </p>
                        <p className="mt-2 text-sm text-slate-200">
                          {site.region ?? "—"}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                          Paese
                        </p>
                        <p className="mt-2 text-sm text-slate-200">
                          {site.country ?? "—"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Link
                      href={`/launch-sites/${site.id}`}
                      className="inline-flex items-center justify-center rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                    >
                      Dettagli sito
                    </Link>
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
