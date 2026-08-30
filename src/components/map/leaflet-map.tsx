"use client";

import { divIcon } from "leaflet";
import { useEffect, useMemo } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import Link from "next/link";

export type MapMarker = {
  id: string;
  latitude: number;
  longitude: number;
  label: string;
  title?: string;
  href?: string;
};

function markerIcon(label: string) {
  return divIcon({
    className: "",
    html: `<span style="display:inline-block;white-space:nowrap;transform:translate(-50%,-100%);border-radius:9999px;background:#0f766e;color:#fff;padding:4px 10px;font:600 12px/1 system-ui,sans-serif;box-shadow:0 1px 4px rgba(0,0,0,.35)">${label}</span>`,
    iconSize: [0, 0],
  });
}

function FitBounds({ markers }: { markers: MapMarker[] }) {
  const map = useMap();

  useEffect(() => {
    if (markers.length === 0) return;
    if (markers.length === 1) {
      map.setView([markers[0].latitude, markers[0].longitude], 14);
      return;
    }
    map.fitBounds(
      markers.map((marker) => [marker.latitude, marker.longitude] as [number, number]),
      { padding: [40, 40], maxZoom: 13 },
    );
  }, [map, markers]);

  return null;
}

export default function LeafletMap({ markers, className }: { markers: MapMarker[]; className?: string }) {
  const center = useMemo<[number, number]>(
    () => (markers[0] ? [markers[0].latitude, markers[0].longitude] : [39.5, -98.35]),
    [markers],
  );

  return (
    <MapContainer center={center} zoom={markers.length ? 12 : 4} scrollWheelZoom={false} className={className}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitBounds markers={markers} />
      {markers.map((marker) => (
        <Marker key={marker.id} position={[marker.latitude, marker.longitude]} icon={markerIcon(marker.label)}>
          <Popup>
            <span className="block text-sm font-semibold">{marker.label}</span>
            {marker.title ? <span className="block text-xs text-slate-600">{marker.title}</span> : null}
            {marker.href ? (
              <Link href={marker.href} className="text-xs font-medium text-teal-700 underline">
                View listing
              </Link>
            ) : null}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
