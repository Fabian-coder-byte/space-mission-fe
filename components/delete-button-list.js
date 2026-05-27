"use client";

import { deleteAgency } from "@/lib/api/agency";

export default function DeleteButtonList({ id }) {
  return (
    <button
      className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-200 transition hover:bg-slate-800"
      onClick={() =>
        deleteAgency(id)
          .then(() => {
            alert("Agenzia eliminata con successo");
            // Qui potresti voler ricaricare la lista delle agenzie o aggiornare lo stato
          })
          .catch((error) => {
            console.error("Errore durante l'eliminazione dell'agenzia:", error);
            alert(
              "Si è verificato un errore durante l'eliminazione dell'agenzia",
            );
          })
      }
    >
      Delete
    </button>
  );
}
