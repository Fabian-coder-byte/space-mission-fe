import Link from "next/link";

const launchSite = {
  id: "1",
  name: "Kennedy Space Center LC-39A",
  slug: "kennedy-space-center-lc-39a",
  locationName: "Merritt Island",
  region: "Florida",
  country: "USA",
  padCode: "LC-39A",
  status: "ACTIVE",
  latitude: 28.6084,
  longitude: -80.6043,
  imageUrl:
    "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?auto=format&fit=crop&w=1400&q=80",
  sourceUrl: "https://www.nasa.gov",
  description:
    "Storico sito di lancio situato al Kennedy Space Center, utilizzato per numerose missioni spaziali con equipaggio e senza equipaggio.",
};

export const metadata = {
  title: "Modifica Launch Site",
};

export default function EditLaunchSitePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-4xl px-6 py-10">
        <div className="mb-8">
          <Link
            href={`/admin/launch-sites/${launchSite.id}`}
            className="inline-flex items-center text-sm text-cyan-400 transition hover:text-cyan-300"
          >
            ← Torna al dettaglio
          </Link>

          <p className="mt-4 text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
            Admin Panel
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            Modifica Launch Site
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Aggiorna i dati del sito di lancio selezionato.
          </p>
        </div>

        <form className="space-y-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Informazioni principali
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Modifica i dati base del launch site.
            </p>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Nome
                </label>
                <input
                  type="text"
                  defaultValue={launchSite.name}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Slug
                </label>
                <input
                  type="text"
                  defaultValue={launchSite.slug}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Pad Code
                </label>
                <input
                  type="text"
                  defaultValue={launchSite.padCode}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Stato
                </label>
                <select
                  defaultValue={launchSite.status}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500"
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                  <option value="MAINTENANCE">MAINTENANCE</option>
                </select>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8">
            <h2 className="text-lg font-semibold text-white">Posizione</h2>
            <p className="mt-1 text-sm text-slate-400">
              Aggiorna le informazioni geografiche del sito di lancio.
            </p>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Località
                </label>
                <input
                  type="text"
                  defaultValue={launchSite.locationName}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Regione / Stato
                </label>
                <input
                  type="text"
                  defaultValue={launchSite.region}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Paese
                </label>
                <input
                  type="text"
                  defaultValue={launchSite.country}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Latitudine
                </label>
                <input
                  type="number"
                  step="any"
                  defaultValue={launchSite.latitude}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Longitudine
                </label>
                <input
                  type="number"
                  step="any"
                  defaultValue={launchSite.longitude}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8">
            <h2 className="text-lg font-semibold text-white">
              Dettagli aggiuntivi
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Modifica i campi opzionali del launch site.
            </p>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Immagine URL
                </label>
                <input
                  type="text"
                  defaultValue={launchSite.imageUrl}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Sito ufficiale / Fonte
                </label>
                <input
                  type="text"
                  defaultValue={launchSite.sourceUrl}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Descrizione
                </label>
                <textarea
                  rows={5}
                  defaultValue={launchSite.description}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6">
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
              <button
                type="button"
                className="rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500/20"
              >
                Elimina Launch Site
              </button>

              <div className="flex flex-col-reverse gap-3 sm:flex-row">
                <Link
                  href={`/admin/launch-sites/${launchSite.id}`}
                  className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-sm font-medium text-slate-200 transition hover:bg-slate-700"
                >
                  Annulla
                </Link>

                <button
                  type="submit"
                  className="rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                >
                  Salva modifiche
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}
