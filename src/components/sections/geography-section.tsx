"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { SectionTitle } from "@/src/components/ui/section-title";
import { parisLocations } from "@/src/data/paris-locations";
import { phaseColor, phaseLabel } from "@/src/lib/phase-colors";
import { sectionAnimation } from "@/src/lib/animation-config";

/* react-leaflet must be loaded client-side only (no SSR) */
const LeafletMap = dynamic(() => import("./geography-map"), { ssr: false });

export function GeographySection({
  onSelectIncident
}: {
  onSelectIncident: (id: string) => void;
}) {
  return (
    <motion.section id="geography" className="mt-12" {...sectionAnimation}>
      <SectionTitle
        title="География инцидентов"
        subtitle="Пространственное распределение: от центра Парижа на запад к пригородам"
      />

      <div className="case-panel mt-5 rounded-2xl p-4 sm:p-6">
        {/* Map container with noir filter */}
        <div className="leaflet-noir-wrapper noise-texture relative overflow-hidden rounded-xl border border-white/8">
          {/* Dark overlay */}
          <div className="pointer-events-none absolute inset-0 z-[500] bg-ink-950/25" />
          {/* Grid overlay */}
          <div className="case-grid-bg pointer-events-none absolute inset-0 z-[501] opacity-[0.04]" />
          {/* Corner coordinates */}
          <div className="pointer-events-none absolute left-3 top-3 z-[502] font-mono text-[9px] text-white/20">
            48.89°N 2.10°E
          </div>
          <div className="pointer-events-none absolute bottom-3 right-3 z-[502] font-mono text-[9px] text-white/20">
            48.80°N 2.40°E
          </div>

          <LeafletMap onSelectIncident={onSelectIncident} />
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-5">
            {(["турист", "бродяга", "психоз"] as const).map((phase) => (
              <div key={phase} className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: phaseColor[phase] }}
                />
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink-500">
                  {phaseLabel[phase]}
                </span>
              </div>
            ))}
          </div>
          <span className="font-mono text-[9px] text-ink-600">
            Дрейф: центр → запад (пригороды)
          </span>
        </div>
      </div>
    </motion.section>
  );
}
