import Link from "next/link";

export default function NotFound() {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-10 text-center">
      <h1 className="text-3xl font-bold text-white">Razzo non trovato</h1>
      <p className="mt-3 text-sm text-slate-400">
        Il razzo richiesto non esiste oppure non è disponibile.
      </p>

      <Link
        href="/admin/rockets"
        className="mt-6 inline-block rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
      >
        Torna ai razzi
      </Link>
    </div>
  );
}
