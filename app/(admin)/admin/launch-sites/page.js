import Link from "next/link";

const launchSites = [
  {
    id: "1",
    name: "Kennedy Space Center LC-39A",
    slug: "kennedy-space-center-lc-39a",
    locationName: "Merritt Island",
    country: "USA",
    region: "Florida",
    padCode: "LC-39A",
    status: "ACTIVE",
    launchesCount: 128,
    createdAt: "2026-04-01",
  },
  {
    id: "2",
    name: "Vandenberg SLC-4E",
    slug: "vandenberg-slc-4e",
    locationName: "Vandenberg",
    country: "USA",
    region: "California",
    padCode: "SLC-4E",
    status: "ACTIVE",
    launchesCount: 74,
    createdAt: "2026-03-20",
  },
  {
    id: "3",
    name: "Guiana Space Centre ELA-3",
    slug: "guiana-space-centre-ela-3",
    locationName: "Kourou",
    country: "French Guiana",
    region: "South America",
    padCode: "ELA-3",
    status: "INACTIVE",
    launchesCount: 58,
    createdAt: "2026-02-11",
  },
  {
    id: "4",
    name: "Baikonur Cosmodrome Site 1/5",
    slug: "baikonur-site-1-5",
    locationName: "Baikonur",
    country: "Kazakhstan",
    region: "Central Asia",
    padCode: "Site 1/5",
    status: "ACTIVE",
    launchesCount: 212,
    createdAt: "2026-01-28",
  },
  {
    id: "5",
    name: "Satish Dhawan Space Centre FLP",
    slug: "satish-dhawan-space-centre-flp",
    locationName: "Sriharikota",
    country: "India",
    region: "Andhra Pradesh",
    padCode: "FLP",
    status: "MAINTENANCE",
    launchesCount: 36,
    createdAt: "2026-03-05",
  },
];

function getStatusClasses(status) {
  switch (status) {
    case "ACTIVE":
      return "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30";
    case "INACTIVE":
      return "bg-slate-500/15 text-slate-300 ring-1 ring-slate-500/30";
    case "MAINTENANCE":
      return "bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/30";
    default:
      return "bg-slate-500/15 text-slate-300 ring-1 ring-slate-500/30";
  }
}

export const metadata = {
  title: "Admin Launch Sites",
};

export default function AdminLaunchSitesPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
              Admin Panel
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              Gestione Launch Sites
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">
              Visualizza, cerca e gestisci i siti di lancio del progetto Space
              Mission.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:bg-slate-800">
              Esporta CSV
            </button>

            <Link
              href="/admin/launch-sites/new"
              className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              + Nuovo Launch Site
            </Link>
          </div>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <p className="text-sm text-slate-400">Totale siti</p>
            <p className="mt-2 text-3xl font-bold">{launchSites.length}</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <p className="text-sm text-slate-400">Attivi</p>
            <p className="mt-2 text-3xl font-bold text-emerald-400">
              {launchSites.filter((site) => site.status === "ACTIVE").length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <p className="text-sm text-slate-400">In manutenzione</p>
            <p className="mt-2 text-3xl font-bold text-amber-400">
              {
                launchSites.filter((site) => site.status === "MAINTENANCE")
                  .length
              }
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <p className="text-sm text-slate-400">Lanci totali</p>
            <p className="mt-2 text-3xl font-bold text-cyan-400">
              {launchSites.reduce((sum, site) => sum + site.launchesCount, 0)}
            </p>
          </div>
        </div>

        <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <div className="grid gap-3 md:grid-cols-[1.5fr_1fr_1fr_auto]">
            <input
              type="text"
              placeholder="Cerca per nome, slug, paese..."
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-500"
            />

            <select className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white outline-none focus:border-cyan-500">
              <option>Tutti i paesi</option>
              <option>USA</option>
              <option>India</option>
              <option>Kazakhstan</option>
              <option>French Guiana</option>
            </select>

            <select className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white outline-none focus:border-cyan-500">
              <option>Tutti gli stati</option>
              <option>ACTIVE</option>
              <option>INACTIVE</option>
              <option>MAINTENANCE</option>
            </select>

            <button className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-slate-700">
              Filtra
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-900 text-slate-300">
                <tr className="border-b border-slate-800">
                  <th className="px-5 py-4 font-semibold">Nome</th>
                  <th className="px-5 py-4 font-semibold">Slug</th>
                  <th className="px-5 py-4 font-semibold">Località</th>
                  <th className="px-5 py-4 font-semibold">Pad</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 font-semibold">Launches</th>
                  <th className="px-5 py-4 font-semibold">Creato il</th>
                  <th className="px-5 py-4 font-semibold text-right">Azioni</th>
                </tr>
              </thead>

              <tbody>
                {launchSites.map((site) => (
                  <tr
                    key={site.id}
                    className="border-b border-slate-800/80 text-slate-200 transition hover:bg-slate-800/40"
                  >
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-semibold text-white">{site.name}</p>
                        <p className="mt-1 text-xs text-slate-400">
                          ID: {site.id}
                        </p>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-slate-300">{site.slug}</td>

                    <td className="px-5 py-4">
                      <div>
                        <p>{site.locationName}</p>
                        <p className="mt-1 text-xs text-slate-400">
                          {site.region}, {site.country}
                        </p>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-slate-300">{site.padCode}</td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                          site.status,
                        )}`}
                      >
                        {site.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 font-medium text-cyan-400">
                      {site.launchesCount}
                    </td>

                    <td className="px-5 py-4 text-slate-300">
                      {new Date(site.createdAt).toLocaleDateString("it-IT")}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/launch-sites/${site.id}`}
                          className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:border-cyan-500 hover:text-cyan-400"
                        >
                          Dettaglio
                        </Link>

                        <Link
                          href={`/admin/launch-sites/${site.id}/edit`}
                          className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:border-amber-500 hover:text-amber-400"
                        >
                          Modifica
                        </Link>

                        <button className="rounded-lg border border-red-500/30 px-3 py-1.5 text-xs font-medium text-red-400 transition hover:bg-red-500/10">
                          Elimina
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 border-t border-slate-800 px-5 py-4 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
            <p>
              Mostrando <span className="font-semibold text-white">1</span>-
              <span className="font-semibold text-white">
                {launchSites.length}
              </span>{" "}
              di{" "}
              <span className="font-semibold text-white">
                {launchSites.length}
              </span>{" "}
              launch sites
            </p>

            <div className="flex items-center gap-2">
              <button className="rounded-lg border border-slate-700 px-3 py-1.5 text-slate-300 transition hover:bg-slate-800">
                Precedente
              </button>
              <button className="rounded-lg bg-cyan-500 px-3 py-1.5 font-medium text-slate-950">
                1
              </button>
              <button className="rounded-lg border border-slate-700 px-3 py-1.5 text-slate-300 transition hover:bg-slate-800">
                Successiva
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
