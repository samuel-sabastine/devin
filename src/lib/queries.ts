import { cache } from "react";
import { prisma } from "@/lib/prisma";
import {
  PAGE_SIZE,
  buildListingOrderBy,
  buildListingWhere,
  type ListingFilters,
} from "@/lib/filters";

const listingCardSelect = {
  id: true,
  slug: true,
  title: true,
  price: true,
  status: true,
  type: true,
  bedrooms: true,
  bathrooms: true,
  areaSqft: true,
  city: true,
  state: true,
  address: true,
  latitude: true,
  longitude: true,
  images: { select: { url: true, alt: true }, orderBy: { position: "asc" }, take: 1 },
} as const;

export type ListingCardData = Awaited<ReturnType<typeof searchListings>>["listings"][number];

export async function searchListings(filters: ListingFilters) {
  const where = buildListingWhere(filters);
  const [total, listings] = await Promise.all([
    prisma.listing.count({ where }),
    prisma.listing.findMany({
      where,
      orderBy: buildListingOrderBy(filters.sort),
      skip: (filters.page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: listingCardSelect,
    }),
  ]);

  return {
    listings,
    total,
    page: filters.page,
    pageCount: Math.max(1, Math.ceil(total / PAGE_SIZE)),
  };
}

export const getFeaturedListings = cache(async () =>
  prisma.listing.findMany({
    where: { featured: true, status: { in: ["FOR_SALE", "FOR_RENT"] } },
    orderBy: { createdAt: "desc" },
    take: 6,
    select: listingCardSelect,
  }),
);

export const getCities = cache(async () => {
  const rows = await prisma.listing.groupBy({
    by: ["city"],
    _count: { _all: true },
    orderBy: { city: "asc" },
  });
  return rows.map((row) => ({ city: row.city, count: row._count._all }));
});

export const getListingBySlug = cache(async (slug: string) =>
  prisma.listing.findUnique({
    where: { slug },
    include: {
      images: { orderBy: { position: "asc" } },
      agent: true,
    },
  }),
);

export async function getSimilarListings(listing: { id: string; city: string; type: string }) {
  return prisma.listing.findMany({
    where: {
      id: { not: listing.id },
      OR: [{ city: listing.city }, { type: listing.type as never }],
    },
    take: 3,
    orderBy: { createdAt: "desc" },
    select: listingCardSelect,
  });
}
