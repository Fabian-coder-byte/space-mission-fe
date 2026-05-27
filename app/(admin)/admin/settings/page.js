"use client";

import { useEffect, useState } from "react";
import { getSiteSettings, updateSiteSettings } from "@/lib/api/site-settings";

const emptyForm = {
  siteName: "",
  siteDescription: "",
  logoUrl: "",
  contactEmail: "",
  supportEmail: "",
  facebookUrl: "",
  instagramUrl: "",
  xUrl: "",
  youtubeUrl: "",
  showUpcomingMissionsOnHome: true,
  showAgenciesOnHome: true,
  showRocketsOnHome: true,
  maintenanceMode: false,
  allowRegistrations: true,
  footerText: "",
};

function SectionCard({ title, description, children }) {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        {description && (
          <p className="mt-2 text-sm text-slate-400">{description}</p>
        )}
      </div>
      <div className="grid gap-4">{children}</div>
    </section>
  );
}

export default function AdminSettingsPage() {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await getSiteSettings();
        setForm({
          siteName: data.siteName ?? "",
          siteDescription: data.siteDescription ?? "",
          logoUrl: data.logoUrl ?? "",
          contactEmail: data.contactEmail ?? "",
          supportEmail: data.supportEmail ?? "",
          facebookUrl: data.facebookUrl ?? "",
          instagramUrl: data.instagramUrl ?? "",
          xUrl: data.xUrl ?? "",
          youtubeUrl: data.youtubeUrl ?? "",
          showUpcomingMissionsOnHome: data.showUpcomingMissionsOnHome ?? true,
          showAgenciesOnHome: data.showAgenciesOnHome ?? true,
          showRocketsOnHome: data.showRocketsOnHome ?? true,
          maintenanceMode: data.maintenanceMode ?? false,
          allowRegistrations: data.allowRegistrations ?? true,
          footerText: data.footerText ?? "",
        });
      } catch {
        setError("Impossibile caricare le impostazioni.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

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

    if (!form.siteName || !form.contactEmail) {
      setError("Nome sito e email contatto sono obbligatori.");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...form,
        logoUrl: form.logoUrl || undefined,
        supportEmail: form.supportEmail || undefined,
        facebookUrl: form.facebookUrl || undefined,
        instagramUrl: form.instagramUrl || undefined,
        xUrl: form.xUrl || undefined,
        youtubeUrl: form.youtubeUrl || undefined,
        footerText: form.footerText || undefined,
      };
      await updateSiteSettings(payload);
      setSuccess("Impostazioni salvate correttamente.");
    } catch (err) {
      setError(err.message || "Errore durante il salvataggio.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-[40vh] items-center justify-center text-slate-400">
        Caricamento impostazioni...
      </main>
    );
  }

  return (
    <main className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
        <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
          Admin Panel
        </p>
        <h1 className="mt-2 text-3xl font-bold text-white">
          Impostazioni sito
        </h1>
        <p className="mt-3 text-sm text-slate-400">
          Configura i contenuti principali e il comportamento generale del sito.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <SectionCard
          title="Informazioni generali"
          description="Impostazioni base del brand e del sito pubblico."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Nome sito *
              </label>
              <input
                type="text"
                name="siteName"
                value={form.siteName}
                onChange={handleChange}
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

          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Descrizione sito
            </label>
            <textarea
              name="siteDescription"
              value={form.siteDescription}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            />
          </div>
        </SectionCard>

        <SectionCard
          title="Contatti"
          description="Email principali mostrate o usate dal sito."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Email contatto *
              </label>
              <input
                type="email"
                name="contactEmail"
                value={form.contactEmail}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Email supporto
              </label>
              <input
                type="email"
                name="supportEmail"
                value={form.supportEmail}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
              />
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Social e link esterni"
          description="Collegamenti ai profili ufficiali."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Facebook URL
              </label>
              <input
                type="url"
                name="facebookUrl"
                value={form.facebookUrl}
                onChange={handleChange}
                placeholder="https://facebook.com/..."
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Instagram URL
              </label>
              <input
                type="url"
                name="instagramUrl"
                value={form.instagramUrl}
                onChange={handleChange}
                placeholder="https://instagram.com/..."
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                X / Twitter URL
              </label>
              <input
                type="url"
                name="xUrl"
                value={form.xUrl}
                onChange={handleChange}
                placeholder="https://x.com/..."
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                YouTube URL
              </label>
              <input
                type="url"
                name="youtubeUrl"
                value={form.youtubeUrl}
                onChange={handleChange}
                placeholder="https://youtube.com/..."
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
              />
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Homepage"
          description="Controlla quali sezioni mostrare nella home pubblica."
        >
          <label className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3">
            <input
              type="checkbox"
              name="showUpcomingMissionsOnHome"
              checked={form.showUpcomingMissionsOnHome}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <span className="text-sm font-medium text-white">
              Mostra missioni imminenti in homepage
            </span>
          </label>

          <label className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3">
            <input
              type="checkbox"
              name="showAgenciesOnHome"
              checked={form.showAgenciesOnHome}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <span className="text-sm font-medium text-white">
              Mostra agenzie in homepage
            </span>
          </label>

          <label className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3">
            <input
              type="checkbox"
              name="showRocketsOnHome"
              checked={form.showRocketsOnHome}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <span className="text-sm font-medium text-white">
              Mostra razzi in homepage
            </span>
          </label>
        </SectionCard>

        <SectionCard
          title="Sistema"
          description="Impostazioni operative del sito."
        >
          <label className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3">
            <input
              type="checkbox"
              name="allowRegistrations"
              checked={form.allowRegistrations}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <span className="text-sm font-medium text-white">
              Consenti nuove registrazioni
            </span>
          </label>

          <label className="flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3">
            <input
              type="checkbox"
              name="maintenanceMode"
              checked={form.maintenanceMode}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <span className="text-sm font-medium text-white">
              Modalità manutenzione
            </span>
          </label>

          <div>
            <label className="mb-2 block text-sm font-medium text-white">
              Testo footer
            </label>
            <input
              type="text"
              name="footerText"
              value={form.footerText}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            />
          </div>
        </SectionCard>

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

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-60"
          >
            {saving ? "Salvataggio..." : "Salva impostazioni"}
          </button>
        </div>
      </form>
    </main>
  );
}
