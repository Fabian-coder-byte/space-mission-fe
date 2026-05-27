"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { getOneAgency, updateAgency } from "@/lib/api/agency";
import { useParams, useRouter } from "next/navigation";

const agencyTypeOptions = ["PRIVATE", "GOVERNMENT", "INTERNATIONAL"];

const initialForm = {
  name: "",
  country: "",
  type: "",
  description: "",
  website: "",
  logoUrl: "",
  foundedYear: "",
};

const initialErrors = {
  name: "",
  country: "",
  type: "",
  description: "",
  website: "",
  logoUrl: "",
  foundedYear: "",
};

function isValidUrl(value) {
  if (!value) return true;

  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

function validateForm(form) {
  const errors = { ...initialErrors };

  if (!form.name.trim()) {
    errors.name = "Il nome è obbligatorio";
  } else if (form.name.trim().length < 2) {
    errors.name = "Il nome deve avere almeno 2 caratteri";
  }

  if (form.country && form.country.trim().length < 2) {
    errors.country = "Il country deve avere almeno 2 caratteri";
  }

  if (form.type && !agencyTypeOptions.includes(form.type)) {
    errors.type = "Tipo agenzia non valido";
  }

  if (form.description && form.description.trim().length < 10) {
    errors.description = "La descrizione deve avere almeno 10 caratteri";
  }

  if (form.website && !isValidUrl(form.website)) {
    errors.website = "Inserisci un URL valido";
  }

  if (form.logoUrl && !isValidUrl(form.logoUrl)) {
    errors.logoUrl = "Inserisci un URL valido";
  }

  if (form.foundedYear) {
    const foundedYear = Number(form.foundedYear);
    const currentYear = new Date().getFullYear();

    if (Number.isNaN(foundedYear)) {
      errors.foundedYear = "L'anno deve essere un numero";
    } else if (foundedYear < 1800) {
      errors.foundedYear = "L'anno non può essere minore di 1800";
    } else if (foundedYear > currentYear) {
      errors.foundedYear = "L'anno non può essere nel futuro";
    }
  }

  return errors;
}

function hasErrors(errors) {
  return Object.values(errors).some(Boolean);
}

function FieldError({ message }) {
  if (!message) return null;

  return <p className="mt-2 text-sm text-red-400">{message}</p>;
}

export default function EditAgencyPage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const router = useRouter();

  const id = params.id;

  useEffect(() => {
    async function loadAgency() {
      try {
        setIsLoading(true);

        const data = await getOneAgency(id);

        setForm({
          name: data?.name || "",
          country: data?.country || "",
          type: data?.type || "",
          description: data?.description || "",
          website: data?.website || "",
          logoUrl: data?.logoUrl || "",
          foundedYear: data?.foundedYear ? String(data.foundedYear) : "",
        });
      } catch (error) {
        console.error(error);
        toast.error("Errore durante il caricamento dell'agenzia");
      } finally {
        setIsLoading(false);
      }
    }

    if (id) {
      loadAgency();
    }
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validateForm(form);
    setErrors(validationErrors);

    if (hasErrors(validationErrors)) {
      toast.error("Controlla i campi del form");
      return;
    }

    const payload = {
      name: form.name.trim(),
      type: form.type || null,
      country: form.country.trim() || null,
      description: form.description.trim() || null,
      website: form.website.trim() || null,
      logoUrl: form.logoUrl.trim() || null,
      foundedYear: form.foundedYear ? Number(form.foundedYear) : null,
    };

    try {
      setIsSubmitting(true);

      await updateAgency(id, payload);

      toast.success("Agenzia aggiornata con successo");

      router.push("/admin/agencies");
    } catch (error) {
      console.error(error);
      toast.error("Errore durante l'aggiornamento dell'agenzia");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleReset() {
    async function loadAgency() {
      try {
        setIsLoading(true);

        const data = await getOneAgency(id);

        setForm({
          name: data?.name || "",
          country: data?.country || "",
          type: data?.type || "",
          description: data?.description || "",
          website: data?.website || "",
          logoUrl: data?.logoUrl || "",
          foundedYear: data?.foundedYear ? String(data.foundedYear) : "",
        });
      } catch (error) {
        console.error(error);
        toast.error("Errore durante il caricamento dell'agenzia");
      } finally {
        setIsLoading(false);
      }
    }
    if (id) {
      loadAgency();
    }
    setForm(initialForm);
    setErrors(initialErrors);
  }

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6 text-slate-300">
        Caricamento agenzia...
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
            Modifica agenzia
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Modifica i dati principali dell'agenzia spaziale.
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
              className={`w-full rounded-xl border bg-slate-950 px-4 py-3 text-white outline-none transition ${
                errors.name
                  ? "border-red-500 focus:border-red-400"
                  : "border-slate-700 focus:border-cyan-400"
              }`}
            />

            <FieldError message={errors.name} />
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
              className={`w-full rounded-xl border bg-slate-950 px-4 py-3 text-white outline-none transition ${
                errors.country
                  ? "border-red-500 focus:border-red-400"
                  : "border-slate-700 focus:border-cyan-400"
              }`}
            />

            <FieldError message={errors.country} />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Tipo
            </label>

            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className={`w-full rounded-xl border bg-slate-950 px-4 py-3 text-white outline-none transition ${
                errors.type
                  ? "border-red-500 focus:border-red-400"
                  : "border-slate-700 focus:border-cyan-400"
              }`}
            >
              <option value="">Seleziona tipo</option>

              {agencyTypeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <FieldError message={errors.type} />
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
              min="1800"
              max={new Date().getFullYear()}
              className={`w-full rounded-xl border bg-slate-950 px-4 py-3 text-white outline-none transition ${
                errors.foundedYear
                  ? "border-red-500 focus:border-red-400"
                  : "border-slate-700 focus:border-cyan-400"
              }`}
            />

            <FieldError message={errors.foundedYear} />
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
            className={`w-full rounded-xl border bg-slate-950 px-4 py-3 text-white outline-none transition ${
              errors.description
                ? "border-red-500 focus:border-red-400"
                : "border-slate-700 focus:border-cyan-400"
            }`}
          />

          <FieldError message={errors.description} />
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
              className={`w-full rounded-xl border bg-slate-950 px-4 py-3 text-white outline-none transition ${
                errors.website
                  ? "border-red-500 focus:border-red-400"
                  : "border-slate-700 focus:border-cyan-400"
              }`}
            />

            <FieldError message={errors.website} />
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
              className={`w-full rounded-xl border bg-slate-950 px-4 py-3 text-white outline-none transition ${
                errors.logoUrl
                  ? "border-red-500 focus:border-red-400"
                  : "border-slate-700 focus:border-cyan-400"
              }`}
            />

            <FieldError message={errors.logoUrl} />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Salvataggio..." : "Salva modifiche"}
          </button>

          <button
            type="button"
            onClick={handleReset}
            disabled={isSubmitting}
            className="rounded-xl border border-slate-700 px-5 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Reset
          </button>
        </div>
      </form>
    </>
  );
}
