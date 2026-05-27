"use client";

import { deleteRocket } from "@/lib/api/rockets";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteRocketButtonList({ id }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Sei sicuro di voler eliminare questo razzo?",
    );

    if (!confirmed) return;

    try {
      setIsDeleting(true);

      await deleteRocket(id);

      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Errore durante l'eliminazione del razzo");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      className="rounded-lg border border-red-500/30 px-3 py-2 text-xs font-medium text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isDeleting ? "Elimino..." : "Elimina"}
    </button>
  );
}
