"use client";

import { getUsersPaginated } from "@/lib/api/users";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function formatDate(date) {
  if (!date) return "—";
  return new Intl.DateTimeFormat("it-IT", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

function getRoleClasses(role) {
  switch (role) {
    case "ADMIN":
      return "border border-red-500/20 bg-red-500/15 text-red-300";
    case "MODERATOR":
      return "border border-violet-500/20 bg-violet-500/15 text-violet-300";
    case "USER":
      return "border border-cyan-500/20 bg-cyan-500/15 text-cyan-300";
    default:
      return "border border-slate-600 bg-slate-700/40 text-slate-300";
  }
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, totalPages: 1 });
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setIsLoading(true);
        const data = await getUsersPaginated(page, 20, search);
        setUsers(data.items || []);
        setMeta(data.meta || { total: 0, page: 1, totalPages: 1 });
      } catch (error) {
        console.error(error);
        toast.error("Errore durante il caricamento degli utenti");
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, [page, search]);

  function handleSearchChange(e) {
    setSearch(e.target.value);
    setPage(1);
  }

  return (
    <main className="space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/50 p-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
            Admin Panel
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white">Utenti</h1>
          <p className="mt-2 text-sm text-slate-400">
            Gestisci gli utenti collegati a Supabase Auth e ai ruoli
            applicativi.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-5">
          <p className="text-sm text-slate-400">Totale utenti</p>
          <p className="mt-3 text-3xl font-bold text-white">{meta.total}</p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-5">
          <p className="text-sm text-slate-400">In questa pagina</p>
          <p className="mt-3 text-3xl font-bold text-white">{users.length}</p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-5">
          <p className="text-sm text-slate-400">Admin</p>
          <p className="mt-3 text-3xl font-bold text-white">
            {users.filter((u) => u.role === "ADMIN").length}
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/50">
        <div className="flex flex-col gap-3 border-b border-slate-800 p-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Gestione utenti
            </h2>
          </div>

          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Cerca per email o username..."
            className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white outline-none transition focus:border-cyan-400"
          />
        </div>

        {isLoading ? (
          <div className="px-6 py-10 text-center text-sm text-slate-400">
            Caricamento...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950/70 text-xs uppercase tracking-[0.18em] text-slate-400">
                <tr>
                  <th className="px-6 py-4">Utente</th>
                  <th className="px-6 py-4">Ruolo</th>
                  <th className="px-6 py-4">Email confermata</th>
                  <th className="px-6 py-4">Provider</th>
                  <th className="px-6 py-4">Creato il</th>
                  <th className="px-6 py-4">Ultimo accesso</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-t border-slate-800 transition hover:bg-slate-800/30"
                  >
                    <td className="px-6 py-4 align-middle">
                      <div>
                        <p className="font-semibold text-white">
                          {user.username || "—"}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {user.email}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 py-4 align-middle">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getRoleClasses(user.role)}`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="px-6 py-4 align-middle">
                      {user.emailConfirmedAt ? "Sì" : "No"}
                    </td>

                    <td className="px-6 py-4 align-middle">{user.provider}</td>

                    <td className="px-6 py-4 align-middle">
                      {formatDate(user.createdAt)}
                    </td>

                    <td className="px-6 py-4 align-middle">
                      {formatDate(user.lastSignInAt)}
                    </td>
                  </tr>
                ))}

                {users.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-10 text-center text-sm text-slate-400"
                    >
                      Nessun utente trovato.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {meta.totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-800 px-6 py-4">
            <p className="text-sm text-slate-400">
              Pagina {meta.page} di {meta.totalPages} · {meta.total} utenti
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Precedente
              </button>
              <button
                onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
                disabled={page === meta.totalPages}
                className="rounded-xl border border-slate-700 px-4 py-2 text-sm text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Successiva
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
