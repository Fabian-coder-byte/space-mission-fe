import Link from "next/link";
import { notFound } from "next/navigation";

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

function formatNumber(value, suffix = "") {
  if (value === null || value === undefined) return "—";
  return `${value.toLocaleString("it-IT")}${suffix}`;
}

function DetailCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-sm font-medium text-white">{value}</p>
    </div>
  );
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

export default async function RocketDetailPage({ params }) {
  const { id } = await params;

  const rocket = rockets.find((item) => item.id === id);

  if (!rocket) {
    notFound();
  }

  return (
    <main className="space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/50 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
            Rocket Detail
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white">{rocket.name}</h1>
          <p className="mt-2 text-sm text-slate-400">Slug: {rocket.slug}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/rockets"
            className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
          >
            Torna alla lista
          </Link>

          <Link
            href={`/admin/rockets/${rocket.id}/edit`}
            className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Modifica razzo
          </Link>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="space-y-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusClasses(
                  rocket.status,
                )}`}
              >
                {rocket.status}
              </span>

              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                  rocket.reusable
                    ? "border border-cyan-500/20 bg-cyan-500/15 text-cyan-300"
                    : "border border-slate-600 bg-slate-700/40 text-slate-300"
                }`}
              >
                {rocket.reusable ? "Riutilizzabile" : "Non riutilizzabile"}
              </span>
            </div>

            <h2 className="mt-4 text-xl font-semibold text-white">
              Informazioni principali
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <DetailCard label="Nome" value={rocket.name || "—"} />
              <DetailCard label="Slug" value={rocket.slug || "—"} />
              <DetailCard
                label="Manufacturer"
                value={rocket.manufacturer || "—"}
              />
              <DetailCard
                label="Primo volo"
                value={formatDate(rocket.firstFlightDate)}
              />
              <DetailCard label="Status" value={rocket.status || "—"} />
              <DetailCard
                label="Reusable"
                value={rocket.reusable ? "Sì" : "No"}
              />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
            <h2 className="text-xl font-semibold text-white">Descrizione</h2>
            <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-300">
              {rocket.description || "Nessuna descrizione disponibile."}
            </p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
            <h2 className="text-xl font-semibold text-white">
              Missioni associate
            </h2>

            <div className="mt-4 space-y-4">
              {rocket.missions?.length > 0 ? (
                rocket.missions.map((mission) => (
                  <div
                    key={mission.id}
                    className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4"
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="text-sm font-semibold text-white">
                          {mission.name}
                        </h3>
                        <p className="mt-1 text-xs text-slate-400">
                          {mission.status} • {mission.missionType || "N/D"}
                        </p>
                      </div>

                      <Link
                        href={`/admin/missions/${mission.id}`}
                        className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-200 transition hover:bg-slate-800"
                      >
                        Vai alla missione
                      </Link>
                    </div>

                    <div className="mt-3 grid gap-3 md:grid-cols-3">
                      <DetailCard
                        label="Destinazione"
                        value={mission.destination || "—"}
                      />
                      <DetailCard label="Orbita" value={mission.orbit || "—"} />
                      <DetailCard
                        label="Launch Date"
                        value={formatDate(mission.launchDate)}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-400">
                  Nessuna missione associata.
                </p>
              )}
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
            <h2 className="text-xl font-semibold text-white">
              Specifiche tecniche
            </h2>

            <div className="mt-6 grid gap-4">
              <DetailCard
                label="Altezza"
                value={formatNumber(rocket.heightMeters, " m")}
              />
              <DetailCard
                label="Diametro"
                value={formatNumber(rocket.diameterMeters, " m")}
              />
              <DetailCard
                label="Massa"
                value={formatNumber(rocket.massKg, " kg")}
              />
              <DetailCard
                label="Payload to LEO"
                value={formatNumber(rocket.payloadToLeoKg, " kg")}
              />
              <DetailCard
                label="Payload to GTO"
                value={formatNumber(rocket.payloadToGtoKg, " kg")}
              />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
            <h2 className="text-xl font-semibold text-white">Agenzia</h2>

            <div className="mt-6 space-y-4">
              <DetailCard label="Nome" value={rocket.agency?.name || "—"} />
              <DetailCard label="Slug" value={rocket.agency?.slug || "—"} />
              <DetailCard
                label="Country"
                value={rocket.agency?.country || "—"}
              />
              <DetailCard
                label="Founded Year"
                value={rocket.agency?.foundedYear || "—"}
              />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
            <h2 className="text-xl font-semibold text-white">Metadati</h2>

            <div className="mt-6 space-y-4">
              <DetailCard label="ID" value={rocket.id} />
              <DetailCard
                label="Creato il"
                value={formatDate(rocket.createdAt)}
              />
              <DetailCard
                label="Aggiornato il"
                value={formatDate(rocket.updatedAt)}
              />
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
