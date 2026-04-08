import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl backdrop-blur sm:p-10">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
          Accesso
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Accedi al tuo account
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
          Entra nella tua area personale per salvare missioni preferite, seguire
          i lanci e gestire il tuo profilo.
        </p>
      </div>

      <form className="space-y-6">
        <div className="grid gap-6">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Inserisci la tua email"
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-200"
              >
                Password
              </label>

              <Link
                href="/forgot-password"
                className="text-sm text-cyan-400 transition hover:text-cyan-300"
              >
                Password dimenticata?
              </Link>
            </div>

            <input
              id="password"
              type="password"
              placeholder="Inserisci la tua password"
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <label className="flex items-center gap-3 text-sm text-slate-300">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-600 bg-slate-950 text-cyan-500 focus:ring-cyan-400/30"
            />
            Ricordami
          </label>
        </div>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-2xl bg-cyan-500 px-4 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          Accedi
        </button>
      </form>

      <div className="mt-8 border-t border-slate-800 pt-6 text-center">
        <p className="text-sm text-slate-400">
          Non hai ancora un account?{" "}
          <Link
            href="/register"
            className="font-medium text-cyan-400 transition hover:text-cyan-300"
          >
            Registrati
          </Link>
        </p>
      </div>
    </div>
  );
}
