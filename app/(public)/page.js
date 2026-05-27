import Link from "next/link";
import { serverFetch } from "@/lib/api/server";
import Countdown from "@/components/countdown";

function formatLaunchDate(dateStr) {
  if (!dateStr) return "Data non confermata";
  return new Intl.DateTimeFormat("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  }).format(new Date(dateStr)) + " UTC";
}

const sections = [
  {
    title: "Missioni",
    description:
      "Scopri i prossimi lanci spaziali, i dettagli delle missioni e le date più importanti.",
    href: "/missions",
  },
  {
    title: "Razzi",
    description:
      "Esplora i razzi utilizzati nelle missioni, con caratteristiche tecniche e stato operativo.",
    href: "/rockets",
  },
  {
    title: "Agenzie",
    description:
      "Consulta le agenzie spaziali coinvolte nelle missioni e i loro programmi principali.",
    href: "/agencies",
  },
  {
    title: "Launch Sites",
    description:
      "Visualizza i siti di lancio in tutto il mondo e scopri da dove partono le missioni.",
    href: "/launch-sites",
  },
];

export default async function HomePage() {
  const [upcomingMissions, stats] = await Promise.all([
    serverFetch("/missions/upcoming?limit=1"),
    serverFetch("/stats"),
  ]);

  const nextMission = upcomingMissions?.[0] ?? null;

  const statsDisplay = [
    { label: "Missioni monitorate", value: stats?.missions ?? "—" },
    { label: "Agenzie spaziali", value: stats?.agencies ?? "—" },
    { label: "Razzi catalogati", value: stats?.rockets ?? "—" },
    { label: "Launch sites", value: stats?.launchSites ?? "—" },
  ];

  return (
    <main>
      <section className="relative overflow-hidden border-b border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col px-6 py-24 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
              Space Mission Tracker
            </p>

            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Esplora le prossime missioni spaziali, i razzi e le agenzie che
              spingono l&apos;umanità oltre l&apos;orbita.
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Un portale dedicato ai lanci futuri, alle missioni in programma,
              ai veicoli spaziali e ai principali siti di lancio nel mondo.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/missions"
                className="inline-flex items-center justify-center rounded-xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Vai alle missioni
              </Link>

              <Link
                href="/rockets"
                className="inline-flex items-center justify-center rounded-xl border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-400"
              >
                Scopri i razzi
              </Link>
            </div>
          </div>

          <div className="mt-14 lg:mt-0 lg:w-[420px]">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl backdrop-blur">
              <div className="mb-6 flex items-center justify-between">
                <span className="text-sm uppercase tracking-[0.25em] text-slate-400">
                  Prossimo lancio
                </span>
                <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
                  {nextMission ? "In programma" : "Nessun lancio"}
                </span>
              </div>

              {nextMission ? (
                <>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-slate-400">Missione</p>
                      <h2 className="text-2xl font-semibold text-white">
                        {nextMission.name}
                      </h2>
                    </div>

                    {nextMission.agency && (
                      <div>
                        <p className="text-sm text-slate-400">Agenzia</p>
                        <p className="text-slate-200">{nextMission.agency.name}</p>
                      </div>
                    )}

                    {nextMission.rocket && (
                      <div>
                        <p className="text-sm text-slate-400">Razzo</p>
                        <p className="text-slate-200">{nextMission.rocket.name}</p>
                      </div>
                    )}

                    <div>
                      <p className="text-sm text-slate-400">Data lancio</p>
                      <p className="text-slate-200">
                        {formatLaunchDate(nextMission.launchDate)}
                      </p>
                    </div>

                    {nextMission.launchSite && (
                      <div>
                        <p className="text-sm text-slate-400">Sito di lancio</p>
                        <p className="text-slate-200">{nextMission.launchSite.name}</p>
                      </div>
                    )}
                  </div>

                  {nextMission.launchDate && (
                    <div className="mt-6">
                      <p className="mb-3 text-xs uppercase tracking-[0.2em] text-slate-500">
                        Countdown al lancio
                      </p>
                      <Countdown launchDate={nextMission.launchDate} />
                    </div>
                  )}

                  <div className="mt-6">
                    <Link
                      href={`/missions/${nextMission.id}`}
                      className="inline-flex w-full items-center justify-center rounded-xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                    >
                      Dettagli missione
                    </Link>
                  </div>
                </>
              ) : (
                <div className="py-8 text-center text-slate-400">
                  Nessuna missione in programma
                </div>
              )}

              <div className="mt-3">
                <Link
                  href="/missions"
                  className="inline-flex w-full items-center justify-center rounded-xl border border-slate-700 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-cyan-400 hover:text-cyan-400"
                >
                  Vedi tutte le missioni
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-800 bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {statsDisplay.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
              >
                <p className="text-sm text-slate-400">{stat.label}</p>
                <p className="mt-2 text-3xl font-bold text-white">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
            Esplora il portale
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Tutto ciò che ti serve per seguire il mondo delle missioni spaziali
          </h2>
          <p className="mt-4 text-slate-300">
            Naviga tra missioni, veicoli, agenzie e basi di lancio con una
            struttura semplice e pronta a crescere.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {sections.map((section) => (
            <Link
              key={section.title}
              href={section.href}
              className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition hover:border-cyan-400/50 hover:bg-slate-900"
            >
              <div className="flex h-full flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-white transition group-hover:text-cyan-400">
                    {section.title}
                  </h3>
                  <p className="mt-3 leading-7 text-slate-300">
                    {section.description}
                  </p>
                </div>

                <span className="mt-6 inline-flex items-center text-sm font-medium text-cyan-400">
                  Apri sezione →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
