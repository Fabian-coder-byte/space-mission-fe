"use client";

export default function ConfirmModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  isLoading,
}) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={isLoading ? undefined : onCancel}
      />

      <div className="relative w-full max-w-md rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-2xl shadow-black/60">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 ring-1 ring-red-500/30">
          <svg
            className="h-6 w-6 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>

        <h2 className="mt-4 text-xl font-semibold text-white">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">{message}</p>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="inline-flex items-center justify-center rounded-2xl border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-slate-800 disabled:opacity-50"
          >
            Annulla
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="inline-flex items-center justify-center rounded-2xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-500 disabled:opacity-60"
          >
            {isLoading ? "Eliminazione..." : "Sì, elimina"}
          </button>
        </div>
      </div>
    </div>
  );
}
