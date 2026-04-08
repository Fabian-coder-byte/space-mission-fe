"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function ProfileMenu({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const initials =
    user?.username?.slice(0, 2)?.toUpperCase() ||
    user?.name?.slice(0, 2)?.toUpperCase() ||
    "US";

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-3 rounded-full border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-200 transition hover:border-cyan-400 hover:text-white"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500 font-semibold text-slate-950">
          {initials}
        </span>

        <span className="hidden text-left sm:block">
          <span className="block text-sm font-medium text-white">
            {user.username}
          </span>
          <span className="block text-xs uppercase tracking-[0.2em] text-slate-400">
            {user.role}
          </span>
        </span>

        <svg
          className={`h-4 w-4 text-slate-400 transition ${isOpen ? "rotate-180" : ""}`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.512a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-3 w-64 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/95 shadow-2xl backdrop-blur">
          <div className="border-b border-slate-800 px-4 py-4">
            <p className="text-sm font-semibold text-white">{user.name}</p>
            <p className="mt-1 text-sm text-slate-400">@{user.username}</p>
          </div>

          <div className="p-2">
            <Link
              href="/profile"
              className="flex items-center rounded-xl px-3 py-2.5 text-sm text-slate-200 transition hover:bg-slate-800 hover:text-cyan-400"
              onClick={() => setIsOpen(false)}
            >
              Profilo
            </Link>

            <Link
              href="/change-password"
              className="flex items-center rounded-xl px-3 py-2.5 text-sm text-slate-200 transition hover:bg-slate-800 hover:text-cyan-400"
              onClick={() => setIsOpen(false)}
            >
              Cambia password
            </Link>

            {user.role === "ADMIN" && (
              <Link
                href="/admin"
                className="flex items-center rounded-xl px-3 py-2.5 text-sm text-slate-200 transition hover:bg-slate-800 hover:text-cyan-400"
                onClick={() => setIsOpen(false)}
              >
                Admin dashboard
              </Link>
            )}

            <div className="my-2 border-t border-slate-800" />

            <button
              type="button"
              className="flex w-full items-center rounded-xl px-3 py-2.5 text-left text-sm text-red-300 transition hover:bg-red-500/10 hover:text-red-200"
              onClick={() => {
                setIsOpen(false);
                console.log("logout");
              }}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
