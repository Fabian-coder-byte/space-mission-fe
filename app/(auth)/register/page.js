import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl backdrop-blur sm:p-10">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
          Registrazione
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Crea il tuo account
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
          Registrati per seguire le missioni spaziali, salvare i tuoi lanci
          preferiti e accedere alla tua area personale.
        </p>
      </div>

      <form className="space-y-6">
        <div className="grid gap-6">
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Scegli uno username"
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            />
          </div>

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
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Crea una password"
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Conferma password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Ripeti la password"
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            />
          </div>
        </div>

        <label className="flex items-start gap-3 text-sm leading-6 text-slate-300">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-950 text-cyan-500 focus:ring-cyan-400/30"
          />
          <span>
            Accetto i termini e le condizioni e confermo di aver letto la
            privacy policy.
          </span>
        </label>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-2xl bg-cyan-500 px-4 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          Crea account
        </button>
      </form>

      <div className="mt-8 border-t border-slate-800 pt-6 text-center">
        <p className="text-sm text-slate-400">
          Hai già un account?{" "}
          <Link
            href="/login"
            className="font-medium text-cyan-400 transition hover:text-cyan-300"
          >
            Accedi
          </Link>
        </p>
      </div>
    </div>
  );
}
