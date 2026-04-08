"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const rocketStatusOptions = ["ACTIVE", "RETIRED", "DEVELOPMENT"];

const agencies = [
  {
    id: "cmnpt63090000rg3ax3ett97c",
    name: "SpaceX",
  },
  {
    id: "cmnpt63090000rg3ax3ett97d",
    name: "NASA",
  },
  {
    id: "cmnpt63090000rg3ax3ett97e",
    name: "ESA",
  },
];

const initialForm = {
  name: "",
  slug: "",
  manufacturer: "",
  description: "",
  reusable: false,
  status: "ACTIVE",
  heightMeters: "",
  diameterMeters: "",
  massKg: "",
  payloadToLeoKg: "",
  payloadToGtoKg: "",
  firstFlightDate: "",
  imageUrl: "",
  agencyId: "",
};

function generateSlug(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function NewRocketPage() {
  const router = useRouter();

  const [form, setForm] = useState(initialForm);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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

    if (!form.name || !form.slug || !form.manufacturer || !form.agencyId) {
      setError("Compila tutti i campi obbligatori.");
      return;
    }

    const payload = {
      ...form,
      heightMeters: form.heightMeters ? Number(form.heightMeters) : null,
      diameterMeters: form.diameterMeters ? Number(form.diameterMeters) : null,
      massKg: form.massKg ? Number(form.massKg) : null,
      payloadToLeoKg: form.payloadToLeoKg ? Number(form.payloadToLeoKg) : null,
      payloadToGtoKg: form.payloadToGtoKg ? Number(form.payloadToGtoKg) : null,
      firstFlightDate: form.firstFlightDate || null,
      description: form.description || null,
      imageUrl: form.imageUrl || null,
    };

    console.log("Payload nuovo razzo:", payload);

    setSuccess(
      "Razzo creato correttamente. Per ora il salvataggio è simulato.",
    );

    setTimeout(() => {
      router.push("/admin/rockets");
    }, 1000);
  }

  return (
    <main className="space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/50 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
            Admin Panel
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white">Crea razzo</h1>
          <p className="mt-2 text-sm text-slate-400">
            Inserisci i dati principali del nuovo razzo.
          </p>
        </div>

        <Link
          href="/admin/rockets"
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
              placeholder="Es. Falcon 9"
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
                placeholder="es. falcon-9"
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
              Manufacturer *
            </label>
            <input
              type="text"
              name="manufacturer"
              value={form.manufacturer}
              onChange={handleChange}
              placeholder="Es. SpaceX"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Status *
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            >
              {rocketStatusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <label className="flex w-full items-center gap-3 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white">
              <input
                type="checkbox"
                name="reusable"
                checked={form.reusable}
                onChange={handleChange}
                className="h-4 w-4"
              />
              <span className="text-sm font-medium">Riutilizzabile</span>
            </label>
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
            rows={4}
            placeholder="Descrizione del razzo..."
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Altezza (m)
            </label>
            <input
              type="number"
              name="heightMeters"
              value={form.heightMeters}
              onChange={handleChange}
              placeholder="70"
              step="0.1"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Diametro (m)
            </label>
            <input
              type="number"
              name="diameterMeters"
              value={form.diameterMeters}
              onChange={handleChange}
              placeholder="3.7"
              step="0.1"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Massa (kg)
            </label>
            <input
              type="number"
              name="massKg"
              value={form.massKg}
              onChange={handleChange}
              placeholder="549054"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Payload LEO (kg)
            </label>
            <input
              type="number"
              name="payloadToLeoKg"
              value={form.payloadToLeoKg}
              onChange={handleChange}
              placeholder="22800"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Payload GTO (kg)
            </label>
            <input
              type="number"
              name="payloadToGtoKg"
              value={form.payloadToGtoKg}
              onChange={handleChange}
              placeholder="8300"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Primo volo
            </label>
            <input
              type="date"
              name="firstFlightDate"
              value={form.firstFlightDate}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Image URL
            </label>
            <input
              type="url"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Agenzia *
            </label>
            <select
              name="agencyId"
              value={form.agencyId}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            >
              <option value="">Seleziona agenzia</option>
              {agencies.map((agency) => (
                <option key={agency.id} value={agency.id}>
                  {agency.name}
                </option>
              ))}
            </select>
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
            Crea razzo
          </button>

          <button
            type="button"
            onClick={() => {
              setForm(initialForm);
              setError("");
              setSuccess("");
            }}
            className="rounded-xl border border-slate-700 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            Reset
          </button>
        </div>
      </form>
    </main>
  );
}
