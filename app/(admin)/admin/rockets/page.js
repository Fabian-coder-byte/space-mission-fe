import Link from "next/link";

const rockets = [
  {
    id: "cmnpuf4pq0001te3am0gu9qv4",
    name: "Falcon 9",
    slug: "falcon-9",
    manufacturer: "SpaceX",
    description: "Razzo riutilizzabile a due stadi",
    reusable: true,
    status: "ACTIVE",
    heightMeters: 70,
    diameterMeters: 3.7,
    massKg: 549054,
    payloadToLeoKg: 22800,
    payloadToGtoKg: 8300,
    firstFlightDate: "2010-06-04T00:00:00.000Z",
    imageUrl: "https://example.com/falcon9.jpg",
    agencyId: "cmnpt63090000rg3ax3ett97c",
    createdAt: "2026-04-08T09:25:52.670Z",
    updatedAt: "2026-04-08T09:25:52.670Z",
    agency: {
      id: "cmnpt63090000rg3ax3ett97c",
      name: "Space X1234dsfdddfdsfdgfdsdd",
      slug: "space-xssdsdsddsdsdfdf232323",
      country: null,
      type: null,
      description: null,
      website: null,
      logoUrl: null,
      foundedYear: null,
      createdAt: "2026-04-08T08:50:50.937Z",
      updatedAt: "2026-04-08T08:50:50.937Z",
    },
    missions: [
      {
        id: "cmnpv5l780000wj3aeitas1va",
        name: "Artemis II",
        slug: "artemis-ii",
        description: "Missione con equipaggio del programma Artemis",
        missionType: "MILITARY",
        status: "SCHEDULED",
        launchDate: "2026-05-10T14:30:00.000Z",
        windowStart: "2026-05-10T14:00:00.000Z",
        windowEnd: "2026-05-10T16:00:00.000Z",
        destination: "Moon",
        orbit: "Lunar Flyby",
        isCrewed: true,
        imageUrl: "https://example.com/artemis2.jpg",
        detailsUrl: "https://example.com/artemis2-details",
        agencyId: "cmnpt63090000rg3ax3ett97c",
        rocketId: "cmnpuf4pq0001te3am0gu9qv4",
        launchSiteId: "cmnpuucdu0000yd3agpo6cdwx",
        createdAt: "2026-04-08T09:46:27.092Z",
        updatedAt: "2026-04-08T09:46:27.092Z",
      },
    ],
  },
];

function formatDate(date) {
  if (!date) return "—";

  return new Intl.DateTimeFormat("it-IT", {
    dateStyle: "medium",
  }).format(new Date(date));
}

function getStatusClasses(status) {
  switch (status) {
    case "ACTIVE":
      return "bg-emerald-500/15 text-emerald-300 border border-emerald-500/20";
    case "RETIRED":
      return "bg-slate-500/15 text-slate-300 border border-slate-500/20";
    case "DEVELOPMENT":
      return "bg-amber-500/15 text-amber-300 border border-amber-500/20";
    default:
      return "bg-slate-700/40 text-slate-300 border border-slate-600";
  }
}

export default function RocketsAdminPage() {
  return (
    <main className="space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/50 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
            Admin Panel
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white">Razzi</h1>
          <p className="mt-2 text-sm text-slate-400">
            Elenco dei razzi con le informazioni principali.
          </p>
        </div>

        <Link
          href="/admin/rockets/new"
          className="rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          + Nuovo razzo
        </Link>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/50">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/70 text-xs uppercase tracking-[0.18em] text-slate-400">
              <tr>
                <th className="px-6 py-4">Nome</th>
                <th className="px-6 py-4">Manufacturer</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Reusable</th>
                <th className="px-6 py-4">Altezza</th>
                <th className="px-6 py-4">Payload LEO</th>
                <th className="px-6 py-4">Agenzia</th>
                <th className="px-6 py-4">Primo volo</th>
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
                      <p className="mt-1 text-xs text-slate-500">
                        {rocket.slug}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-4 align-middle">
                    {rocket.manufacturer || "—"}
                  </td>

                  <td className="px-6 py-4 align-middle">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusClasses(
                        rocket.status,
                      )}`}
                    >
                      {rocket.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 align-middle">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                        rocket.reusable
                          ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/20"
                          : "bg-slate-700/50 text-slate-300 border border-slate-600"
                      }`}
                    >
                      {rocket.reusable ? "Sì" : "No"}
                    </span>
                  </td>

                  <td className="px-6 py-4 align-middle">
                    {rocket.heightMeters ? `${rocket.heightMeters} m` : "—"}
                  </td>

                  <td className="px-6 py-4 align-middle">
                    {rocket.payloadToLeoKg
                      ? `${rocket.payloadToLeoKg.toLocaleString("it-IT")} kg`
                      : "—"}
                  </td>

                  <td className="px-6 py-4 align-middle">
                    {rocket.agency?.name || "—"}
                  </td>

                  <td className="px-6 py-4 align-middle">
                    {formatDate(rocket.firstFlightDate)}
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
      </div>
    </main>
  );
}
