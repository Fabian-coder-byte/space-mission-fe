"use client";

import { resetPasswordApi } from "@/lib/api/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [tokens, setTokens] = useState({ accessToken: "", refreshToken: "" });
  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");

    if (accessToken && refreshToken) {
      setTokens({ accessToken, refreshToken });
      setHasToken(true);
    }
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Le password non coincidono");
      return;
    }

    if (form.password.length < 6) {
      toast.error("La password deve essere di almeno 6 caratteri");
      return;
    }

    setIsLoading(true);

    try {
      await resetPasswordApi({
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        newPassword: form.password,
      });

      toast.success("Password aggiornata con successo");
      router.push("/login");
    } catch (error) {
      toast.error(error.message || "Errore durante il reset della password");
    } finally {
      setIsLoading(false);
    }
  }

  if (!hasToken) {
    return (
      <div className="w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl backdrop-blur sm:p-10">
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
            Nuova password
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Link non valido
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-400">
            Questo link di reset non è valido o è scaduto. Richiedi un nuovo
            link dalla pagina di recupero password.
          </p>
        </div>
        <Link
          href="/forgot-password"
          className="inline-flex w-full items-center justify-center rounded-2xl bg-cyan-500 px-4 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          Richiedi nuovo link
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl backdrop-blur sm:p-10">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
          Nuova password
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Reimposta la password
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
          Inserisci una nuova password per il tuo account. Scegline una sicura,
          facile da ricordare per te e difficile da indovinare per il resto
          della galassia.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6">
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Nuova password *
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
              placeholder="Inserisci la nuova password"
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Conferma password *
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Ripeti la nuova password"
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex w-full items-center justify-center rounded-2xl bg-cyan-500 px-4 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Salvataggio..." : "Salva nuova password"}
        </button>
      </form>

      <div className="mt-8 border-t border-slate-800 pt-6 text-center">
        <p className="text-sm text-slate-400">
          Vuoi tornare al login?{" "}
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
