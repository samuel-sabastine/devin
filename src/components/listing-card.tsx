import Image from "next/image";
import Link from "next/link";
import type { ListingCardData } from "@/lib/queries";
import { PROPERTY_TYPE_LABELS, STATUS_LABELS, formatNumber, formatPrice } from "@/lib/format";

const STATUS_STYLES: Record<string, string> = {
  FOR_SALE: "bg-teal-700 text-white",
  FOR_RENT: "bg-sky-700 text-white",
  PENDING: "bg-amber-500 text-white",
  SOLD: "bg-slate-700 text-white",
};

export function ListingCard({ listing }: { listing: ListingCardData }) {
  const image = listing.images[0];

  return (
    <article className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-lg">
      <Link href={`/listings/${listing.slug}`} className="block">
        <div className="relative aspect-[4/3] bg-slate-100">
          {image ? (
            <Image
              src={image.url}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : null}
          <span
            className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold ${
              STATUS_STYLES[listing.status] ?? "bg-slate-700 text-white"
            }`}
          >
            {STATUS_LABELS[listing.status]}
          </span>
        </div>
        <div className="space-y-2 p-4">
          <p className="text-xl font-semibold">{formatPrice(listing.price, listing.status)}</p>
          <h3 className="line-clamp-1 font-medium text-slate-800">{listing.title}</h3>
          <p className="line-clamp-1 text-sm text-slate-500">
            {listing.address}, {listing.city}, {listing.state}
          </p>
          <dl className="flex flex-wrap gap-x-4 gap-y-1 pt-1 text-sm text-slate-600">
            {listing.type !== "LAND" && (
              <>
                <div className="flex gap-1">
                  <dt className="font-semibold">{listing.bedrooms}</dt>
                  <dd>bd</dd>
                </div>
                <div className="flex gap-1">
                  <dt className="font-semibold">{listing.bathrooms}</dt>
                  <dd>ba</dd>
                </div>
              </>
            )}
            <div className="flex gap-1">
              <dt className="font-semibold">{formatNumber(listing.areaSqft)}</dt>
              <dd>sqft</dd>
            </div>
            <div className="ml-auto text-slate-400">{PROPERTY_TYPE_LABELS[listing.type]}</div>
          </dl>
        </div>
      </Link>
    </article>
  );
}
