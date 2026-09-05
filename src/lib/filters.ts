import { Prisma } from "@prisma/client";
import { z } from "zod";

export const PAGE_SIZE = 9;

export const SORT_OPTIONS = {
  newest: "Newest",
  price_asc: "Price: low to high",
  price_desc: "Price: high to low",
  area_desc: "Largest area",
} as const;

export type SortKey = keyof typeof SORT_OPTIONS;

const optionalString = z
  .string()
  .trim()
  .min(1)
  .optional()
  .catch(undefined);

const optionalPositiveInt = z.coerce
  .number()
  .int()
  .nonnegative()
  .optional()
  .catch(undefined);

export const listingFiltersSchema = z.object({
  q: optionalString,
  city: optionalString,
  type: z.enum(["HOUSE", "APARTMENT", "CONDO", "TOWNHOUSE", "LAND"]).optional().catch(undefined),
  status: z.enum(["FOR_SALE", "FOR_RENT", "SOLD", "PENDING"]).optional().catch(undefined),
  minPrice: optionalPositiveInt,
  maxPrice: optionalPositiveInt,
  beds: optionalPositiveInt,
  baths: optionalPositiveInt,
  sort: z.enum(["newest", "price_asc", "price_desc", "area_desc"]).default("newest").catch("newest"),
  page: z.coerce.number().int().min(1).default(1).catch(1),
});

export type ListingFilters = z.infer<typeof listingFiltersSchema>;

export type RawSearchParams = Record<string, string | string[] | undefined>;

export function parseListingFilters(params: RawSearchParams): ListingFilters {
  const flat: Record<string, string | undefined> = {};
  for (const [key, value] of Object.entries(params)) {
    flat[key] = Array.isArray(value) ? value[0] : value;
    if (flat[key] === "") flat[key] = undefined;
  }
  return listingFiltersSchema.parse(flat);
}

export function buildListingWhere(filters: ListingFilters): Prisma.ListingWhereInput {
  const where: Prisma.ListingWhereInput = {};

  if (filters.q) {
    where.OR = [
      { title: { contains: filters.q, mode: "insensitive" } },
      { description: { contains: filters.q, mode: "insensitive" } },
      { address: { contains: filters.q, mode: "insensitive" } },
      { city: { contains: filters.q, mode: "insensitive" } },
      { zip: { contains: filters.q, mode: "insensitive" } },
    ];
  }
  if (filters.city) where.city = { equals: filters.city, mode: "insensitive" };
  if (filters.type) where.type = filters.type;
  if (filters.status) where.status = filters.status;
  if (filters.beds) where.bedrooms = { gte: filters.beds };
  if (filters.baths) where.bathrooms = { gte: filters.baths };
  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    where.price = {
      ...(filters.minPrice !== undefined ? { gte: filters.minPrice } : {}),
      ...(filters.maxPrice !== undefined ? { lte: filters.maxPrice } : {}),
    };
  }

  return where;
}

export function buildListingOrderBy(sort: SortKey): Prisma.ListingOrderByWithRelationInput {
  switch (sort) {
    case "price_asc":
      return { price: "asc" };
    case "price_desc":
      return { price: "desc" };
    case "area_desc":
      return { areaSqft: "desc" };
    default:
      return { createdAt: "desc" };
  }
}

export function filtersToSearchParams(
  filters: Partial<ListingFilters>,
  overrides: Partial<Record<keyof ListingFilters, string | number | undefined>> = {},
): string {
  const params = new URLSearchParams();
  const merged = { ...filters, ...overrides } as Record<string, unknown>;
  for (const [key, value] of Object.entries(merged)) {
    if (value === undefined || value === null || value === "") continue;
    if (key === "sort" && value === "newest") continue;
    if (key === "page" && value === 1) continue;
    params.set(key, String(value));
  }
  const query = params.toString();
  return query ? `?${query}` : "";
}

export function countActiveFilters(filters: ListingFilters): number {
  const keys: (keyof ListingFilters)[] = ["q", "city", "type", "status", "minPrice", "maxPrice", "beds", "baths"];
  return keys.filter((key) => filters[key] !== undefined).length;
}
