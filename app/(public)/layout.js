import Link from "next/link";
import ProfileMenu from "@/components/profile-menu";

export default function PublicLayout({ children }) {
  const user = {
    name: "Pippo Rossi",
    role: "USER",
    username: "PIPPO",
  };

  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.15),_transparent_35%),radial-gradient(circle_at_bottom,_rgba(99,102,241,0.12),_transparent_30%)]" />

      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="text-lg font-semibold tracking-wide text-white transition hover:text-cyan-400"
          >
            Space Mission
          </Link>

          <nav className="flex items-center gap-6 text-sm text-slate-300">
            <Link href="/" className="transition hover:text-cyan-400">
              Home
            </Link>
            <Link href="/missions" className="transition hover:text-cyan-400">
              Missioni
            </Link>
            <Link href="/rockets" className="transition hover:text-cyan-400">
              Razzi
            </Link>
            <Link href="/agencies" className="transition hover:text-cyan-400">
              Agenzie
            </Link>
            <Link
              href="/launch-sites"
              className="transition hover:text-cyan-400"
            >
              Launch Sites
            </Link>

            {user ? (
              <ProfileMenu user={user} />
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login" className="transition hover:text-cyan-400">
                  Login
                </Link>
                <Link
                  href="/register"
                  className="rounded-xl bg-cyan-500 px-4 py-2 font-semibold text-slate-950 transition hover:bg-cyan-400"
                >
                  Registrati
                </Link>
              </div>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-slate-800 bg-slate-950/80">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-6 py-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Space Mission. Tutti i diritti
            riservati.
          </p>
          <p className="text-slate-500">
            Esplora il calendario dei prossimi lanci spaziali.
          </p>
        </div>
      </footer>
    </div>
  );
}
