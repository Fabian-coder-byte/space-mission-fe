"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const STATUS_COLORS = {
  SCHEDULED: "#22d3ee",
  CONFIRMED: "#a78bfa",
  DELAYED: "#fbbf24",
  COMPLETED: "#34d399",
  CANCELLED: "#f87171",
  SCRUBBED: "#fb923c",
};

const STATUS_LABELS = {
  SCHEDULED: "Programmata",
  CONFIRMED: "Confermata",
  DELAYED: "Ritardata",
  COMPLETED: "Completata",
  CANCELLED: "Annullata",
  SCRUBBED: "Annullata",
};

function formatMonth(monthKey) {
  const [year, month] = monthKey.split("-");
  return new Intl.DateTimeFormat("it-IT", { month: "short", year: "2-digit" }).format(
    new Date(Number(year), Number(month) - 1),
  );
}

function formatLaunchDate(dateStr) {
  if (!dateStr) return "—";
  return new Intl.DateTimeFormat("it-IT", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(dateStr));
}

function CustomBarTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm shadow-xl">
      <p className="font-semibold text-white">{label}</p>
      <p className="mt-1 text-cyan-400">{payload[0].value} missioni</p>
    </div>
  );
}

function CustomPieTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm shadow-xl">
      <p className="font-semibold text-white">
        {STATUS_LABELS[payload[0].name] ?? payload[0].name}
      </p>
      <p className="mt-1 text-cyan-400">{payload[0].value} missioni</p>
    </div>
  );
}

export default function LaunchCharts({ data }) {
  const { upcoming = [], byMonth = [], byStatus = [] } = data;

  const barData = byMonth.map((d) => ({
    name: formatMonth(d.month),
    count: d.count,
  }));

  const pieData = byStatus
    .filter((s) => s.count > 0)
    .map((s) => ({ name: s.status, value: s.count }));

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
        <h2 className="text-2xl font-semibold text-white">
          Missioni nel tempo
        </h2>
        <p className="mt-2 text-sm text-slate-400">
          Numero di missioni per mese negli ultimi 12 mesi.
        </p>

        <div className="mt-6 h-56">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis
                dataKey="name"
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomBarTooltip />} cursor={{ fill: "rgba(34,211,238,0.06)" }} />
              <Bar dataKey="count" fill="#22d3ee" radius={[6, 6, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {pieData.length > 0 && (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <h2 className="text-2xl font-semibold text-white">
              Stato missioni
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Distribuzione per stato di tutte le missioni.
            </p>

            <div className="mt-6 h-52">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry) => (
                      <Cell
                        key={entry.name}
                        fill={STATUS_COLORS[entry.name] ?? "#64748b"}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomPieTooltip />} />
                  <Legend
                    formatter={(value) => (
                      <span style={{ color: "#94a3b8", fontSize: 12 }}>
                        {STATUS_LABELS[value] ?? value}
                      </span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="text-2xl font-semibold text-white">
            Prossimi lanci
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Missioni programmate nei prossimi 6 mesi.
          </p>

          <div className="mt-5 space-y-3">
            {upcoming.length === 0 ? (
              <p className="text-sm text-slate-400">
                Nessun lancio imminente disponibile.
              </p>
            ) : (
              upcoming.slice(0, 5).map((m) => (
                <div
                  key={m.id}
                  className="flex items-start justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-950/60 p-4"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-white">
                      {m.name}
                    </p>
                    {m.agency?.name && (
                      <p className="mt-0.5 text-xs text-slate-400">
                        {m.agency.name}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-cyan-400">
                      {formatLaunchDate(m.launchDate)}
                    </p>
                  </div>
                  <span
                    className={`mt-0.5 shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                      m.status === "CONFIRMED"
                        ? "border-violet-500/30 bg-violet-500/10 text-violet-300"
                        : "border-cyan-500/30 bg-cyan-500/10 text-cyan-300"
                    }`}
                  >
                    {m.status === "CONFIRMED" ? "Conf." : "Prog."}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
