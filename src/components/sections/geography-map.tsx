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
        <span class="incident-marker-label">${String(index + 1).padStart(2, "0")}</span>
      </div>
    `
  });
}

export default function GeographyMap({
  onSelectIncident
}: {
  onSelectIncident: (id: string) => void;
}) {
  /* Build polyline positions */
  const polyPositions: [number, number][] = useMemo(
    () => parisLocations.map((loc) => [loc.lat, loc.lng]),
    []
  );

  /* Build icons (memoized) */
  const icons = useMemo(
    () => parisLocations.map((loc, i) => makeIcon(phaseColor[loc.phase], i)),
    []
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
          color: "rgba(142, 27, 27, 0.35)",
          weight: 1.5,
          dashArray: "6 4"
        }}
      />

      {/* Incident markers */}
      {parisLocations.map((loc, i) => (
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
