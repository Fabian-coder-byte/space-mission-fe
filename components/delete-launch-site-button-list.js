"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteLaunchSite } from "@/lib/api/launch-sites";
import ConfirmModal from "./confirm-modal";

export default function DeleteLaunchSiteButtonList({ id, redirectTo, size = "sm" }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleConfirm() {
    setLoading(true);
    try {
      await deleteLaunchSite(id);
      toast.success("Launch site eliminato con successo");
      setOpen(false);
      if (redirectTo) router.push(redirectTo);
      else router.refresh();
    } catch (err) {
      toast.error(err?.message || "Errore durante l'eliminazione del launch site");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          size === "sm"
            ? "rounded-lg border border-red-500/30 px-3 py-2 text-xs font-medium text-red-400 transition hover:bg-red-500/10"
            : "rounded-xl border border-red-500/30 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
        }
      >
        Elimina
      </button>

      <ConfirmModal
        isOpen={open}
        title="Elimina launch site"
        message="Sei sicuro di voler eliminare questo launch site? L'operazione non può essere annullata."
        onConfirm={handleConfirm}
        onCancel={() => !loading && setOpen(false)}
        isLoading={loading}
      />
    </>
  );
}
