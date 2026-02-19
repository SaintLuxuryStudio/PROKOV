"use client";

import { useMemo } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Polyline, Tooltip } from "react-leaflet";
import { parisLocations } from "@/src/data/paris-locations";
import { phaseColor } from "@/src/lib/phase-colors";

/* Compute map center between all points */
const center: [number, number] = [48.840, 2.100];
const defaultZoom = 11;

function makeIcon(color: string, index: number) {
  return L.divIcon({
    className: "incident-marker-wrapper",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    html: `
      <div class="incident-marker" style="--marker-color: ${color}">
        <span class="incident-marker-pulse" style="background: ${color}"></span>
        <span class="incident-marker-dot" style="background: ${color}; border-color: ${color}"></span>
        <span class="incident-marker-label" style="color: #e8eef8; text-shadow: 0 1px 2px rgba(0,0,0,0.6);">${String(index + 1).padStart(2, "0")}</span>
      </div>
    `
  });
}

export default function GeographyMap({
  onSelectIncident
}: {
  onSelectIncident: (id: string) => void;
}) {
  // Stable jitter for points 4-9 to avoid a perfect line while keeping westward drift (deterministic to avoid hydration mismatch)
  const jittered = useMemo(
    () =>
      parisLocations.map((loc, i) => {
        if (i < 3) return loc;
        // deterministic pseudo-random based on index to keep SSR === client
        const latJitter = ((i * 137) % 100 - 50) * 0.00016; // ~[-0.008, 0.008]
        const lngJitter = ((i * 263) % 100 - 50) * 0.0012; // ~[-0.06, 0.06]
        return {
          ...loc,
          lat: loc.lat + latJitter,
          lng: loc.lng + lngJitter
        };
      }),
    []
  );

  /* Build polyline positions */
  const polyPositions: [number, number][] = useMemo(
    () => jittered.map((loc) => [loc.lat, loc.lng]),
    [jittered]
  );

  /* Build icons (memoized) */
  const icons = useMemo(
    () => jittered.map((loc, i) => makeIcon(phaseColor[loc.phase], i)),
    [jittered]
  );

  return (
    <MapContainer
      center={center}
      zoom={defaultZoom}
      zoomControl={false}
      dragging={true}
      scrollWheelZoom={true}
      doubleClickZoom={true}
      touchZoom={true}
      attributionControl={false}
      className="leaflet-noir-map"
      style={{ height: 480, width: "100%" }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      {/* Connection polyline — dashed, subtle */}
      <Polyline
        positions={polyPositions}
        pathOptions={{
          color: "rgba(200, 80, 80, 0.6)",
          weight: 2.2,
          dashArray: "8 5"
        }}
      />

      {/* Incident markers */}
      {jittered.map((loc, i) => (
        <Marker
          key={loc.incidentId}
          position={[loc.lat, loc.lng]}
          icon={icons[i]}
          eventHandlers={{
            click: () => onSelectIncident(loc.incidentId)
          }}
        >
          <Tooltip
            direction="top"
            offset={[0, -18]}
            className="leaflet-tooltip-noir"
          >
            <span className="font-mono text-[10px]">
              {String(i + 1).padStart(2, "0")} — {loc.label}
            </span>
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
}
