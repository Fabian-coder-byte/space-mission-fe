import Link from "next/link";
import { redirect } from "next/navigation";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/missions", label: "Missioni" },
  { href: "/admin/rockets", label: "Razzi" },
  { href: "/admin/agencies", label: "Agenzie" },
  { href: "/admin/launch-sites", label: "Launch Sites" },
  { href: "/admin/users", label: "Utenti" },
  { href: "/admin/settings", label: "Impostazioni" },
];

export default async function AdminLayout({ children }) {
  const user = {
    username: "PIPPO",
    role: "ADMIN",
    fullName: "Pippo Rossi",
    email: "pippo@example.com",
  };

  if (!user) redirect("/login");
  if (user.role !== "ADMIN") redirect("/dashboard");

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
        <div className="border-b border-slate-800">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500/15 ring-1 ring-cyan-500/30">
                <span className="text-sm font-bold text-cyan-400">SM</span>
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-cyan-400">
                  Admin Panel
                </p>
                <h1 className="text-lg font-semibold text-white">
                  Space Mission Admin
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="hidden rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white md:inline-flex"
              >
                Vai al sito
              </Link>

              <details className="group relative">
                <summary className="flex cursor-pointer list-none items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900 px-3 py-2 transition hover:border-slate-700 hover:bg-slate-800">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/15 text-sm font-bold text-cyan-400 ring-1 ring-cyan-500/30">
                    {user.username.slice(0, 2)}
                  </div>

                  <div className="hidden text-left md:block">
                    <p className="text-sm font-semibold text-white">
                      {user.fullName}
                    </p>
                    <p className="text-xs text-slate-400">
                      {user.role} · {user.username}
                    </p>
                  </div>

                  <svg
                    className="h-4 w-4 text-slate-400 transition group-open:rotate-180"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.51a.75.75 0 01-1.08 0l-4.25-4.51a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </summary>

                <div className="absolute right-0 mt-3 w-72 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-black/40">
                  <div className="border-b border-slate-800 px-4 py-4">
                    <p className="text-sm font-semibold text-white">
                      {user.fullName}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">{user.email}</p>
                    <div className="mt-3 inline-flex rounded-full bg-cyan-500/15 px-3 py-1 text-xs font-medium text-cyan-400 ring-1 ring-cyan-500/30">
                      {user.role}
                    </div>
                  </div>

                  <div className="p-2">
                    <Link
                      href="/admin/profile"
                      className="flex items-center rounded-xl px-3 py-2.5 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                    >
                      Profilo
                    </Link>

                    <Link
                      href="/change-password"
                      className="flex items-center rounded-xl px-3 py-2.5 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
                    >
                      Cambia password
                    </Link>

                    <Link
                      href="/"
                      className="mt-1 flex items-center rounded-xl px-3 py-2.5 text-sm text-red-400 transition hover:bg-red-500/10"
                    >
                      Logout
                    </Link>
                  </div>
                </div>
              </details>
            </div>
          </div>
        </div>

        <nav className="mx-auto max-w-7xl overflow-x-auto px-4 py-3 md:px-6">
          <div className="flex min-w-max gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-7xl p-4 md:p-6">{children}</main>
    </div>
  );
}
