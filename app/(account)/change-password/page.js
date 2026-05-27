"use client";

import { useState } from "react";
import Link from "next/link";
import { changePassword } from "@/lib/api/profile";

export default function ChangePasswordPage() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.newPassword !== form.confirmPassword) {
      setError("Le password non coincidono.");
      return;
    }

    if (form.newPassword.length < 6) {
      setError("La nuova password deve essere di almeno 6 caratteri.");
      return;
    }

    setLoading(true);
    try {
      await changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });
      setSuccess("Password aggiornata con successo.");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setError(err.message || "Errore durante il cambio password.");
    } finally {
      setLoading(false);
    }
  }

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

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label
                  htmlFor="currentPassword"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Password attuale
                </label>
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={form.currentPassword}
                  onChange={handleChange}
                  placeholder="Inserisci la password attuale"
                  required
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
                  name="newPassword"
                  type="password"
                  value={form.newPassword}
                  onChange={handleChange}
                  placeholder="Inserisci la nuova password"
                  required
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
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Ripeti la nuova password"
                  required
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />
              </div>

              {error && (
                <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {error}
                </div>
              )}

              {success && (
                <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                  {success}
                </div>
              )}

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-60"
                >
                  {loading ? "Salvataggio..." : "Salva nuova password"}
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
