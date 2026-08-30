import type { ListingStatus, PropertyType } from "@prisma/client";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const compactCurrency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});

export function formatPrice(price: number, status: ListingStatus): string {
  return status === "FOR_RENT" ? `${currency.format(price)}/mo` : currency.format(price);
}

export function formatCompactPrice(price: number): string {
  return compactCurrency.format(price);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  HOUSE: "House",
  APARTMENT: "Apartment",
  CONDO: "Condo",
  TOWNHOUSE: "Townhouse",
  LAND: "Land",
};

export const STATUS_LABELS: Record<ListingStatus, string> = {
  FOR_SALE: "For sale",
  FOR_RENT: "For rent",
  SOLD: "Sold",
  PENDING: "Pending",
};
