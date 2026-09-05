"use client";

import dynamic from "next/dynamic";
import type { MapMarker } from "@/components/map/leaflet-map";

const LeafletMap = dynamic(() => import("@/components/map/leaflet-map"), {
  ssr: false,
  loading: () => <div className="size-full animate-pulse bg-slate-100" />,
});

export function PropertyMap({ markers, className }: { markers: MapMarker[]; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-slate-200 ${className ?? "h-[420px]"}`}>
      <LeafletMap markers={markers} className="size-full" />
    </div>
  );
}
