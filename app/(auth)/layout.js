export default function AuthLayout({ children }) {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-12">
        {children}
      </div>
    </main>
  );
}
