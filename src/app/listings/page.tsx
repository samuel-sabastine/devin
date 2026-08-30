import type { Metadata } from "next";
import Link from "next/link";
import { ListingCard } from "@/components/listing-card";
import { Pagination } from "@/components/pagination";
import { PropertyMap } from "@/components/map/property-map";
import { SearchFilters } from "@/components/search-filters";
import { countActiveFilters, parseListingFilters, type RawSearchParams } from "@/lib/filters";
import { formatCompactPrice } from "@/lib/format";
import { getCities, searchListings } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Listings",
  description: "Search homes for sale and rent by city, price, bedrooms and property type.",
};

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: Promise<RawSearchParams>;
}) {
  const filters = parseListingFilters(await searchParams);
  const [{ listings, total, pageCount }, cities] = await Promise.all([searchListings(filters), getCities()]);

  const markers = listings.map((listing) => ({
    id: listing.id,
    latitude: listing.latitude,
    longitude: listing.longitude,
    label: formatCompactPrice(listing.price),
    title: listing.title,
    href: `/listings/${listing.slug}`,
  }));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="mb-4 text-lg font-semibold">Filters</h2>
            <SearchFilters filters={filters} cities={cities} activeFilterCount={countActiveFilters(filters)} />
          </div>
        </aside>

        <section>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              {total} {total === 1 ? "listing" : "listings"} found
            </h1>
            <p className="text-sm text-slate-500">
              Page {filters.page} of {pageCount}
            </p>
          </div>

          {listings.length > 0 && <PropertyMap markers={markers} className="mt-6 h-[360px]" />}

          {listings.length === 0 ? (
            <div className="mt-6 rounded-xl border border-dashed border-slate-300 p-12 text-center">
              <p className="text-lg font-medium">No listings match these filters.</p>
              <p className="mt-1 text-slate-500">Try widening the price range or clearing a filter.</p>
              <Link
                href="/listings"
                className="mt-6 inline-block rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800"
              >
                Clear all filters
              </Link>
            </div>
          ) : (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}

          <Pagination filters={filters} pageCount={pageCount} />
        </section>
      </div>
    </div>
  );
}
