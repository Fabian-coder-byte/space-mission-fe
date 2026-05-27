"use client";

import { registerApi } from "@/lib/api/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

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
      await registerApi({
        email: form.email.trim(),
        password: form.password,
        username: form.username.trim() || undefined,
      });

      toast.success(
        "Registrazione completata! Controlla la tua email per confermare l'account.",
      );
      router.push("/login");
    } catch (error) {
      toast.error(error.message || "Errore durante la registrazione");
    } finally {
      setIsLoading(false);
    }
  }

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

      <form onSubmit={handleSubmit} className="space-y-6">
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
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              placeholder="Scegli uno username"
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="Inserisci la tua email"
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Password *
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
              placeholder="Crea una password (min. 6 caratteri)"
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
              placeholder="Ripeti la password"
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex w-full items-center justify-center rounded-2xl bg-cyan-500 px-4 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Creazione account..." : "Crea account"}
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
