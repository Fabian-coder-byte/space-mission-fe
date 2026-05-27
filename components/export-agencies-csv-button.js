"use client";

import { toast } from "sonner";
import { exportAgenciesCsv } from "@/lib/api/agency";

export default function ExportAgenciesCsvButton() {
  async function handleExport() {
    try {
      const blob = await exportAgenciesCsv();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "agencies.csv";

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("CSV esportato con successo");
    } catch (error) {
      console.error(error);
      toast.error("Errore durante l'esportazione CSV");
    }
  }

  return (
    <button
      type="button"
      onClick={handleExport}
      className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-800"
    >
      Esporta CSV
    </button>
  );
}
