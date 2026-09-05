import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactAgentForm } from "@/components/contact-agent-form";
import { ListingCard } from "@/components/listing-card";
import { ListingGallery } from "@/components/listing-gallery";
import { PropertyMap } from "@/components/map/property-map";
import { PROPERTY_TYPE_LABELS, STATUS_LABELS, formatNumber, formatPrice } from "@/lib/format";
import { getListingBySlug, getSimilarListings } from "@/lib/queries";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);
  if (!listing) return { title: "Listing not found" };

  return {
    title: listing.title,
    description: listing.description.slice(0, 155),
    openGraph: {
      title: listing.title,
      description: listing.description.slice(0, 155),
      images: listing.images[0] ? [listing.images[0].url] : undefined,
    },
  };
}

export default async function ListingDetailPage({ params }: Params) {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);
  if (!listing) notFound();

  const similar = await getSimilarListings(listing);

  const facts: { label: string; value: string }[] = [
    { label: "Property type", value: PROPERTY_TYPE_LABELS[listing.type] },
    { label: "Status", value: STATUS_LABELS[listing.status] },
    { label: "Bedrooms", value: listing.type === "LAND" ? "—" : String(listing.bedrooms) },
    { label: "Bathrooms", value: listing.type === "LAND" ? "—" : String(listing.bathrooms) },
    { label: "Area", value: `${formatNumber(listing.areaSqft)} sqft` },
    { label: "Year built", value: listing.yearBuilt ? String(listing.yearBuilt) : "—" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav className="mb-6 text-sm text-slate-500">
        <Link href="/listings" className="hover:text-teal-700">
          Listings
        </Link>
        <span className="px-2">/</span>
        <Link href={`/listings?city=${encodeURIComponent(listing.city)}`} className="hover:text-teal-700">
          {listing.city}
        </Link>
        <span className="px-2">/</span>
        <span className="text-slate-700">{listing.title}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
        <div className="space-y-8">
          <ListingGallery images={listing.images} />

          <header>
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h1 className="text-3xl font-semibold tracking-tight">{listing.title}</h1>
              <p className="text-3xl font-semibold text-teal-800">{formatPrice(listing.price, listing.status)}</p>
            </div>
            <p className="mt-2 text-slate-600">
              {listing.address}, {listing.city}, {listing.state} {listing.zip}
            </p>
          </header>

          <dl className="grid grid-cols-2 gap-4 rounded-xl border border-slate-200 p-5 sm:grid-cols-3">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-xs uppercase tracking-wide text-slate-500">{fact.label}</dt>
                <dd className="mt-1 font-medium">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <section>
            <h2 className="text-xl font-semibold">About this property</h2>
            <p className="mt-3 whitespace-pre-line leading-relaxed text-slate-700">{listing.description}</p>
          </section>

          {listing.amenities.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold">Amenities</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {listing.amenities.map((amenity) => (
                  <li key={amenity} className="rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-700">
                    {amenity}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section>
            <h2 className="text-xl font-semibold">Location</h2>
            <PropertyMap
              className="mt-3 h-[360px]"
              markers={[
                {
                  id: listing.id,
                  latitude: listing.latitude,
                  longitude: listing.longitude,
                  label: formatPrice(listing.price, listing.status),
                  title: listing.address,
                },
              ]}
            />
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="space-y-5 rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-3">
              {listing.agent.photoUrl ? (
                <Image
                  src={listing.agent.photoUrl}
                  alt={listing.agent.name}
                  width={56}
                  height={56}
                  className="size-14 rounded-full object-cover"
                />
              ) : null}
              <div>
                <p className="font-semibold">{listing.agent.name}</p>
                <p className="text-sm text-slate-500">Listing agent</p>
                <a href={`tel:${listing.agent.phone}`} className="text-sm text-teal-700 hover:underline">
                  {listing.agent.phone}
                </a>
              </div>
            </div>
            {listing.agent.bio && <p className="text-sm text-slate-600">{listing.agent.bio}</p>}
            <ContactAgentForm
              listingId={listing.id}
              agentId={listing.agentId}
              agentName={listing.agent.name.split(" ")[0]}
              listingTitle={listing.title}
            />
          </div>
        </aside>
      </div>

      {similar.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-semibold tracking-tight">Similar listings</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((item) => (
              <ListingCard key={item.id} listing={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
