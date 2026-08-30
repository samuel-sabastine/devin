import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          <span className="grid size-8 place-items-center rounded-md bg-teal-700 text-sm font-bold text-white">H</span>
          Haven
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/listings?status=FOR_SALE" className="hover:text-teal-700">
            Buy
          </Link>
          <Link href="/listings?status=FOR_RENT" className="hover:text-teal-700">
            Rent
          </Link>
          <Link
            href="/listings"
            className="rounded-md bg-teal-700 px-3 py-2 text-white transition-colors hover:bg-teal-800"
          >
            Browse all
          </Link>
        </nav>
      </div>
    </header>
  );
}
