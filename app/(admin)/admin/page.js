import Link from "next/link";

const stats = [
  {
    label: "Missioni",
    value: 24,
    description: "Totale missioni registrate",
  },
  {
    label: "Razzi",
    value: 8,
    description: "Veicoli disponibili nel sistema",
  },
  {
    label: "Agenzie",
    value: 12,
    description: "Organizzazioni spaziali censite",
  },
  {
    label: "Launch Sites",
    value: 6,
    description: "Siti di lancio disponibili",
  },
];

const latestMissions = [
  {
    id: "1",
    name: "Artemis II",
    status: "SCHEDULED",
    launchDate: "2026-05-10T14:30:00.000Z",
    destination: "Moon",
  },
  {
    id: "2",
    name: "Starlink Batch 12",
    status: "PLANNED",
    launchDate: "2026-05-18T09:00:00.000Z",
    destination: "Low Earth Orbit",
  },
  {
    id: "3",
    name: "Mars Observer Next",
    status: "DELAYED",
    launchDate: "2026-06-03T18:45:00.000Z",
    destination: "Mars",
  },
];

const quickActions = [
  {
    href: "/admin/missions/new",
    title: "Nuova missione",
    description: "Crea una nuova missione spaziale",
  },
  {
    href: "/admin/rockets/new",
    title: "Nuovo razzo",
    description: "Aggiungi un nuovo razzo al catalogo",
  },
  {
    href: "/admin/agencies/new",
    title: "Nuova agenzia",
    description: "Registra una nuova agenzia spaziale",
  },
  {
    href: "/admin/launch-sites/new",
    title: "Nuovo launch site",
    description: "Inserisci un nuovo sito di lancio",
  },
];

function formatDate(date) {
  if (!date) return "—";

  return new Intl.DateTimeFormat("it-IT", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

function getStatusClasses(status) {
  switch (status) {
    case "SCHEDULED":
      return "bg-cyan-500/15 text-cyan-300 border border-cyan-500/20";
    case "PLANNED":
      return "bg-violet-500/15 text-violet-300 border border-violet-500/20";
    case "DELAYED":
      return "bg-amber-500/15 text-amber-300 border border-amber-500/20";
    case "COMPLETED":
      return "bg-emerald-500/15 text-emerald-300 border border-emerald-500/20";
    case "CANCELED":
      return "bg-red-500/15 text-red-300 border border-red-500/20";
    default:
      return "bg-slate-700/50 text-slate-300 border border-slate-600";
  }
}

export default function AdminDashboardPage() {
  return (
    <main className="space-y-6">
      <section className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
        <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
          Admin Dashboard
        </p>
        <h1 className="mt-2 text-3xl font-bold text-white">
          Benvenuto nel pannello admin
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-400">
          Da qui puoi gestire missioni, razzi, agenzie e siti di lancio del
          progetto Space Mission.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-3xl border border-slate-800 bg-slate-900/50 p-5"
          >
            <p className="text-sm text-slate-400">{stat.label}</p>
            <p className="mt-3 text-3xl font-bold text-white">{stat.value}</p>
            <p className="mt-2 text-sm text-slate-500">{stat.description}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Ultime missioni
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Panoramica rapida delle missioni recenti
              </p>
            </div>

            <Link
              href="/admin/missions"
              className="rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
            >
              Vedi tutte
            </Link>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-800">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-950/70 text-xs uppercase tracking-[0.18em] text-slate-400">
                  <tr>
                    <th className="px-4 py-3">Missione</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Destinazione</th>
                    <th className="px-4 py-3">Launch Date</th>
                  </tr>
                </thead>
                <tbody>
                  {latestMissions.map((mission) => (
                    <tr
                      key={mission.id}
                      className="border-t border-slate-800 hover:bg-slate-800/30"
                    >
                      <td className="px-4 py-4 font-medium text-white">
                        {mission.name}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusClasses(
                            mission.status,
                          )}`}
                        >
                          {mission.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        {mission.destination || "—"}
                      </td>
                      <td className="px-4 py-4">
                        {formatDate(mission.launchDate)}
                      </td>
                    </tr>
                  ))}

                  {latestMissions.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 py-8 text-center text-slate-400"
                      >
                        Nessuna missione disponibile.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-6">
          <h2 className="text-xl font-semibold text-white">Azioni rapide</h2>
          <p className="mt-1 text-sm text-slate-400">
            Scorciatoie per creare nuovi contenuti
          </p>

          <div className="mt-6 grid gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 transition hover:border-cyan-500/30 hover:bg-slate-900"
              >
                <h3 className="text-sm font-semibold text-white">
                  {action.title}
                </h3>
                <p className="mt-2 text-sm text-slate-400">
                  {action.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Link
          href="/admin/missions"
          className="rounded-3xl border border-slate-800 bg-slate-900/50 p-5 transition hover:border-cyan-500/30 hover:bg-slate-900"
        >
          <h3 className="text-lg font-semibold text-white">
            Gestione missioni
          </h3>
          <p className="mt-2 text-sm text-slate-400">
            Visualizza, crea e modifica le missioni.
          </p>
        </Link>

        <Link
          href="/admin/rockets"
          className="rounded-3xl border border-slate-800 bg-slate-900/50 p-5 transition hover:border-cyan-500/30 hover:bg-slate-900"
        >
          <h3 className="text-lg font-semibold text-white">Gestione razzi</h3>
          <p className="mt-2 text-sm text-slate-400">
            Amministra i razzi e le loro specifiche tecniche.
          </p>
        </Link>

        <Link
          href="/admin/agencies"
          className="rounded-3xl border border-slate-800 bg-slate-900/50 p-5 transition hover:border-cyan-500/30 hover:bg-slate-900"
        >
          <h3 className="text-lg font-semibold text-white">Gestione agenzie</h3>
          <p className="mt-2 text-sm text-slate-400">
            Organizza le agenzie spaziali presenti nel sistema.
          </p>
        </Link>

        <Link
          href="/admin/launch-sites"
          className="rounded-3xl border border-slate-800 bg-slate-900/50 p-5 transition hover:border-cyan-500/30 hover:bg-slate-900"
        >
          <h3 className="text-lg font-semibold text-white">
            Gestione launch sites
          </h3>
          <p className="mt-2 text-sm text-slate-400">
            Controlla i siti di lancio e i relativi dati.
          </p>
        </Link>
      </section>
    </main>
  );
}
