"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

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

function toDatetimeLocal(value) {
  if (!value) return "";
  const date = new Date(value);
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60000);
  return localDate.toISOString().slice(0, 16);
}

export default function EditMissionPage() {
  const params = useParams();
  const router = useRouter();
  const missionId = params.id;

  const [form, setForm] = useState(initialForm);
  const [loadingMission, setLoadingMission] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function fetchMission() {
      try {
        setLoadingMission(true);
        setError("");

        const res = await fetch(
          `${process.env.API_URL}/missions/${missionId}`,
          { cache: "no-store" },
        );

        if (res.status === 404) {
          setError("Missione non trovata");
          return;
        }

        if (!res.ok) {
          throw new Error("Errore nel recupero della missione");
        }

        const mission = await res.json();

        setForm({
          name: mission.name || "",
          slug: mission.slug || "",
          description: mission.description || "",
          missionType: mission.missionType || "",
          status: mission.status || "SCHEDULED",
          launchDate: toDatetimeLocal(mission.launchDate),
          windowStart: toDatetimeLocal(mission.windowStart),
          windowEnd: toDatetimeLocal(mission.windowEnd),
          destination: mission.destination || "",
          orbit: mission.orbit || "",
          isCrewed: Boolean(mission.isCrewed),
          imageUrl: mission.imageUrl || "",
          detailsUrl: mission.detailsUrl || "",
          agencyId: mission.agencyId || "",
          rocketId: mission.rocketId || "",
          launchSiteId: mission.launchSiteId || "",
        });
      } catch (err) {
        setError(err.message || "Errore durante il caricamento");
      } finally {
        setLoadingMission(false);
      }
    }

    if (missionId) {
      fetchMission();
    }
  }, [missionId]);

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

  function handleGenerateSlug() {
    setForm((prev) => ({
      ...prev,
      slug: generateSlug(prev.name),
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        ...form,
        missionType: form.missionType || null,
        description: form.description || null,
        launchDate: form.launchDate || null,
        windowStart: form.windowStart || null,
        windowEnd: form.windowEnd || null,
        destination: form.destination || null,
        orbit: form.orbit || null,
        imageUrl: form.imageUrl || null,
        detailsUrl: form.detailsUrl || null,
      };

      const res = await fetch(`${process.env.API_URL}/missions/${missionId}`, {
        method: "PUT", // oppure PATCH se la tua API usa patch
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Errore durante il salvataggio");
      }

      setSuccess("Missione aggiornata con successo");

      setTimeout(() => {
        router.push(`/admin/missions/${missionId}`);
      }, 1000);
    } catch (err) {
      setError(err.message || "Errore durante il salvataggio");
    } finally {
      setSaving(false);
    }
  }

  if (loadingMission) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-8">
        <p className="text-sm text-slate-300">Caricamento missione...</p>
      </div>
    );
  }

  if (error && !form.name) {
    return (
      <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-8">
        <h1 className="text-2xl font-bold text-white">Errore</h1>
        <p className="mt-3 text-sm text-red-200">{error}</p>
        <Link
          href="/admin/missions"
          className="mt-6 inline-block rounded-xl bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          Torna alle missioni
        </Link>
      </div>
    );
  }

  return (
    <main className="space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/50 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
            Edit Mission
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white">
            Modifica missione
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Aggiorna i dati della missione selezionata.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href={`/admin/missions/${missionId}`}
            className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
          >
            Torna al dettaglio
          </Link>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid gap-6 rounded-3xl border border-slate-800 bg-slate-900/50 p-6"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">Nome *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Slug *</label>
            <div className="flex gap-2">
              <input
                type="text"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-cyan-400"
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

        <div>
          <label className="mb-2 block text-sm font-medium">Descrizione</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={5}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-cyan-400"
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
            <label className="mb-2 block text-sm font-medium">Status *</label>
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
            <label className="flex w-full items-center gap-3 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3">
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
            <label className="mb-2 block text-sm font-medium">Window End</label>
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
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">Image URL</label>
            <input
              type="url"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-cyan-400"
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
            disabled={saving}
            className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Salvataggio..." : "Salva modifiche"}
          </button>

          <Link
            href={`/admin/missions/${missionId}`}
            className="rounded-xl border border-slate-700 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            Annulla
          </Link>
        </div>
      </form>
    </main>
  );
}
