"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/src/components/ui/animated-counter";
import { caseData } from "@/src/data/case-data";
import { phaseColor, phaseLabel } from "@/src/lib/phase-colors";

const phases = ["турист", "бродяга", "психоз"] as const;

export function HeroSection() {
  return (
    <motion.section
      className="noise-texture relative overflow-hidden rounded-2xl border border-white/[0.06] bg-ink-900/80"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Grid background */}
      <div className="case-grid-bg absolute inset-0 opacity-[0.08]" aria-hidden="true" />

      {/* Watermark */}
      <div className="watermark -left-8 top-1/2 -translate-y-1/2" aria-hidden="true">
        ДЕЛО
      </div>

      {/* Scan line effect */}
      <div className="scan-line-overlay absolute inset-0 pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
        {/* Meta badges */}
        <div className="mb-6 flex flex-wrap gap-3">
          <span className="stamp">{caseData.meta.caseNumber}</span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-signal-700/50 bg-signal-900/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-signal-300">
            <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-signal-600" />
            {caseData.meta.riskLevel}
          </span>
          <span className="rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-400">
            {caseData.meta.status}
          </span>
        </div>

        {/* Title */}
        <h1 className="max-w-4xl font-serif text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
          {caseData.meta.title}
        </h1>

        {/* Synopsis with drop cap */}
        <p className="drop-cap mt-6 max-w-3xl text-base leading-relaxed text-ink-300 sm:text-lg">
          {caseData.meta.synopsis}
        </p>

        {/* Meta grid */}
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <MetaDatum label="Период" value={caseData.meta.period} />
          <MetaDatum label="География" value={caseData.meta.geography} />
          <MetaDatum label="Индекс угрозы" value="100 / 100" highlight />
        </div>

        {/* Animated counters */}
        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
          <AnimatedCounter end={9} label="Инцидентов" />
          <AnimatedCounter end={18} label="Улик" />
          <AnimatedCounter end={6} label="Сущностей" />
          <AnimatedCounter end={100} label="Индекс угрозы" suffix="/100" />
        </div>

        {/* Phase bar */}
        <div className="mt-10">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-500">
            Фазы эскалации
          </p>
          <div className="flex h-2 overflow-hidden rounded-full">
            {phases.map((phase, i) => (
              <div
                key={phase}
                className="relative flex-1 transition-all"
                style={{ backgroundColor: phaseColor[phase] }}
              >
                {i > 0 && (
                  <div className="absolute left-0 top-0 h-full w-px bg-ink-900" />
                )}
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between">
            {phases.map((phase) => (
              <span
                key={phase}
                className="font-mono text-[9px] uppercase tracking-[0.12em]"
                style={{ color: phaseColor[phase] }}
              >
                {phaseLabel[phase]}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function MetaDatum({
  label,
  value,
  highlight = false
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border p-3 ${
        highlight
          ? "border-signal-700/40 bg-signal-900/20"
          : "border-white/8 bg-white/[0.02]"
      }`}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-500">{label}</p>
      <p className={`mt-1 text-sm ${highlight ? "font-semibold text-signal-300" : "text-ink-100"}`}>
        {value}
      </p>
    </div>
  );
}
