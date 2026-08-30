export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Haven Real Estate. Demo data — listings are fictional.</p>
        <p>Map data © OpenStreetMap contributors</p>
      </div>
    </footer>
  );
}
