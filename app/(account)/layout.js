// app/(account)/layout.js
import { redirect } from "next/navigation";

export default async function AccountLayout({ children }) {
  const user = {
    username: "PIPPO",
    role: "ADMIN",
  };

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-4xl px-6 py-12">{children}</div>
    </main>
  );
}
