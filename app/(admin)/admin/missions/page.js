import Link from "next/link";

const missions = [
  {
    id: "1",
    name: "Artemis II",
    slug: "artemis-ii",
    missionType: "CREWED",
    status: "SCHEDULED",
    launchDate: "2026-05-21T14:30:00.000Z",
    agency: "NASA",
    rocket: "SLS Block 1",
    launchSite: "Kennedy Space Center LC-39B",
    isCrewed: true,
    destination: "Moon",
    createdAt: "2026-04-01",
  },
  {
    id: "2",
    name: "Starlink Batch 14",
    slug: "starlink-batch-14",
    missionType: "SATELLITE",
    status: "SCHEDULED",
    launchDate: "2026-04-28T09:15:00.000Z",
    agency: "SpaceX",
    rocket: "Falcon 9",
    launchSite: "Vandenberg SLC-4E",
    isCrewed: false,
    destination: "Low Earth Orbit",
    createdAt: "2026-03-25",
  },
  {
    id: "3",
    name: "Mars Cargo Pathfinder",
    slug: "mars-cargo-pathfinder",
    missionType: "CARGO",
    status: "PLANNED",
    launchDate: "2026-08-12T18:00:00.000Z",
    agency: "ESA",
    rocket: "Ariane 6",
    launchSite: "Guiana Space Centre ELA-4",
    isCrewed: false,
    destination: "Mars",
    createdAt: "2026-03-12",
  },
  {
    id: "4",
    name: "Crew Orbital Test",
    slug: "crew-orbital-test",
    missionType: "TEST_FLIGHT",
    status: "COMPLETED",
    launchDate: "2026-02-10T11:45:00.000Z",
    agency: "SpaceX",
    rocket: "Falcon 9",
    launchSite: "Kennedy Space Center LC-39A",
    isCrewed: true,
    destination: "ISS",
    createdAt: "2026-02-01",
  },
  {
    id: "5",
    name: "Lunar Relay Network",
    slug: "lunar-relay-network",
    missionType: "COMMUNICATION",
    status: "CANCELLED",
    launchDate: "2026-06-03T07:20:00.000Z",
    agency: "JAXA",
    rocket: "H3",
    launchSite: "Tanegashima Yoshinobu Launch Complex",
    isCrewed: false,
    destination: "Moon Orbit",
    createdAt: "2026-03-30",
  },
];

function getStatusClasses(status) {
  switch (status) {
    case "SCHEDULED":
      return "bg-cyan-500/15 text-cyan-400 ring-1 ring-cyan-500/30";
    case "PLANNED":
      return "bg-amber-500/15 text-amber-400 ring-1 ring-amber-500/30";
    case "COMPLETED":
      return "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30";
    case "CANCELLED":
      return "bg-red-500/15 text-red-400 ring-1 ring-red-500/30";
    default:
      return "bg-slate-500/15 text-slate-300 ring-1 ring-slate-500/30";
  }
}

function getMissionTypeClasses(type) {
  switch (type) {
    case "CREWED":
      return "bg-violet-500/15 text-violet-400 ring-1 ring-violet-500/30";
    case "SATELLITE":
      return "bg-blue-500/15 text-blue-400 ring-1 ring-blue-500/30";
    case "CARGO":
      return "bg-orange-500/15 text-orange-400 ring-1 ring-orange-500/30";
    case "TEST_FLIGHT":
      return "bg-pink-500/15 text-pink-400 ring-1 ring-pink-500/30";
    case "COMMUNICATION":
      return "bg-teal-500/15 text-teal-400 ring-1 ring-teal-500/30";
    default:
      return "bg-slate-500/15 text-slate-300 ring-1 ring-slate-500/30";
  }
}

export const metadata = {
  title: "Admin Missioni",
};

export default function AdminMissionsPage() {
  const totalMissions = missions.length;
  const scheduledMissions = missions.filter(
    (mission) => mission.status === "SCHEDULED",
  ).length;
  const completedMissions = missions.filter(
    (mission) => mission.status === "COMPLETED",
  ).length;
  const crewedMissions = missions.filter((mission) => mission.isCrewed).length;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-400">
              Admin Panel
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              Gestione Missioni
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">
              Visualizza, filtra e gestisci le missioni spaziali del progetto
              Space Mission.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:bg-slate-800">
              Esporta CSV
            </button>

            <Link
              href="/admin/missions/new"
              className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              + Nuova Missione
            </Link>
          </div>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <p className="text-sm text-slate-400">Totale missioni</p>
            <p className="mt-2 text-3xl font-bold">{totalMissions}</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <p className="text-sm text-slate-400">Schedulate</p>
            <p className="mt-2 text-3xl font-bold text-cyan-400">
              {scheduledMissions}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <p className="text-sm text-slate-400">Completate</p>
            <p className="mt-2 text-3xl font-bold text-emerald-400">
              {completedMissions}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
            <p className="text-sm text-slate-400">Con equipaggio</p>
            <p className="mt-2 text-3xl font-bold text-violet-400">
              {crewedMissions}
            </p>
          </div>
        </div>

        <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <div className="grid gap-3 md:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
            <input
              type="text"
              placeholder="Cerca per nome, slug, agenzia..."
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-500"
            />

            <select className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white outline-none focus:border-cyan-500">
              <option>Tutti gli stati</option>
              <option>SCHEDULED</option>
              <option>PLANNED</option>
              <option>COMPLETED</option>
              <option>CANCELLED</option>
            </select>

            <select className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white outline-none focus:border-cyan-500">
              <option>Tutti i tipi</option>
              <option>CREWED</option>
              <option>SATELLITE</option>
              <option>CARGO</option>
              <option>TEST_FLIGHT</option>
              <option>COMMUNICATION</option>
            </select>

            <select className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white outline-none focus:border-cyan-500">
              <option>Tutte</option>
              <option>Con equipaggio</option>
              <option>Senza equipaggio</option>
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
                  <th className="px-5 py-4 font-semibold">Missione</th>
                  <th className="px-5 py-4 font-semibold">Tipo</th>
                  <th className="px-5 py-4 font-semibold">Stato</th>
                  <th className="px-5 py-4 font-semibold">Data lancio</th>
                  <th className="px-5 py-4 font-semibold">Agenzia</th>
                  <th className="px-5 py-4 font-semibold">Razzo</th>
                  <th className="px-5 py-4 font-semibold">Destinazione</th>
                  <th className="px-5 py-4 font-semibold text-right">Azioni</th>
                </tr>
              </thead>

              <tbody>
                {missions.map((mission) => (
                  <tr
                    key={mission.id}
                    className="border-b border-slate-800/80 text-slate-200 transition hover:bg-slate-800/40"
                  >
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-semibold text-white">
                          {mission.name}
                        </p>
                        <div className="mt-1 flex flex-wrap items-center gap-2">
                          <span className="text-xs text-slate-400">
                            {mission.slug}
                          </span>
                          {mission.isCrewed && (
                            <span className="rounded-full bg-violet-500/15 px-2 py-0.5 text-[10px] font-semibold text-violet-400 ring-1 ring-violet-500/30">
                              CREWED
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getMissionTypeClasses(
                          mission.missionType,
                        )}`}
                      >
                        {mission.missionType}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
                          mission.status,
                        )}`}
                      >
                        {mission.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-slate-300">
                      {new Date(mission.launchDate).toLocaleString("it-IT")}
                    </td>

                    <td className="px-5 py-4 text-slate-300">
                      {mission.agency}
                    </td>

                    <td className="px-5 py-4 text-slate-300">
                      {mission.rocket}
                    </td>

                    <td className="px-5 py-4 text-slate-300">
                      {mission.destination}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/missions/${mission.id}`}
                          className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:border-cyan-500 hover:text-cyan-400"
                        >
                          Dettaglio
                        </Link>

                        <Link
                          href={`/admin/missions/${mission.id}/edit`}
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
                {missions.length}
              </span>{" "}
              di{" "}
              <span className="font-semibold text-white">
                {missions.length}
              </span>{" "}
              missioni
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
