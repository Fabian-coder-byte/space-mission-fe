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
  };

  if (!user) redirect("/login");
  if (user.role !== "ADMIN") redirect("/dashboard");

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
        <div className="flex items-center justify-between px-4 py-4 md:px-6">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-cyan-400">
              Admin Panel
            </p>
            <h1 className="text-lg font-semibold">Space Mission Admin</h1>
          </div>

          <div className="flex items-center gap-4 text-sm text-slate-400">
            <span>{user.username}</span>
            <Link
              href="/"
              className="rounded-xl border border-slate-700 px-4 py-2 text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              Vai al sito
            </Link>
          </div>
        </div>

        <nav className="overflow-x-auto border-t border-slate-800 px-4 py-3 md:px-6">
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

      <main className="p-4 md:p-6">{children}</main>
    </div>
  );
}
