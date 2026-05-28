"use client";

import { createMission } from "@/lib/api/missions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const missionStatusOptions = [
  "SCHEDULED",
  "CONFIRMED",
  "DELAYED",
  "SCRUBBED",
  "CANCELLED",
  "COMPLETED",
];

const missionTypeOptions = [
  "CREWED",
  "CARGO",
  "SATELLITE",
  "SCIENTIFIC",
  "EXPLORATION",
  "TEST_FLIGHT",
  "RESUPPLY",
  "MILITARY",
];

const initialForm = {
  name: "",
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

export default function NewMissionForm({
  agencies = [],
  rockets = [],
  launchSites = [],
}) {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
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

    if (!form.name.trim()) {
      toast.error("Nome sono obbligatori");
      return;
    }

    const payload = {
      name: form.name.trim(),
      description: form.description.trim() || null,
      missionType: form.missionType || null,
      status: form.status,
      launchDate: form.launchDate || null,
      windowStart: form.windowStart || null,
      windowEnd: form.windowEnd || null,
      destination: form.destination.trim() || null,
      orbit: form.orbit.trim() || null,
      isCrewed: form.isCrewed,
      imageUrl: form.imageUrl.trim() || null,
      detailsUrl: form.detailsUrl.trim() || null,
      agencyId: form.agencyId || null,
      rocketId: form.rocketId || null,
      launchSiteId: form.launchSiteId || null,
    };

    try {
      setIsSaving(true);
      await createMission(payload);
      toast.success("Missione creata con successo");
      router.push("/admin/missions");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Errore durante la creazione della missione");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <>
      <div className="mb-3 flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/50 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
            Admin Panel
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white">Crea missione</h1>
          <p className="mt-2 text-sm text-slate-400">
            Inserisci i dati principali della nuova missione spaziale.
          </p>
        </div>

        <Link
          href="/admin/missions"
          className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
        >
          Torna alla lista
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid gap-6 rounded-3xl border border-slate-800 bg-slate-900/50 p-6"
      >
        <div className="grid gap-4 md:grid-cols-1">
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Nome *
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Es. Artemis II"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Tipo missione
            </label>
            <select
              name="missionType"
              value={form.missionType}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
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
            <label className="mb-2 block text-sm font-medium text-white">
              Stato *
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            >
              {missionStatusOptions.map((status) => (
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
                name="isCrewed"
                checked={form.isCrewed}
                onChange={handleChange}
                className="h-4 w-4"
              />
              <span className="text-sm font-medium">Con equipaggio</span>
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
            rows={5}
            placeholder="Descrizione della missione..."
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Data lancio
            </label>
            <input
              type="datetime-local"
              name="launchDate"
              value={form.launchDate}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Window Start
            </label>
            <input
              type="datetime-local"
              name="windowStart"
              value={form.windowStart}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Window End
            </label>
            <input
              type="datetime-local"
              name="windowEnd"
              value={form.windowEnd}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Destinazione
            </label>
            <input
              type="text"
              name="destination"
              value={form.destination}
              onChange={handleChange}
              placeholder="Es. Moon"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Orbita
            </label>
            <input
              type="text"
              name="orbit"
              value={form.orbit}
              onChange={handleChange}
              placeholder="Es. Low Earth Orbit"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
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
              <option value="">Nessuna</option>
              {agencies.map((agency) => (
                <option key={agency.id} value={agency.id}>
                  {agency.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Razzo
            </label>
            <select
              name="rocketId"
              value={form.rocketId}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            >
              <option value="">Nessuno</option>
              {rockets.map((rocket) => (
                <option key={rocket.id} value={rocket.id}>
                  {rocket.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Launch Site
            </label>
            <select
              name="launchSiteId"
              value={form.launchSiteId}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            >
              <option value="">Nessuno</option>
              {launchSites.map((site) => (
                <option key={site.id} value={site.id}>
                  {site.name}
                </option>
              ))}
            </select>
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
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Details URL
            </label>
            <input
              type="url"
              name="detailsUrl"
              value={form.detailsUrl}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSaving ? "Creazione..." : "Crea missione"}
          </button>

          <button
            type="button"
            onClick={() => setForm(initialForm)}
            disabled={isSaving}
            className="rounded-xl border border-slate-700 px-5 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Reset
          </button>
        </div>
      </form>
    </>
  );
}
