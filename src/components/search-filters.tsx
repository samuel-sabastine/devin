"use client";

import Link from "next/link";
import { useRef } from "react";
import { PROPERTY_TYPE_LABELS, STATUS_LABELS } from "@/lib/format";
import { SORT_OPTIONS, type ListingFilters } from "@/lib/filters";

type Props = {
  filters: ListingFilters;
  cities: { city: string; count: number }[];
  activeFilterCount: number;
};

const inputClass =
  "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100";

export function SearchFilters({ filters, cities, activeFilterCount }: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  const submit = () => formRef.current?.requestSubmit();

  return (
    <form ref={formRef} action="/listings" method="get" className="space-y-4">
      <div>
        <label htmlFor="q" className="mb-1 block text-sm font-medium text-slate-700">
          Search
        </label>
        <input
          id="q"
          name="q"
          type="search"
          defaultValue={filters.q ?? ""}
          placeholder="City, address, ZIP or keyword"
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="city" className="mb-1 block text-sm font-medium text-slate-700">
            City
          </label>
          <select id="city" name="city" defaultValue={filters.city ?? ""} onChange={submit} className={inputClass}>
            <option value="">Any city</option>
            {cities.map(({ city, count }) => (
              <option key={city} value={city}>
                {city} ({count})
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="status" className="mb-1 block text-sm font-medium text-slate-700">
            Status
          </label>
          <select id="status" name="status" defaultValue={filters.status ?? ""} onChange={submit} className={inputClass}>
            <option value="">Any status</option>
            {Object.entries(STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="type" className="mb-1 block text-sm font-medium text-slate-700">
          Property type
        </label>
        <select id="type" name="type" defaultValue={filters.type ?? ""} onChange={submit} className={inputClass}>
          <option value="">Any type</option>
          {Object.entries(PROPERTY_TYPE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <fieldset className="grid grid-cols-2 gap-3">
        <legend className="mb-1 text-sm font-medium text-slate-700">Price range</legend>
        <input
          name="minPrice"
          type="number"
          min={0}
          step={1000}
          defaultValue={filters.minPrice ?? ""}
          placeholder="Min"
          aria-label="Minimum price"
          className={inputClass}
        />
        <input
          name="maxPrice"
          type="number"
          min={0}
          step={1000}
          defaultValue={filters.maxPrice ?? ""}
          placeholder="Max"
          aria-label="Maximum price"
          className={inputClass}
        />
      </fieldset>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="beds" className="mb-1 block text-sm font-medium text-slate-700">
            Beds (min)
          </label>
          <select id="beds" name="beds" defaultValue={filters.beds ?? ""} onChange={submit} className={inputClass}>
            <option value="">Any</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}+
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="baths" className="mb-1 block text-sm font-medium text-slate-700">
            Baths (min)
          </label>
          <select id="baths" name="baths" defaultValue={filters.baths ?? ""} onChange={submit} className={inputClass}>
            <option value="">Any</option>
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n}+
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="sort" className="mb-1 block text-sm font-medium text-slate-700">
          Sort by
        </label>
        <select id="sort" name="sort" defaultValue={filters.sort} onChange={submit} className={inputClass}>
          {Object.entries(SORT_OPTIONS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-3 pt-1">
        <button
          type="submit"
          className="flex-1 rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-800"
        >
          Apply filters
        </button>
        {activeFilterCount > 0 && (
          <Link href="/listings" className="text-sm font-medium text-slate-500 hover:text-teal-700">
            Clear ({activeFilterCount})
          </Link>
        )}
      </div>
    </form>
  );
}
