"use client";

import { useState, useRef, useEffect } from "react";
import {
  importAll,
  importAgencies,
  importRockets,
  importLaunchSites,
  importMissions,
} from "@/lib/api/import";

const JOBS = [
  { key: "all", label: "Importa tutto", fn: importAll, accent: "cyan" },
  { key: "agencies", label: "Agenzie", fn: importAgencies, accent: "violet" },
  { key: "rockets", label: "Razzi", fn: importRockets, accent: "violet" },
  { key: "launch-sites", label: "Launch Sites", fn: importLaunchSites, accent: "violet" },
  { key: "missions", label: "Missioni", fn: importMissions, accent: "violet" },
];

function Badge({ accent, children }) {
  const cls =
    accent === "cyan"
      ? "bg-cyan-500/15 text-cyan-300 border-cyan-500/30"
      : "bg-violet-500/15 text-violet-300 border-violet-500/30";
  return (
    <span className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-medium ${cls}`}>
      {children}
    </span>
  );
}

export default function ImportDataPanel() {
  const [open, setOpen] = useState(false);
  const [running, setRunning] = useState(null);
  const [results, setResults] = useState({});
  const [lastRun, setLastRun] = useState(null);
  const panelRef = useRef(null);

  useEffect(() => {
    function onClick(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  async function run(job) {
    if (running) return;
    setRunning(job.key);
    setResults((prev) => ({ ...prev, [job.key]: null }));

    try {
      const data = await job.fn();
      const list = Array.isArray(data) ? data : [data];
      const total = list.reduce((s, r) => s + (r.created ?? 0), 0);
      const errors = list.reduce((s, r) => s + (r.errors ?? 0), 0);
      setResults((prev) => ({ ...prev, [job.key]: { total, errors, list } }));
      setLastRun(new Date().toLocaleTimeString("it-IT"));
    } catch (err) {
      setResults((prev) => ({
        ...prev,
        [job.key]: { error: err.message || "Errore durante l'importazione" },
      }));
    } finally {
      setRunning(null);
    }
  }

  const isAnyRunning = running !== null;

  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm font-medium text-slate-200 transition hover:border-cyan-500/50 hover:text-white"
        title="Importa dati da API esterne"
      >
        <svg
          className="h-4 w-4 text-cyan-400"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
          />
        </svg>
        <span className="hidden sm:inline">Importa dati</span>
        {isAnyRunning && (
          <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl shadow-black/50">
          <div className="border-b border-slate-800 px-4 py-3">
            <p className="text-sm font-semibold text-white">Importazione dati</p>
            <p className="mt-0.5 text-xs text-slate-400">
              Solo i record con nuovo externalId vengono creati.
            </p>
            {lastRun && (
              <p className="mt-1 text-xs text-slate-500">Ultima esecuzione: {lastRun}</p>
            )}
          </div>

          <div className="p-2">
            {JOBS.map((job) => {
              const res = results[job.key];
              const isThis = running === job.key;

              return (
                <div key={job.key}>
                  {job.key === "all" && (
                    <div className="mb-1 mt-1 px-2">
                      <p className="text-xs uppercase tracking-widest text-slate-500">
                        Importazione completa
                      </p>
                    </div>
                  )}
                  {job.key === "agencies" && (
                    <div className="mb-1 mt-3 px-2">
                      <p className="text-xs uppercase tracking-widest text-slate-500">
                        Singole entità
                      </p>
                    </div>
                  )}

                  <button
                    onClick={() => run(job)}
                    disabled={isAnyRunning}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm transition
                      ${job.key === "all"
                        ? "bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 hover:text-cyan-200"
                        : "hover:bg-slate-800 text-slate-300 hover:text-white"
                      } disabled:cursor-not-allowed disabled:opacity-40`}
                  >
                    <span className="font-medium">{job.label}</span>
                    <span className="shrink-0">
                      {isThis ? (
                        <svg
                          className="h-4 w-4 animate-spin text-cyan-400"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                          />
                        </svg>
                      ) : res ? (
                        res.error ? (
                          <span className="text-xs text-red-400">Errore</span>
                        ) : (
                          <Badge accent="cyan">+{res.total} nuovi</Badge>
                        )
                      ) : null}
                    </span>
                  </button>

                  {res?.error && (
                    <p className="px-3 py-1 text-xs text-red-400">{res.error}</p>
                  )}

                  {res?.list && job.key === "all" && (
                    <div className="mx-3 mb-1 mt-1 space-y-0.5 rounded-lg bg-slate-950/60 p-2">
                      {res.list.map((r) => (
                        <div key={r.entity} className="flex justify-between text-xs">
                          <span className="text-slate-400">{r.entity}</span>
                          <span className="text-slate-300">
                            +{r.created} nuovi · {r.skipped} già presenti
                            {r.errors > 0 && (
                              <span className="ml-1 text-red-400">{r.errors} errori</span>
                            )}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="border-t border-slate-800 px-4 py-3">
            <p className="text-xs text-slate-500">
              Il job automatico gira ogni notte alle 03:00 (Europe/Rome).
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
