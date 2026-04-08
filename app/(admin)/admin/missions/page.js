import Link from "next/link";

const missions = [
  {
    id: "1",
    name: "Artemis Explorer I",
    status: "Upcoming",
    agency: "NASA / ESA",
  },
  { id: "2", name: "Mars Probe Alpha", status: "Planned", agency: "NASA" },
];

export default function AdminMissionsPage() {
  return (
    <main className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
            Admin
          </p>
          <h1 className="mt-2 text-3xl font-bold">Gestione missioni</h1>
        </div>

        <Link
          href="/admin/missions/new"
          className="rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950"
        >
          Nuova missione
        </Link>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-800 text-slate-400">
            <tr>
              <th className="px-6 py-4">Nome</th>
              <th className="px-6 py-4">Agenzia</th>
              <th className="px-6 py-4">Stato</th>
              <th className="px-6 py-4 text-right">Azioni</th>
            </tr>
          </thead>
          <tbody>
            {missions.map((mission) => (
              <tr key={mission.id} className="border-b border-slate-800/60">
                <td className="px-6 py-4">{mission.name}</td>
                <td className="px-6 py-4">{mission.agency}</td>
                <td className="px-6 py-4">{mission.status}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-3">
                    <Link
                      href={`/admin/missions/${mission.id}`}
                      className="text-slate-300"
                    >
                      Dettagli
                    </Link>
                    <Link
                      href={`/admin/missions/${mission.id}/edit`}
                      className="text-cyan-400"
                    >
                      Modifica
                    </Link>
                    <button className="text-red-300">Elimina</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
