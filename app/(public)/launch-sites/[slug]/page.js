import Link from "next/link";
import { notFound } from "next/navigation";
import { serverFetch } from "@/lib/api/server";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const site = await serverFetch(`/launch-sites/${slug}`);
  if (!site) return { title: "Sito di lancio non trovato" };
  return { title: site.name, description: site.description };
}

export default async function LaunchSiteDetailPage({ params }) {
  const { slug } = await params;
  const site = await serverFetch(`/launch-sites/${slug}`);

  if (!site) notFound();

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-slate-800">
        {site.imageUrl && (
          <div className="absolute inset-0 -z-10">
            <img
              src={site.imageUrl}
              alt={site.name}
              className="h-full w-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-slate-950/80" />
          </div>
        )}

        <div className="mx-auto max-w-7xl px-6 py-20">
          <Link
            href="/launch-sites"
            className="inline-flex items-center text-sm text-cyan-400 transition hover:text-cyan-300"
          >
            ← Torna ai launch sites
          </Link>

          <div className="mt-8 max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              {site.code && (
                <span className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-medium text-slate-300">
                  {site.code}
                </span>
              )}
            </div>

            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
              {site.name}
            </h1>

            {(site.locationName || site.region || site.country) && (
              <p className="mt-4 text-sm text-slate-400">
                {[site.locationName, site.region, site.country]
                  .filter(Boolean)
                  .join(", ")}
              </p>
            )}

            {site.description && (
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
                {site.description}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-8">
            {site.description && (
              <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
                <p className="text-sm font-medium uppercase tracking-[0.25em] text-cyan-400">
                  Panoramica
                </p>
                <p className="mt-4 leading-8 text-slate-300">
                  {site.description}
                </p>
              </div>
            )}

            {(site.latitude != null || site.longitude != null) && (
              <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
                <h2 className="text-2xl font-semibold text-white">
                  Coordinate e posizione
                </h2>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Latitudine
                    </p>
                    <p className="mt-2 text-sm text-slate-200">
                      {site.latitude ?? "—"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Longitudine
                    </p>
                    <p className="mt-2 text-sm text-slate-200">
                      {site.longitude ?? "—"}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
              <h2 className="text-xl font-semibold text-white">
                Informazioni chiave
              </h2>

              <div className="mt-6 space-y-5">
                {site.code && (
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Codice
                    </p>
                    <p className="mt-2 text-sm text-slate-200">{site.code}</p>
                  </div>
                )}

                {site.locationName && (
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Località
                    </p>
                    <p className="mt-2 text-sm text-slate-200">
                      {site.locationName}
                    </p>
                  </div>
                )}

                {site.region && (
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Regione
                    </p>
                    <p className="mt-2 text-sm text-slate-200">{site.region}</p>
                  </div>
                )}

                {site.country && (
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Paese
                    </p>
                    <p className="mt-2 text-sm text-slate-200">{site.country}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
              <h2 className="text-xl font-semibold text-white">Navigazione</h2>

              <div className="mt-5 flex flex-col gap-3">
                <Link
                  href="/launch-sites"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-700 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-cyan-400 hover:text-cyan-400"
                >
                  Tutti i launch sites
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
