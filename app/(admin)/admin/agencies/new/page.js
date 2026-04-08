"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const agencyTypeOptions = ["PRIVATE", "GOVERNMENT", "INTERNATIONAL"];

const initialForm = {
  name: "",
  slug: "",
  country: "",
  type: "",
  description: "",
  website: "",
  logoUrl: "",
  foundedYear: "",
};

function generateSlug(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function NewAgencyPage() {
  const router = useRouter();

  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleGenerateSlug() {
    setForm((prev) => ({
      ...prev,
      slug: generateSlug(prev.name),
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name || !form.slug) {
      setError("Nome e slug sono obbligatori.");
      return;
    }

    const payload = {
      ...form,
      type: form.type || null,
      country: form.country || null,
      description: form.description || null,
      website: form.website || null,
      logoUrl: form.logoUrl || null,
      foundedYear: form.foundedYear ? Number(form.foundedYear) : null,
    };

    console.log("Payload nuova agenzia:", payload);

    setSuccess(
      "Agenzia creata correttamente. Per ora il salvataggio è simulato.",
    );

    setTimeout(() => {
      router.push("/admin/agencies");
    }, 1000);
  }

  function handleReset() {
    setForm(initialForm);
    setError("");
    setSuccess("");
  }

  return (
    <main className="space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/50 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
            Admin Panel
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white">Crea agenzia</h1>
          <p className="mt-2 text-sm text-slate-400">
            Inserisci i dati principali della nuova agenzia spaziale.
          </p>
        </div>

        <Link
          href="/admin/agencies"
          className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
        >
          Torna alla lista
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid gap-6 rounded-3xl border border-slate-800 bg-slate-900/50 p-6"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Nome *
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Es. SpaceX"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Slug *
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                placeholder="es. spacex"
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
              />
              <button
                type="button"
                onClick={handleGenerateSlug}
                className="rounded-xl border border-slate-700 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Genera
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Country
            </label>
            <input
              type="text"
              name="country"
              value={form.country}
              onChange={handleChange}
              placeholder="Es. USA"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Tipo
            </label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            >
              <option value="">Seleziona tipo</option>
              {agencyTypeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Anno fondazione
            </label>
            <input
              type="number"
              name="foundedYear"
              value={form.foundedYear}
              onChange={handleChange}
              placeholder="Es. 2002"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-white">
            Descrizione
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={5}
            placeholder="Descrizione dell'agenzia..."
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Website
            </label>
            <input
              type="url"
              name="website"
              value={form.website}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Logo URL
            </label>
            <input
              type="url"
              name="logoUrl"
              value={form.logoUrl}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            />
          </div>
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

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="submit"
            className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Crea agenzia
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="rounded-xl border border-slate-700 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            Reset
          </button>
        </div>
      </form>
    </main>
  );
}
