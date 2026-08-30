import Link from "next/link";
import { filtersToSearchParams, type ListingFilters } from "@/lib/filters";

export function Pagination({ filters, pageCount }: { filters: ListingFilters; pageCount: number }) {
  if (pageCount <= 1) return null;

  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);
  const linkClass = "rounded-md border border-slate-300 px-3 py-2 text-sm hover:border-teal-600 hover:text-teal-700";

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-2 pt-8">
      {filters.page > 1 && (
        <Link href={`/listings${filtersToSearchParams(filters, { page: filters.page - 1 })}`} className={linkClass}>
          Previous
        </Link>
      )}
      {pages.map((page) => (
        <Link
          key={page}
          href={`/listings${filtersToSearchParams(filters, { page })}`}
          aria-current={page === filters.page ? "page" : undefined}
          className={
            page === filters.page
              ? "rounded-md border border-teal-700 bg-teal-700 px-3 py-2 text-sm font-semibold text-white"
              : linkClass
          }
        >
          {page}
        </Link>
      ))}
      {filters.page < pageCount && (
        <Link href={`/listings${filtersToSearchParams(filters, { page: filters.page + 1 })}`} className={linkClass}>
          Next
        </Link>
      )}
    </nav>
  );
}
