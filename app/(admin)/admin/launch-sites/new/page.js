import Link from "next/link";

export const metadata = {
  title: "Crea Launch Site",
};

export default function CreateLaunchSitePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-4xl px-6 py-10">
        <div className="mb-8">
          <Link
            href="/admin/launch-sites"
            className="inline-flex items-center text-sm text-cyan-400 transition hover:text-cyan-300"
          >
            ← Torna alla lista launch sites
          </Link>

          <p className="mt-4 text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
            Admin Panel
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            Crea nuovo Launch Site
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Inserisci i dati del nuovo sito di lancio da salvare nel progetto
            Space Mission.
          </p>
        </div>

        <form className="space-y-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Informazioni principali
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Dati base del launch site.
            </p>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Nome
                </label>
                <input
                  type="text"
                  placeholder="Es. Kennedy Space Center LC-39A"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Slug
                </label>
                <input
                  type="text"
                  placeholder="Es. kennedy-space-center-lc-39a"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Pad Code
                </label>
                <input
                  type="text"
                  placeholder="Es. LC-39A"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Stato
                </label>
                <select className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500">
                  <option value="">Seleziona stato</option>
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
              Informazioni geografiche del sito di lancio.
            </p>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Località
                </label>
                <input
                  type="text"
                  placeholder="Es. Merritt Island"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Regione / Stato
                </label>
                <input
                  type="text"
                  placeholder="Es. Florida"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Paese
                </label>
                <input
                  type="text"
                  placeholder="Es. USA"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Coordinate
                </label>
                <input
                  type="text"
                  placeholder="Es. 28.6084, -80.6043"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-500"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8">
            <h2 className="text-lg font-semibold text-white">
              Dettagli aggiuntivi
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Campi opzionali per arricchire la scheda del sito.
            </p>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Immagine URL
                </label>
                <input
                  type="text"
                  placeholder="https://..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Sito ufficiale / Fonte
                </label>
                <input
                  type="text"
                  placeholder="https://..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-slate-200">
                  Descrizione
                </label>
                <textarea
                  rows={5}
                  placeholder="Descrizione del launch site..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-500"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6">
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Link
                href="/admin/launch-sites"
                className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-800 px-5 py-3 text-sm font-medium text-slate-200 transition hover:bg-slate-700"
              >
                Annulla
              </Link>

              <button
                type="submit"
                className="rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Salva Launch Site
              </button>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}
