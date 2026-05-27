import Link from "next/link";
import { getOneAgency } from "@/lib/api/agency";

function DetailItem({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-sm font-medium text-slate-100">
        {value || "Non disponibile"}
      </p>
    </div>
  );
}

function TypeBadge({ type }) {
  if (!type) {
    return (
      <span className="rounded-full border border-slate-700 px-3 py-1 text-xs font-semibold text-slate-300">
        Non specificato
      </span>
    );
  }

  const styles = {
    PRIVATE: "border-violet-500/40 bg-violet-500/10 text-violet-300",
    GOVERNMENT: "border-cyan-500/40 bg-cyan-500/10 text-cyan-300",
    INTERNATIONAL: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
  };

  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-semibold ${
        styles[type] || "border-slate-700 bg-slate-800 text-slate-300"
      }`}
    >
      {type}
    </span>
  );
}

export default async function AgencyDetailPage({ params }) {
  const { id } = await params;

  const agency = await getOneAgency(id);

  return (
    <>
      <div className="mb-3 flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/50 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
            Admin Panel
          </p>

          <h1 className="mt-2 text-3xl font-bold text-white">
            Dettaglio agenzia
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Visualizza le informazioni principali dell'agenzia spaziale.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/agencies"
            className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
          >
            Torna alla lista
          </Link>

          <Link
            href={`/admin/agencies/${id}/edit`}
            className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Modifica
          </Link>
        </div>
      </div>

      <section className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/50">
        <div className="border-b border-slate-800 p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-slate-700 bg-slate-950">
                {agency?.logoUrl ? (
                  <img
                    src={agency.logoUrl}
                    alt={agency.name}
                    className="h-full w-full object-contain p-2"
                  />
                ) : (
                  <span className="text-xl font-bold text-cyan-300">
                    {agency?.name?.charAt(0) || "A"}
                  </span>
                )}
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">
                  {agency?.name || "Agenzia senza nome"}
                </h2>

                <div className="mt-2">
                  <TypeBadge type={agency?.type} />
                </div>
              </div>
            </div>

            {agency?.website && (
              <a
                href={agency.website}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
              >
                Visita sito
              </a>
            )}
          </div>
        </div>

        <div className="grid gap-4 p-6 md:grid-cols-3">
          <DetailItem label="Nome" value={agency?.name} />
          <DetailItem label="Country" value={agency?.country} />
          <DetailItem label="Tipo" value={agency?.type} />
          <DetailItem label="Anno fondazione" value={agency?.foundedYear} />
          <DetailItem label="Website" value={agency?.website} />
          <DetailItem label="Logo URL" value={agency?.logoUrl} />
        </div>

        <div className="border-t border-slate-800 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Descrizione
          </p>

          <p className="mt-3 leading-7 text-slate-300">
            {agency?.description || "Nessuna descrizione disponibile."}
          </p>
        </div>
      </section>
    </>
  );
}
