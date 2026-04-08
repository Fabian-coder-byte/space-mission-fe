import Link from "next/link";

export const metadata = {
  title: "Cambia password",
  description: "Aggiorna la password del tuo account.",
};

export default function ChangePasswordPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-slate-800">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
            Sicurezza account
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Cambia password
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Aggiorna la password del tuo account per mantenere il profilo sicuro
            e sotto controllo.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
              <h2 className="text-xl font-semibold text-white">Suggerimenti</h2>

              <div className="mt-5 space-y-4 text-sm leading-7 text-slate-400">
                <p>Usa una password lunga e difficile da indovinare.</p>
                <p>
                  Evita parole semplici, date di nascita o nomi troppo evidenti.
                </p>
                <p>
                  Se puoi, combina lettere maiuscole, minuscole, numeri e
                  simboli.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
              <h2 className="text-xl font-semibold text-white">Navigazione</h2>

              <div className="mt-5 flex flex-col gap-3">
                <Link
                  href="/profile"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-400"
                >
                  Torna al profilo
                </Link>

                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-400"
                >
                  Vai alla dashboard
                </Link>
              </div>
            </div>
          </aside>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                Aggiorna password
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Inserisci la password attuale e scegli una nuova password.
              </p>
            </div>

            <form className="mt-8 space-y-6">
              <div>
                <label
                  htmlFor="currentPassword"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Password attuale
                </label>
                <input
                  id="currentPassword"
                  type="password"
                  placeholder="Inserisci la password attuale"
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />
              </div>

              <div>
                <label
                  htmlFor="newPassword"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Nuova password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  placeholder="Inserisci la nuova password"
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Conferma nuova password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Ripeti la nuova password"
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                >
                  Salva nuova password
                </button>

                <Link
                  href="/profile"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-400"
                >
                  Annulla
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
