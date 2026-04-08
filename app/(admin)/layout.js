// app/(admin)/layout.js
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }) {
  const user = {
    username: "PIPPO",
    role: "ADMIN",
  };

  if (!user) redirect("/login");
  if (user.role !== "ADMIN") redirect("/dashboard");

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex max-w-7xl gap-6 px-6 py-8">
        <aside className="w-72 rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="text-xl font-semibold">Admin</h2>

          <nav className="mt-6 flex flex-col gap-3 text-sm">
            <Link href="/admin">Dashboard</Link>
            <Link href="/admin/missions">Missioni</Link>
            <Link href="/admin/rockets">Razzi</Link>
            <Link href="/admin/agencies">Agenzie</Link>
            <Link href="/admin/launch-sites">Launch Sites</Link>
          </nav>
        </aside>

        <section className="flex-1">{children}</section>
      </div>
    </div>
  );
}
