"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { getOneLaunchSite, updateLaunchSite } from "@/lib/api/launch-sites";
import { useParams, useRouter } from "next/navigation";
import DeleteLaunchSiteButtonList from "@/components/delete-launch-site-button-list";

const initialForm = {
  name: "",
  code: "",
  locationName: "",
  region: "",
  country: "",
  latitude: "",
  longitude: "",
  imageUrl: "",
  description: "",
};

export default function EditLaunchSitePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const [form, setForm] = useState(initialForm);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setIsLoading(true);
        const site = await getOneLaunchSite(id);

        setForm({
          name: site.name || "",
          code: site.code || "",
          locationName: site.locationName || "",
          region: site.region || "",
          country: site.country || "",
          latitude: site.latitude != null ? String(site.latitude) : "",
          longitude: site.longitude != null ? String(site.longitude) : "",
          imageUrl: site.imageUrl || "",
          description: site.description || "",
        });
      } catch (error) {
        console.error(error);
        toast.error("Errore durante il caricamento del launch site");
      } finally {
        setIsLoading(false);
      }
    }

    if (id) load();
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.error("Il nome è obbligatorio");
      return;
    }

    const payload = {
      name: form.name.trim(),
      code: form.code.trim() || null,
      locationName: form.locationName.trim() || null,
      region: form.region.trim() || null,
      country: form.country.trim() || null,
      latitude: form.latitude ? Number(form.latitude) : null,
      longitude: form.longitude ? Number(form.longitude) : null,
      imageUrl: form.imageUrl.trim() || null,
      description: form.description.trim() || null,
    };

    try {
      setIsSubmitting(true);
      await updateLaunchSite(id, payload);
      toast.success("Launch site aggiornato con successo");
      router.push(`/admin/launch-sites/${id}`);
    } catch (error) {
      console.error(error);
      toast.error("Errore durante l'aggiornamento del launch site");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 text-slate-300">
        Caricamento launch site...
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
          <h1 className="mt-2 text-3xl font-bold text-white">
            Modifica launch site
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Aggiorna i dati del sito di lancio selezionato.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href={`/admin/launch-sites/${id}`}
            className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
          >
            Torna al dettaglio
          </Link>

          <DeleteLaunchSiteButtonList id={id} redirectTo="/admin/launch-sites" size="md" />
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
              placeholder="Es. Kennedy Space Center LC-39A"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Codice pad
            </label>
            <input
              type="text"
              name="code"
              value={form.code}
              onChange={handleChange}
              placeholder="Es. LC-39A"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Località
            </label>
            <input
              type="text"
              name="locationName"
              value={form.locationName}
              onChange={handleChange}
              placeholder="Es. Merritt Island"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Regione
            </label>
            <input
              type="text"
              name="region"
              value={form.region}
              onChange={handleChange}
              placeholder="Es. Florida"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Paese
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
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Latitudine
            </label>
            <input
              type="number"
              name="latitude"
              value={form.latitude}
              onChange={handleChange}
              step="any"
              placeholder="Es. 28.6084"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Longitudine
            </label>
            <input
              type="number"
              name="longitude"
              value={form.longitude}
              onChange={handleChange}
              step="any"
              placeholder="Es. -80.6043"
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

        <div>
          <label className="mb-2 block text-sm font-medium text-white">
            Descrizione
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={5}
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
            href={`/admin/launch-sites/${id}`}
            className="rounded-xl border border-slate-700 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            Annulla
          </Link>
        </div>
      </form>
    </>
  );
}
