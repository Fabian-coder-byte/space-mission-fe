import Link from "next/link";

export const metadata = {
  title: "Profilo",
  description: "Profilo utente e impostazioni account.",
};

export default function ProfilePage() {
  const user = {
    name: "Pippo Rossi",
    username: "PIPPO",
    email: "pippo@email.com",
    role: "USER",
    joinedAt: "12 Marzo 2026",
    bio: "Appassionato di tecnologia, spazio e missioni orbitali.",
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
            Profilo utente
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Il tuo profilo
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Gestisci le informazioni del tuo account e tieni sotto controllo le
            impostazioni principali.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1.9fr]">
          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-cyan-500 text-2xl font-bold text-slate-950">
                  {user.username.slice(0, 2)}
                </div>

                <h2 className="mt-4 text-2xl font-semibold text-white">
                  {user.name}
                </h2>

                <p className="mt-1 text-sm text-slate-400">@{user.username}</p>

                <span className="mt-4 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-cyan-300">
                  {user.role}
                </span>
              </div>

              <div className="mt-8 space-y-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Email
                  </p>
                  <p className="mt-2 text-sm text-slate-200">{user.email}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Iscritto dal
                  </p>
                  <p className="mt-2 text-sm text-slate-200">{user.joinedAt}</p>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <Link
                  href="/change-password"
                  className="inline-flex items-center justify-center rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                >
                  Cambia password
                </Link>

                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-400"
                >
                  Torna alla dashboard
                </Link>
              </div>
            </div>
          </aside>

          <div className="space-y-8">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-white">
                    Informazioni personali
                  </h2>
                  <p className="mt-2 text-sm text-slate-400">
                    Aggiorna i dati principali del tuo account.
                  </p>
                </div>
              </div>

              <form className="mt-8 space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-slate-200"
                    >
                      Nome completo
                    </label>
                    <input
                      id="name"
                      type="text"
                      defaultValue={user.name}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="username"
                      className="mb-2 block text-sm font-medium text-slate-200"
                    >
                      Username
                    </label>
                    <input
                      id="username"
                      type="text"
                      defaultValue={user.username}
                      className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-200"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    defaultValue={user.email}
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="bio"
                    className="mb-2 block text-sm font-medium text-slate-200"
                  >
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    rows={5}
                    defaultValue={user.bio}
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  />
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                  >
                    Salva modifiche
                  </button>

                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-2xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-400"
                  >
                    Annulla
                  </button>
                </div>
              </form>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
              <h2 className="text-2xl font-semibold text-white">
                Sicurezza account
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Gestisci le impostazioni legate alla sicurezza del tuo profilo.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                  <p className="text-sm font-medium text-white">Password</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Aggiorna la password del tuo account per mantenerlo sicuro.
                  </p>

                  <Link
                    href="/change-password"
                    className="mt-4 inline-flex text-sm font-medium text-cyan-400 transition hover:text-cyan-300"
                  >
                    Cambia password
                  </Link>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
                  <p className="text-sm font-medium text-white">Accesso</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Controlla le impostazioni base del tuo account e le sessioni
                    future.
                  </p>

                  <Link
                    href="/dashboard"
                    className="mt-4 inline-flex text-sm font-medium text-cyan-400 transition hover:text-cyan-300"
                  >
                    Vai alla dashboard
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
