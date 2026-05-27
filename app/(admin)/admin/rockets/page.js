import DeleteRocketButtonList from "@/components/delete-rocket-button-list";
import { getRocketsPaginated } from "@/lib/api/rockets";

import Link from "next/link";

function getStatusClasses(status) {
  switch (status) {
    case "ACTIVE":
      return "bg-emerald-500/15 text-emerald-300 border border-emerald-500/20";
    case "TESTING":
      return "bg-amber-500/15 text-amber-300 border border-amber-500/20";
    case "INACTIVE":
      return "bg-slate-700/40 text-slate-300 border border-slate-600";
    case "RETIRED":
      return "bg-red-500/15 text-red-300 border border-red-500/20";
    default:
      return "bg-slate-700/40 text-slate-300 border border-slate-600";
  }
}

function buildRocketUrl({ page = 1, limit = 10, search = "" }) {
  const params = new URLSearchParams();

  params.set("page", String(page));
  params.set("limit", String(limit));

  if (search) {
    params.set("search", search);
  }

  return `/admin/rockets?${params.toString()}`;
}

function formatNumber(value) {
  if (value === null || value === undefined) return "—";

  return Number(value).toLocaleString("it-IT");
}

export const metadata = {
  title: "Admin Razzi",
};

export default async function RocketsAdminPage({ searchParams }) {
  const params = await searchParams;

  const currentPage = Number(params?.page || 1);
  const limit = Number(params?.limit || 10);
  const search = String(params?.search || "");

  const rocketsResponse = await getRocketsPaginated(currentPage, limit, search);

  const rockets = rocketsResponse?.items || [];

  const meta = rocketsResponse?.meta || {
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

          <h1 className="mt-2 text-3xl font-bold text-white">Razzi</h1>

          <p className="mt-2 text-sm text-slate-400">
            Elenco dei razzi spaziali con dati tecnici, stato operativo e
            missioni collegate.
          </p>

          <p className="mt-2 text-xs text-slate-500">
            Totale razzi: {meta.total}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/rockets/new"
            className="rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            + Nuovo razzo
          </Link>
        </div>
      </div>

      <div className="mb-3 rounded-3xl border border-slate-800 bg-slate-900/50 p-4">
        <form className="grid gap-3 md:grid-cols-[1fr_auto_auto] md:items-end">
          <input type="hidden" name="page" value="1" />

          <div>
            <label
              htmlFor="search"
              className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-slate-500"
            >
              Cerca razzo
            </label>

            <input
              id="search"
              name="search"
              type="text"
              defaultValue={search}
              placeholder="Cerca per nome, slug, produttore..."
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
              href="/admin/rockets?page=1&limit=10"
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
                <th className="px-6 py-4">Produttore</th>
                <th className="px-6 py-4">Country</th>
                <th className="px-6 py-4">Stato</th>
                <th className="px-6 py-4">Riutilizzabile</th>
                <th className="px-6 py-4">Stadi</th>
                <th className="px-6 py-4">Altezza</th>
                <th className="px-6 py-4">Payload LEO</th>
                <th className="px-6 py-4 text-right">Azioni</th>
              </tr>
            </thead>

            <tbody>
              {rockets.map((rocket) => (
                <tr
                  key={rocket.id}
                  className="border-t border-slate-800 transition hover:bg-slate-800/30"
                >
                  <td className="px-6 py-4 align-middle">
                    <div>
                      <p className="font-semibold text-white">{rocket.name}</p>

                      <p className="mt-1 line-clamp-1 max-w-xs text-xs text-slate-500">
                        {rocket.slug || "—"}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-4 align-middle">
                    {rocket.manufacturer || "—"}
                  </td>

                  <td className="px-6 py-4 align-middle">
                    {rocket.country || "—"}
                  </td>

                  <td className="px-6 py-4 align-middle">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusClasses(
                        rocket.status,
                      )}`}
                    >
                      {rocket.status || "—"}
                    </span>
                  </td>

                  <td className="px-6 py-4 align-middle">
                    {rocket.reusable ? (
                      <span className="inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/15 px-3 py-1 text-xs font-medium text-cyan-300">
                        Sì
                      </span>
                    ) : (
                      <span className="inline-flex rounded-full border border-slate-600 bg-slate-700/40 px-3 py-1 text-xs font-medium text-slate-300">
                        No
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4 align-middle">
                    {rocket.stages || "—"}
                  </td>

                  <td className="px-6 py-4 align-middle">
                    {rocket.height ? `${rocket.height} m` : "—"}
                  </td>

                  <td className="px-6 py-4 align-middle">
                    {rocket.payloadLeoKg
                      ? `${formatNumber(rocket.payloadLeoKg)} kg`
                      : "—"}
                  </td>

                  <td className="px-6 py-4 align-middle">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/rockets/${rocket.id}`}
                        className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-200 transition hover:bg-slate-800"
                      >
                        Dettaglio
                      </Link>

                      <Link
                        href={`/admin/rockets/${rocket.id}/edit`}
                        className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-200 transition hover:bg-slate-800"
                      >
                        Modifica
                      </Link>

                      <DeleteRocketButtonList id={rocket.id} />
                    </div>
                  </td>
                </tr>
              ))}

              {rockets.length === 0 && (
                <tr>
                  <td
                    colSpan={9}
                    className="px-6 py-10 text-center text-sm text-slate-400"
                  >
                    Nessun razzo disponibile.
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
              Mostrati {rockets.length} elementi su {meta.total}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={buildRocketUrl({
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
              href={buildRocketUrl({
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
                  href={buildRocketUrl({
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
              href={buildRocketUrl({
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
              href={buildRocketUrl({
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
