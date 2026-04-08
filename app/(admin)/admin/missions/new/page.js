"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const missionStatusOptions = [
  "SCHEDULED",
  "PLANNED",
  "LAUNCHED",
  "COMPLETED",
  "DELAYED",
  "CANCELED",
  "FAILED",
];

const missionTypeOptions = [
  "ORBITAL",
  "SUBORBITAL",
  "LUNAR",
  "PLANETARY",
  "CREWED",
  "CARGO",
  "SPACE_STATION",
  "TELESCOPE",
  "TEST_FLIGHT",
];

const initialForm = {
  name: "",
  slug: "",
  description: "",
  missionType: "",
  status: "SCHEDULED",
  launchDate: "",
  windowStart: "",
  windowEnd: "",
  destination: "",
  orbit: "",
  isCrewed: false,
  imageUrl: "",
  detailsUrl: "",
  agencyId: "",
  rocketId: "",
  launchSiteId: "",
};

export default function NewMissionPage() {
  const router = useRouter();

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function generateSlug(value) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  function handleNameBlur() {
    if (!form.slug && form.name) {
      setForm((prev) => ({
        ...prev,
        slug: generateSlug(prev.name),
      }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        ...form,
        missionType: form.missionType || null,
        launchDate: form.launchDate || null,
        windowStart: form.windowStart || null,
        windowEnd: form.windowEnd || null,
        description: form.description || null,
        destination: form.destination || null,
        orbit: form.orbit || null,
        imageUrl: form.imageUrl || null,
        detailsUrl: form.detailsUrl || null,
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/missions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}` // se usi auth
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.message || "Errore durante la creazione della missione",
        );
      }

      setSuccess("Missione creata con successo");
      setForm(initialForm);

      setTimeout(() => {
        router.push("/admin/missions");
      }, 1200);
    } catch (err) {
      setError(err.message || "Si è verificato un errore");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-400">
            Admin Panel
          </p>
          <h1 className="mt-2 text-3xl font-bold md:text-4xl">
            Crea nuova missione
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-300">
            Inserisci i dati principali della missione spaziale e salvala nel
            sistema.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Nome *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                onBlur={handleNameBlur}
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-cyan-400"
                placeholder="Es. Artemis II"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Slug *</label>
              <input
                type="text"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-cyan-400"
                placeholder="es. artemis-ii"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Descrizione
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={5}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-cyan-400"
              placeholder="Descrizione della missione..."
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Tipo missione
              </label>
              <select
                name="missionType"
                value={form.missionType}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-cyan-400"
              >
                <option value="">Seleziona tipo</option>
                {missionTypeOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Stato *</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-cyan-400"
              >
                {missionStatusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3">
                <input
                  type="checkbox"
                  name="isCrewed"
                  checked={form.isCrewed}
                  onChange={handleChange}
                  className="h-4 w-4"
                />
                <span className="text-sm font-medium">
                  Missione con equipaggio
                </span>
              </label>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Launch Date
              </label>
              <input
                type="datetime-local"
                name="launchDate"
                value={form.launchDate}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Window Start
              </label>
              <input
                type="datetime-local"
                name="windowStart"
                value={form.windowStart}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Window End
              </label>
              <input
                type="datetime-local"
                name="windowEnd"
                value={form.windowEnd}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Destinazione
              </label>
              <input
                type="text"
                name="destination"
                value={form.destination}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-cyan-400"
                placeholder="Es. Moon"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Orbita</label>
              <input
                type="text"
                name="orbit"
                value={form.orbit}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-cyan-400"
                placeholder="Es. Low Earth Orbit"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Image URL
              </label>
              <input
                type="url"
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-cyan-400"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Details URL
              </label>
              <input
                type="url"
                name="detailsUrl"
                value={form.detailsUrl}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-cyan-400"
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Agency ID *
              </label>
              <input
                type="text"
                name="agencyId"
                value={form.agencyId}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-cyan-400"
                placeholder="ID agenzia"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Rocket ID *
              </label>
              <input
                type="text"
                name="rocketId"
                value={form.rocketId}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-cyan-400"
                placeholder="ID razzo"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Launch Site ID *
              </label>
              <input
                type="text"
                name="launchSiteId"
                value={form.launchSiteId}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-cyan-400"
                placeholder="ID sito di lancio"
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
              disabled={loading}
              className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creazione..." : "Crea missione"}
            </button>

            <button
              type="button"
              onClick={() => setForm(initialForm)}
              className="rounded-xl border border-slate-700 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
            >
              Reset
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
