"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { getOneRocket, updateRocket } from "@/lib/api/rockets";
import { getAgencies } from "@/lib/api/agency";
import { useParams, useRouter } from "next/navigation";
import DeleteRocketButtonList from "@/components/delete-rocket-button-list";

const rocketStatusOptions = ["ACTIVE", "RETIRED", "IN_DEVELOPMENT"];

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

function toDateInputValue(value) {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 10);
}


export default function EditRocketPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const [form, setForm] = useState(initialForm);
  const [agencies, setAgencies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setIsLoading(true);
        const [rocket, agencyList] = await Promise.all([
          getOneRocket(id),
          getAgencies(),
        ]);

        setAgencies(agencyList || []);
        setForm({
          name: rocket.name || "",
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
      } catch (error) {
        console.error(error);
        toast.error("Errore durante il caricamento del razzo");
      } finally {
        setIsLoading(false);
      }
    }

    if (id) load();
  }, [id]);

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
      toast.error("Il nome è obbligatorio");
      return;
    }

    const payload = {
      name: form.name.trim(),
      manufacturer: form.manufacturer.trim() || null,
      description: form.description.trim() || null,
      reusable: form.reusable,
      status: form.status,
      heightMeters: form.heightMeters ? Number(form.heightMeters) : null,
      diameterMeters: form.diameterMeters ? Number(form.diameterMeters) : null,
      massKg: form.massKg ? Number(form.massKg) : null,
      payloadToLeoKg: form.payloadToLeoKg ? Number(form.payloadToLeoKg) : null,
      payloadToGtoKg: form.payloadToGtoKg ? Number(form.payloadToGtoKg) : null,
      firstFlightDate: form.firstFlightDate || null,
      imageUrl: form.imageUrl.trim() || null,
      agencyId: form.agencyId || null,
    };

    try {
      setIsSubmitting(true);
      await updateRocket(id, payload);
      toast.success("Razzo aggiornato con successo");
      router.push(`/admin/rockets/${id}`);
    } catch (error) {
      console.error(error);
      toast.error("Errore durante l'aggiornamento del razzo");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 text-slate-300">
        Caricamento razzo...
      </div>
    );
  }

  return (
    <>
      <div className="mb-3 flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/50 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
            Admin Panel
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white">Modifica razzo</h1>
          <p className="mt-2 text-sm text-slate-400">
            Aggiorna i dati principali del razzo selezionato.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href={`/admin/rockets/${id}`}
            className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
          >
            Torna al dettaglio
          </Link>

          <DeleteRocketButtonList id={id} redirectTo="/admin/rockets" size="md" />
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid gap-6 rounded-3xl border border-slate-800 bg-slate-900/50 p-6"
      >
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

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Manufacturer
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

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Salvataggio..." : "Salva modifiche"}
          </button>

          <Link
            href={`/admin/rockets/${id}`}
            className="rounded-xl border border-slate-700 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            Annulla
          </Link>
        </div>
      </form>
    </>
  );
}
