import { STATUS_LABELS } from "@/lib/format";

const fieldClass =
  "w-full rounded-md border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100";

export function HeroSearch({ cities }: { cities: { city: string }[] }) {
  return (
    <form
      action="/listings"
      method="get"
      className="grid gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:grid-cols-[2fr_1fr_1fr_auto]"
    >
      <input
        name="q"
        type="search"
        placeholder="Search by city, address or ZIP"
        aria-label="Search listings"
        className={fieldClass}
      />
      <select name="city" defaultValue="" aria-label="City" className={fieldClass}>
        <option value="">Any city</option>
        {cities.map(({ city }) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      <select name="status" defaultValue="" aria-label="Status" className={fieldClass}>
        <option value="">Buy or rent</option>
        {Object.entries(STATUS_LABELS).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="rounded-md bg-teal-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-800"
      >
        Search
      </button>
    </form>
  );
}
