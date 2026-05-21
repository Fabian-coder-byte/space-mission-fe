import { getAgenciesPagination } from "@/lib/api/agency";
import Link from "next/link";

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

function buildAgencyUrl({ page = 1, limit = 10, search = "" }) {
  const params = new URLSearchParams();

  params.set("page", String(page));
  params.set("limit", String(limit));

  if (search) {
    params.set("search", search);
  }

  return `/admin/agencies?${params.toString()}`;
}

export default async function AgenciesAdminPage({ searchParams }) {
  const params = await searchParams;

  const currentPage = Number(params?.page || 1);
  const limit = Number(params?.limit || 10);
  const search = String(params?.search || "");

  const agenciesResponse = await getAgenciesPagination(
    currentPage,
    limit,
    search,
  );

  const agencies = agenciesResponse?.items || [];

  const meta = agenciesResponse?.meta || {
    total: 0,
    page: currentPage,
    limit,
    totalPages: 1,
  };

  return (
    <>
      <div className="mb-3 flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/50 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
            Admin Panel
          </p>

          <h1 className="mt-2 text-3xl font-bold text-white">Agenzie</h1>

          <p className="mt-2 text-sm text-slate-400">
            Elenco delle agenzie spaziali con i dati principali.
          </p>

          <p className="mt-2 text-xs text-slate-500">
            Totale agenzie: {meta.total}
          </p>
        </div>

        <Link
          href="/admin/agencies/new"
          className="rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          + Nuova agenzia
        </Link>
      </div>

      <div className="mb-3 rounded-3xl border border-slate-800 bg-slate-900/50 p-4">
        <form className="grid gap-3 md:grid-cols-[1fr_auto_auto] md:items-end">
          <input type="hidden" name="page" value="1" />

          <div>
            <label
              htmlFor="search"
              className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-slate-500"
            >
              Cerca agenzia
            </label>

            <input
              id="search"
              name="search"
              type="text"
              defaultValue={search}
              placeholder="Cerca per nome..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-200 outline-none transition placeholder:text-slate-600 focus:border-cyan-500"
            />
          </div>

          <div>
            <label
              htmlFor="limit"
              className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-slate-500"
            >
              Elementi
            </label>

            <select
              id="limit"
              name="limit"
              defaultValue={limit}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-200 outline-none transition focus:border-cyan-500 md:w-36"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Applica
            </button>

            <Link
              href="/admin/agencies?page=1&limit=10"
              className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-800"
            >
              Reset
            </Link>
          </div>
        </form>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/50">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/70 text-xs uppercase tracking-[0.18em] text-slate-400">
              <tr>
                <th className="px-6 py-4">Nome</th>
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
                      <button className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-200 transition hover:bg-slate-800">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {agencies.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-10 text-center text-sm text-slate-400"
                  >
                    Nessuna agenzia disponibile.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-4 border-t border-slate-800 px-6 py-4 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-slate-400">
            <p>
              Pagina{" "}
              <span className="font-semibold text-white">{meta.page}</span> di{" "}
              <span className="font-semibold text-white">
                {meta.totalPages || 1}
              </span>
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Mostrati {agencies.length} elementi su {meta.total}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={buildAgencyUrl({
                page: 1,
                limit,
                search,
              })}
              className={`rounded-lg border px-3 py-2 text-xs font-medium transition ${
                currentPage <= 1
                  ? "pointer-events-none border-slate-800 text-slate-600"
                  : "border-slate-700 text-slate-200 hover:bg-slate-800"
              }`}
            >
              Prima
            </Link>

            <Link
              href={buildAgencyUrl({
                page: currentPage - 1,
                limit,
                search,
              })}
              className={`rounded-lg border px-3 py-2 text-xs font-medium transition ${
                currentPage <= 1
                  ? "pointer-events-none border-slate-800 text-slate-600"
                  : "border-slate-700 text-slate-200 hover:bg-slate-800"
              }`}
            >
              Precedente
            </Link>

            {Array.from({ length: meta.totalPages || 1 }, (_, index) => {
              const page = index + 1;

              return (
                <Link
                  key={page}
                  href={buildAgencyUrl({
                    page,
                    limit,
                    search,
                  })}
                  className={`rounded-lg border px-3 py-2 text-xs font-medium transition ${
                    page === currentPage
                      ? "border-cyan-500 bg-cyan-500 text-slate-950"
                      : "border-slate-700 text-slate-200 hover:bg-slate-800"
                  }`}
                >
                  {page}
                </Link>
              );
            })}

            <Link
              href={buildAgencyUrl({
                page: currentPage + 1,
                limit,
                search,
              })}
              className={`rounded-lg border px-3 py-2 text-xs font-medium transition ${
                currentPage >= meta.totalPages
                  ? "pointer-events-none border-slate-800 text-slate-600"
                  : "border-slate-700 text-slate-200 hover:bg-slate-800"
              }`}
            >
              Successiva
            </Link>

            <Link
              href={buildAgencyUrl({
                page: meta.totalPages || 1,
                limit,
                search,
              })}
              className={`rounded-lg border px-3 py-2 text-xs font-medium transition ${
                currentPage >= meta.totalPages
                  ? "pointer-events-none border-slate-800 text-slate-600"
                  : "border-slate-700 text-slate-200 hover:bg-slate-800"
              }`}
            >
              Ultima
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
