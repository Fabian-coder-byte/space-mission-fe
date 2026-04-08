import Link from "next/link";

const favoriteMissions = [
  {
    id: 1,
    name: "Artemis Explorer I",
    slug: "artemis-explorer-i",
    date: "12 Maggio 2026 • 14:30 UTC",
    status: "Upcoming",
  },
  {
    id: 2,
    name: "Mars Probe Alpha",
    slug: "mars-probe-alpha",
    date: "02 Giugno 2026 • 19:40 UTC",
    status: "Planned",
  },
];

const recentActivity = [
  {
    id: 1,
    text: "Hai aggiunto Artemis Explorer I ai preferiti",
    date: "Oggi",
  },
  {
    id: 2,
    text: "Hai visualizzato il razzo Falcon 9",
    date: "Ieri",
  },
  {
    id: 3,
    text: "Hai aggiornato il tuo profilo",
    date: "3 giorni fa",
  },
];

function getStatusClasses(status) {
  switch (status) {
    case "Upcoming":
      return "border-cyan-500/30 bg-cyan-500/10 text-cyan-300";
    case "Planned":
      return "border-violet-500/30 bg-violet-500/10 text-violet-300";
    case "Success":
      return "border-emerald-500/30 bg-emerald-500/10 text-emerald-300";
    case "Failed":
      return "border-red-500/30 bg-red-500/10 text-red-300";
    default:
      return "border-slate-700 bg-slate-800 text-slate-300";
  }
}

export const metadata = {
  title: "Dashboard utente",
  description:
    "Area personale dell'utente per missioni preferite e attività recenti.",
};

export default function UserDashboardPage() {
  const user = {
    name: "Pippo Rossi",
    username: "PIPPO",
    email: "pippo@email.com",
    role: "USER",
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
            User Dashboard
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Benvenuto, {user.name}
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Qui puoi gestire il tuo profilo, tenere d’occhio le missioni salvate
            e controllare la tua attività recente.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_2fr]">
          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500 text-xl font-bold text-slate-950">
                  {user.username.slice(0, 2)}
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {user.name}
                  </h2>
                  <p className="text-sm text-slate-400">@{user.username}</p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Email
                  </p>
                  <p className="mt-2 text-sm text-slate-200">{user.email}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Ruolo
                  </p>
                  <p className="mt-2 text-sm text-slate-200">{user.role}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <Link
                  href="/profile"
                  className="inline-flex items-center justify-center rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                >
                  Vai al profilo
                </Link>

                <Link
                  href="/change-password"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-400"
                >
                  Cambia password
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
              <h3 className="text-lg font-semibold text-white">
                Azioni rapide
              </h3>

              <div className="mt-5 grid gap-3">
                <Link
                  href="/missions"
                  className="rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-400 hover:text-cyan-400"
                >
                  Esplora missioni
                </Link>

                <Link
                  href="/favorites"
                  className="rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-400 hover:text-cyan-400"
                >
                  Vai ai preferiti
                </Link>

                <Link
                  href="/rockets"
                  className="rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-400 hover:text-cyan-400"
                >
                  Guarda i razzi
                </Link>
              </div>
            </div>
          </aside>

          <div className="space-y-8">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
                <p className="text-sm text-slate-400">Missioni preferite</p>
                <p className="mt-2 text-3xl font-bold text-white">8</p>
              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
                <p className="text-sm text-slate-400">Missioni seguite</p>
                <p className="mt-2 text-3xl font-bold text-white">3</p>
              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
                <p className="text-sm text-slate-400">Attività recenti</p>
                <p className="mt-2 text-3xl font-bold text-white">12</p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-white">
                    Missioni preferite
                  </h2>
                  <p className="mt-2 text-sm text-slate-400">
                    Le missioni che hai salvato per seguirle più facilmente.
                  </p>
                </div>

                <Link
                  href="/favorites"
                  className="text-sm font-medium text-cyan-400 transition hover:text-cyan-300"
                >
                  Vedi tutte
                </Link>
              </div>

              <div className="mt-6 grid gap-4">
                {favoriteMissions.map((mission) => (
                  <article
                    key={mission.id}
                    className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <span
                            className={`rounded-full border px-3 py-1 text-xs font-medium ${getStatusClasses(
                              mission.status,
                            )}`}
                          >
                            {mission.status}
                          </span>
                          <span className="text-sm text-slate-400">
                            {mission.date}
                          </span>
                        </div>

                        <h3 className="mt-3 text-xl font-semibold text-white">
                          {mission.name}
                        </h3>
                      </div>

                      <Link
                        href={`/missions/${mission.slug}`}
                        className="inline-flex items-center justify-center rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-cyan-400 hover:text-cyan-400"
                      >
                        Dettagli
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
              <h2 className="text-2xl font-semibold text-white">
                Attività recente
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Gli ultimi movimenti nel tuo account.
              </p>

              <div className="mt-6 space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4"
                  >
                    <p className="text-sm text-slate-200">{activity.text}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.2em] text-slate-500">
                      {activity.date}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
