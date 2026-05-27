"use client";

import { createRocket } from "@/lib/api/rockets";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const rocketStatusOptions = ["ACTIVE", "RETIRED", "DEVELOPMENT"];

const initialForm = {
  name: "",
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

function toNumberOrUndefined(value) {
  if (value === "" || value === null || value === undefined) {
    return undefined;
  }

  return Number(value);
}

function toStringOrUndefined(value) {
  if (!value || !value.trim()) {
    return undefined;
  }

  return value.trim();
}

export default function NewRocketForm({ agencies = [] }) {
  const router = useRouter();

  const [form, setForm] = useState(initialForm);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!form.name.trim()) {
      setError("Il nome del razzo è obbligatorio.");
      return;
    }

    const payload = {
      name: form.name.trim(),
      manufacturer: toStringOrUndefined(form.manufacturer),
      description: toStringOrUndefined(form.description),
      reusable: form.reusable,
      status: form.status,
      heightMeters: toNumberOrUndefined(form.heightMeters),
      diameterMeters: toNumberOrUndefined(form.diameterMeters),
      massKg: toNumberOrUndefined(form.massKg),
      payloadToLeoKg: toNumberOrUndefined(form.payloadToLeoKg),
      payloadToGtoKg: toNumberOrUndefined(form.payloadToGtoKg),
      firstFlightDate: form.firstFlightDate || undefined,
      imageUrl: toStringOrUndefined(form.imageUrl),
      agencyId: form.agencyId || undefined,
    };

    try {
      setIsSaving(true);

      await createRocket(payload);

      setSuccess("Razzo creato correttamente.");

      router.push("/admin/rockets");
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("Errore durante la creazione del razzo.");
    } finally {
      setIsSaving(false);
    }
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
            Inserisci i dati tecnici e operativi del nuovo razzo.
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
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Manufacturer
            </label>

            <input
              type="text"
              name="manufacturer"
              value={form.manufacturer}
              onChange={handleChange}
              placeholder="Es. SpaceX"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Status
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

          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Agenzia
            </label>

            <select
              name="agencyId"
              value={form.agencyId}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            >
              <option value="">Nessuna agenzia</option>

              {agencies.map((agency) => (
                <option key={agency.id} value={agency.id}>
                  {agency.name}
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
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Altezza, metri
            </label>

            <input
              type="number"
              name="heightMeters"
              value={form.heightMeters}
              onChange={handleChange}
              placeholder="70"
              step="0.1"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Diametro, metri
            </label>

            <input
              type="number"
              name="diameterMeters"
              value={form.diameterMeters}
              onChange={handleChange}
              placeholder="3.7"
              step="0.1"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Massa, kg
            </label>

            <input
              type="number"
              name="massKg"
              value={form.massKg}
              onChange={handleChange}
              placeholder="549054"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Payload LEO, kg
            </label>

            <input
              type="number"
              name="payloadToLeoKg"
              value={form.payloadToLeoKg}
              onChange={handleChange}
              placeholder="22800"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Payload GTO, kg
            </label>

            <input
              type="number"
              name="payloadToGtoKg"
              value={form.payloadToGtoKg}
              onChange={handleChange}
              placeholder="8300"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
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
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
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

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSaving ? "Salvataggio..." : "Crea razzo"}
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
