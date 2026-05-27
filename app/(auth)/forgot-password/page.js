"use client";

import { forgotPasswordApi } from "@/lib/api/auth";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);

    try {
      await forgotPasswordApi({ email: email.trim() });
      setSent(true);
      toast.success("Email di recupero inviata!");
    } catch (error) {
      toast.error(error.message || "Errore durante il recupero password");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl backdrop-blur sm:p-10">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
          Recupero account
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Hai dimenticato la password?
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
          Inserisci la tua email e ti invieremo le istruzioni per reimpostare la
          password del tuo account.
        </p>
      </div>

      {sent ? (
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-6 text-center">
          <p className="font-medium text-emerald-300">Email inviata!</p>
          <p className="mt-2 text-sm text-slate-400">
            Controlla la tua casella di posta e segui le istruzioni per
            reimpostare la password.
          </p>
          <Link
            href="/login"
            className="mt-4 inline-block font-medium text-cyan-400 transition hover:text-cyan-300"
          >
            Torna al login
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Inserisci la tua email"
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex w-full items-center justify-center rounded-2xl bg-cyan-500 px-4 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Invio in corso..." : "Invia link di recupero"}
          </button>
        </form>
      )}

      <div className="mt-8 border-t border-slate-800 pt-6 text-center">
        <p className="text-sm text-slate-400">
          Ti sei ricordato la password?{" "}
          <Link
            href="/login"
            className="font-medium text-cyan-400 transition hover:text-cyan-300"
          >
            Torna al login
          </Link>
        </p>
      </div>
    </div>
  );
}
