import Link from "next/link";

const agencies = [
  {
    id: "cmnpt63090000rg3ax3ett97c",
    name: "SpaceX",
    slug: "spacex",
    country: "USA",
    type: "PRIVATE",
    description: "Azienda aerospaziale fondata da Elon Musk.",
    website: "https://www.spacex.com",
    logoUrl: "https://example.com/spacex-logo.png",
    foundedYear: 2002,
    createdAt: "2026-04-08T08:50:50.937Z",
    updatedAt: "2026-04-08T08:50:50.937Z",
  },
  {
    id: "cmnpt63090000rg3ax3ett97d",
    name: "NASA",
    slug: "nasa",
    country: "USA",
    type: "GOVERNMENT",
    description: "Agenzia spaziale statunitense.",
    website: "https://www.nasa.gov",
    logoUrl: "https://example.com/nasa-logo.png",
    foundedYear: 1958,
    createdAt: "2026-04-08T08:55:50.937Z",
    updatedAt: "2026-04-08T08:55:50.937Z",
  },
  {
    id: "cmnpt63090000rg3ax3ett97e",
    name: "ESA",
    slug: "esa",
    country: "Europa",
    type: "INTERNATIONAL",
    description: "Agenzia Spaziale Europea.",
    website: "https://www.esa.int",
    logoUrl: "https://example.com/esa-logo.png",
    foundedYear: 1975,
    createdAt: "2026-04-08T09:00:50.937Z",
    updatedAt: "2026-04-08T09:00:50.937Z",
  },
];

function getTypeClasses(type) {
  switch (type) {
    case "PRIVATE":
      return "bg-violet-500/15 text-violet-300 border border-violet-500/20";
    case "GOVERNMENT":
      return "bg-cyan-500/15 text-cyan-300 border border-cyan-500/20";
    case "INTERNATIONAL":
      return "bg-emerald-500/15 text-emerald-300 border border-emerald-500/20";
    default:
      return "bg-slate-700/40 text-slate-300 border border-slate-600";
  }
}

export default function AgenciesAdminPage() {
  return (
    <main className="space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/50 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
            Admin Panel
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white">Agenzie</h1>
          <p className="mt-2 text-sm text-slate-400">
            Elenco delle agenzie spaziali con i dati principali.
          </p>
        </div>

        <Link
          href="/admin/agencies/new"
          className="rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          + Nuova agenzia
        </Link>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/50">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/70 text-xs uppercase tracking-[0.18em] text-slate-400">
              <tr>
                <th className="px-6 py-4">Nome</th>
                <th className="px-6 py-4">Slug</th>
                <th className="px-6 py-4">Country</th>
                <th className="px-6 py-4">Tipo</th>
                <th className="px-6 py-4">Anno fondazione</th>
                <th className="px-6 py-4">Website</th>
                <th className="px-6 py-4 text-right">Azioni</th>
              </tr>
            </thead>

            <tbody>
              {agencies.map((agency) => (
                <tr
                  key={agency.id}
                  className="border-t border-slate-800 transition hover:bg-slate-800/30"
                >
                  <td className="px-6 py-4 align-middle">
                    <div>
                      <p className="font-semibold text-white">{agency.name}</p>
                      <p className="mt-1 line-clamp-1 max-w-xs text-xs text-slate-500">
                        {agency.description || "—"}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-4 align-middle">
                    {agency.slug || "—"}
                  </td>

                  <td className="px-6 py-4 align-middle">
                    {agency.country || "—"}
                  </td>

                  <td className="px-6 py-4 align-middle">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getTypeClasses(
                        agency.type,
                      )}`}
                    >
                      {agency.type || "—"}
                    </span>
                  </td>

                  <td className="px-6 py-4 align-middle">
                    {agency.foundedYear || "—"}
                  </td>

                  <td className="px-6 py-4 align-middle">
                    {agency.website ? (
                      <a
                        href={agency.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-cyan-400 transition hover:text-cyan-300"
                      >
                        Sito
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>

                  <td className="px-6 py-4 align-middle">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/agencies/${agency.id}`}
                        className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-200 transition hover:bg-slate-800"
                      >
                        Dettaglio
                      </Link>

                      <Link
                        href={`/admin/agencies/${agency.id}/edit`}
                        className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-200 transition hover:bg-slate-800"
                      >
                        Modifica
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}

              {agencies.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-10 text-center text-sm text-slate-400"
                  >
                    Nessuna agenzia disponibile.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
