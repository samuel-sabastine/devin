import Link from "next/link";
import { ListingCard } from "@/components/listing-card";
import { HeroSearch } from "@/components/hero-search";
import { getCities, getFeaturedListings } from "@/lib/queries";

export const revalidate = 60;

export default async function HomePage() {
  const [featured, cities] = await Promise.all([getFeaturedListings(), getCities()]);

  return (
    <div>
      <section className="border-b border-slate-200 bg-gradient-to-b from-teal-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Find a place that feels like home.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-slate-600">
            Search verified houses, condos and apartments for sale or rent, and reach the listing agent directly.
          </p>
          <div className="mt-8 max-w-3xl">
            <HeroSearch cities={cities} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Featured listings</h2>
            <p className="mt-1 text-slate-600">Hand-picked homes from our agents this week.</p>
          </div>
          <Link href="/listings" className="text-sm font-medium text-teal-700 hover:underline">
            View all listings →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-2xl font-semibold tracking-tight">Browse by city</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {cities.map(({ city, count }) => (
              <Link
                key={city}
                href={`/listings?city=${encodeURIComponent(city)}`}
                className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium transition-colors hover:border-teal-600 hover:text-teal-700"
              >
                {city} <span className="text-slate-400">({count})</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
