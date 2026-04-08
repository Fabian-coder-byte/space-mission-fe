"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { notFound, useParams, useRouter } from "next/navigation";

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

const rockets = [
  {
    id: "cmnpuf4pq0001te3am0gu9qv4",
    name: "Falcon 9",
    slug: "falcon-9",
    manufacturer: "SpaceX",
    description: "Razzo riutilizzabile a due stadi",
    reusable: true,
    status: "ACTIVE",
    heightMeters: 70,
    diameterMeters: 3.7,
    massKg: 549054,
    payloadToLeoKg: 22800,
    payloadToGtoKg: 8300,
    firstFlightDate: "2010-06-04T00:00:00.000Z",
    imageUrl: "https://example.com/falcon9.jpg",
    agencyId: "cmnpt63090000rg3ax3ett97c",
    createdAt: "2026-04-08T09:25:52.670Z",
    updatedAt: "2026-04-08T09:25:52.670Z",
    agency: {
      id: "cmnpt63090000rg3ax3ett97c",
      name: "Space X1234dsfdddfdsfdgfdsdd",
      slug: "space-xssdsdsddsdsdfdf232323",
    },
    missions: [],
  },
];

function toDateInputValue(value) {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 10);
}

function generateSlug(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function EditRocketPage() {
  const params = useParams();
  const router = useRouter();

  const rocket = useMemo(
    () => rockets.find((item) => item.id === params.id),
    [params.id],
  );

  if (!rocket) {
    notFound();
  }

  const [form, setForm] = useState({
    name: rocket.name || "",
    slug: rocket.slug || "",
    manufacturer: rocket.manufacturer || "",
    description: rocket.description || "",
    reusable: Boolean(rocket.reusable),
    status: rocket.status || "ACTIVE",
    heightMeters: rocket.heightMeters?.toString() || "",
    diameterMeters: rocket.diameterMeters?.toString() || "",
    massKg: rocket.massKg?.toString() || "",
    payloadToLeoKg: rocket.payloadToLeoKg?.toString() || "",
    payloadToGtoKg: rocket.payloadToGtoKg?.toString() || "",
    firstFlightDate: toDateInputValue(rocket.firstFlightDate),
    imageUrl: rocket.imageUrl || "",
    agencyId: rocket.agencyId || "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

    console.log("Payload update razzo:", payload);

    setSuccess(
      "Razzo aggiornato correttamente. Per ora il salvataggio è simulato.",
    );

    setTimeout(() => {
      router.push(`/admin/rockets/${rocket.id}`);
    }, 1000);
  }

  return (
    <main className="space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/50 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
            Edit Rocket
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white">Modifica razzo</h1>
          <p className="mt-2 text-sm text-slate-400">
            Aggiorna i dati principali del razzo selezionato.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href={`/admin/rockets/${rocket.id}`}
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
            <label className="mb-2 block text-sm font-medium text-white">
              Nome *
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
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
            Salva modifiche
          </button>

          <Link
            href={`/admin/rockets/${rocket.id}`}
            className="rounded-xl border border-slate-700 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            Annulla
          </Link>
        </div>
      </form>
    </main>
  );
}
