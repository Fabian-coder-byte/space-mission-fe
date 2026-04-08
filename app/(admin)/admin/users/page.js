import Link from "next/link";

const users = [
  {
    id: "7b8b1d1d-1111-4c1a-9d11-aaaa1111aaaa",
    email: "admin@spacemission.com",
    username: "ADMIN01",
    fullName: "Mario Admin",
    role: "ADMIN",
    status: "ACTIVE",
    emailConfirmed: true,
    provider: "email",
    createdAt: "2026-04-01T10:20:00.000Z",
    lastSignInAt: "2026-04-08T08:30:00.000Z",
  },
  {
    id: "7b8b1d1d-2222-4c1a-9d11-bbbb2222bbbb",
    email: "fabian@example.com",
    username: "FABIAN",
    fullName: "Fabian Rossi",
    role: "USER",
    status: "ACTIVE",
    emailConfirmed: true,
    provider: "google",
    createdAt: "2026-04-02T09:10:00.000Z",
    lastSignInAt: "2026-04-07T19:12:00.000Z",
  },
  {
    id: "7b8b1d1d-3333-4c1a-9d11-cccc3333cccc",
    email: "testuser@example.com",
    username: "TESTUSER",
    fullName: "Utente Demo",
    role: "USER",
    status: "PENDING",
    emailConfirmed: false,
    provider: "email",
    createdAt: "2026-04-06T14:45:00.000Z",
    lastSignInAt: null,
  },
  {
    id: "7b8b1d1d-4444-4c1a-9d11-dddd4444dddd",
    email: "moderator@spacemission.com",
    username: "MOD01",
    fullName: "Giulia Moderator",
    role: "MODERATOR",
    status: "SUSPENDED",
    emailConfirmed: true,
    provider: "email",
    createdAt: "2026-03-28T16:00:00.000Z",
    lastSignInAt: "2026-04-05T11:00:00.000Z",
  },
];

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

function getStatusClasses(status) {
  switch (status) {
    case "ACTIVE":
      return "border border-emerald-500/20 bg-emerald-500/15 text-emerald-300";
    case "PENDING":
      return "border border-amber-500/20 bg-amber-500/15 text-amber-300";
    case "SUSPENDED":
      return "border border-red-500/20 bg-red-500/15 text-red-300";
    default:
      return "border border-slate-600 bg-slate-700/40 text-slate-300";
  }
}

export default function AdminUsersPage() {
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

        <Link
          href="/admin/users/new"
          className="rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          + Nuovo utente
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-5">
          <p className="text-sm text-slate-400">Totale utenti</p>
          <p className="mt-3 text-3xl font-bold text-white">{users.length}</p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-5">
          <p className="text-sm text-slate-400">Attivi</p>
          <p className="mt-3 text-3xl font-bold text-white">
            {users.filter((u) => u.status === "ACTIVE").length}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-5">
          <p className="text-sm text-slate-400">Email confermate</p>
          <p className="mt-3 text-3xl font-bold text-white">
            {users.filter((u) => u.emailConfirmed).length}
          </p>
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
            <p className="text-sm text-slate-400">
              Vista pronta da collegare a Supabase Auth
            </p>
          </div>

          <div className="flex flex-col gap-3 md:flex-row">
            <input
              type="text"
              placeholder="Cerca per email o username..."
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white outline-none transition focus:border-cyan-400"
            />
            <select className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white outline-none transition focus:border-cyan-400">
              <option value="">Tutti i ruoli</option>
              <option value="ADMIN">ADMIN</option>
              <option value="MODERATOR">MODERATOR</option>
              <option value="USER">USER</option>
            </select>
            <select className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white outline-none transition focus:border-cyan-400">
              <option value="">Tutti gli stati</option>
              <option value="ACTIVE">ACTIVE</option>
              <option value="PENDING">PENDING</option>
              <option value="SUSPENDED">SUSPENDED</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/70 text-xs uppercase tracking-[0.18em] text-slate-400">
              <tr>
                <th className="px-6 py-4">Utente</th>
                <th className="px-6 py-4">Ruolo</th>
                <th className="px-6 py-4">Stato</th>
                <th className="px-6 py-4">Email confermata</th>
                <th className="px-6 py-4">Provider</th>
                <th className="px-6 py-4">Creato il</th>
                <th className="px-6 py-4">Ultimo accesso</th>
                <th className="px-6 py-4 text-right">Azioni</th>
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
                        {user.fullName}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        {user.email}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        @{user.username}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-4 align-middle">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getRoleClasses(
                        user.role,
                      )}`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="px-6 py-4 align-middle">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusClasses(
                        user.status,
                      )}`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 align-middle">
                    {user.emailConfirmed ? "Sì" : "No"}
                  </td>

                  <td className="px-6 py-4 align-middle">{user.provider}</td>

                  <td className="px-6 py-4 align-middle">
                    {formatDate(user.createdAt)}
                  </td>

                  <td className="px-6 py-4 align-middle">
                    {formatDate(user.lastSignInAt)}
                  </td>

                  <td className="px-6 py-4 align-middle">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/users/${user.id}`}
                        className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-200 transition hover:bg-slate-800"
                      >
                        Dettaglio
                      </Link>
                      <Link
                        href={`/admin/users/${user.id}/edit`}
                        className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-200 transition hover:bg-slate-800"
                      >
                        Modifica
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}

              {users.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-10 text-center text-sm text-slate-400"
                  >
                    Nessun utente disponibile.
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
