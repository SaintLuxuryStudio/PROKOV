"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { SectionTitle } from "@/src/components/ui/section-title";
import { SeverityBadge } from "@/src/components/ui/severity-badge";
import { PhaseDivider } from "@/src/components/ui/phase-divider";
import { caseData } from "@/src/data/case-data";
import { phaseColor, phaseLabel } from "@/src/lib/phase-colors";
import { sectionAnimation } from "@/src/lib/animation-config";
import type { EvidenceMedia } from "@/src/types/case";

/* SVG gradient stops — one per timeline point, colored by phase */
function PhaseGradientDefs({ id }: { id: string }) {
  const total = caseData.timeline.length;
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
        {caseData.timeline.map((tp, i) => (
          <stop
            key={tp.id}
            offset={`${(i / (total - 1)) * 100}%`}
            stopColor={phaseColor[tp.phase]}
          />
        ))}
      </linearGradient>
    </defs>
  );
}

export function TimelineSection({
  onSelectIncident
}: {
  onSelectIncident: (id: string) => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const narrativeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const evidenceById = useMemo(() => new Map(caseData.evidence.map((e) => [e.id, e])), []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            if (!isNaN(index)) setActiveIndex(index);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0.1 }
    );

    narrativeRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const incidentsWithPhaseBreaks = useMemo(() => {
    const items: { type: "incident" | "divider"; index?: number; from?: string; to?: string }[] = [];
    let lastPhase = "";
    caseData.incidents.forEach((inc, i) => {
      if (lastPhase && inc.phase !== lastPhase) {
        items.push({ type: "divider", from: lastPhase, to: inc.phase });
      }
      items.push({ type: "incident", index: i });
      lastPhase = inc.phase;
    });
    return items;
  }, []);

  const activeIncident = caseData.incidents[activeIndex];

  return (
    <motion.section id="timeline" className="mt-12" initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }}>
      <SectionTitle
        title="Таймлайн эскалации"
        subtitle="Скролл через нарратив — чарт следует за повествованием"
      />

      <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        {/* Left: Narrative blocks */}
        <div className="space-y-0">
          {incidentsWithPhaseBreaks.map((item, i) => {
            if (item.type === "divider") {
              return (
                <PhaseDivider
                  key={`div-${i}`}
                  from={item.from!}
                  to={item.to!}
                  fromLabel={phaseLabel[item.from!] || item.from!}
                  toLabel={phaseLabel[item.to!] || item.to!}
                />
              );
            }
            const idx = item.index!;
            const incident = caseData.incidents[idx];
            const isActive = idx === activeIndex;
            const incidentMedia: EvidenceMedia[] = incident.linkedEvidenceIds
              .map((eId) => evidenceById.get(eId))
              .filter((e): e is NonNullable<typeof e> => Boolean(e && e.media?.length))
              .flatMap((e) => e.media || []);
            return (
              <div
                key={incident.id}
                ref={(el) => { narrativeRefs.current[idx] = el; }}
                data-index={idx}
                className={`min-h-[40vh] rounded-xl border p-5 transition-all duration-300 lg:min-h-[50vh] ${
                  isActive
                    ? "border-white/12 bg-ink-850/80"
                    : "border-transparent bg-transparent"
                }`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em]"
                    style={{
                      backgroundColor: `${phaseColor[incident.phase]}22`,
                      color: phaseColor[incident.phase]
                    }}
                  >
                    {phaseLabel[incident.phase]}
                  </span>
                  <span className="font-mono text-[10px] text-ink-500">
                    {incident.datetimeApprox}
                  </span>
                </div>
                <h3 className="mt-3 font-serif text-xl font-semibold">{incident.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-300">{incident.summary}</p>
                <div className="mt-4">
                  <SeverityBadge severity={incident.severity} />
                </div>
                {incidentMedia.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-500">Медиа улик</p>
                    <div className="flex flex-col gap-2">
                      {incidentMedia.map((m) => (
                        <div key={`${incident.id}-${m.url}`} className="overflow-hidden rounded-lg border border-white/8 bg-white/[0.02] p-1.5">
                          {m.kind === "image" ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={encodeURI(m.url)} alt={incident.title} className="w-full rounded-md" />
                          ) : (
                            <video src={encodeURI(m.url)} controls preload="metadata" className="w-full rounded-md" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => onSelectIncident(incident.id)}
                  className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-400 transition hover:text-signal-400"
                >
                  [Подробнее]
                </button>
              </div>
            );
          })}
        </div>

        {/* Right: Sticky chart */}
        <div className="hidden lg:block">
          <div className="sticky top-20">
            <div className="case-panel rounded-2xl p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-500">
                  Индекс эскалации
                </span>
                {activeIncident && (
                  <span
                    className="font-mono text-xs font-semibold"
                    style={{ color: phaseColor[activeIncident.phase] }}
                  >
                    {activeIncident.title}
                  </span>
                )}
              </div>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={caseData.timeline}
                    margin={{ top: 12, right: 20, left: 6, bottom: 0 }}
                  >
                    <PhaseGradientDefs id="phaseGradientDesktop" />
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                    <XAxis
                      dataKey="label"
                      tick={{ fill: "#666", fontSize: 10, fontFamily: "monospace" }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      domain={[0, 100]}
                      tick={{ fill: "#666", fontSize: 10, fontFamily: "monospace" }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      cursor={{ stroke: "rgba(255,255,255,0.15)" }}
                      contentStyle={{
                        background: "#141414",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 8,
                        color: "#ededed",
                        fontFamily: "monospace",
                        fontSize: 11
                      }}
                      formatter={(value: number) => [`${value} / 100`, "Эскалация"]}
                      labelFormatter={(value) => `${value}`}
                    />
                    <Line
                      type="monotone"
                      dataKey="escalationIndex"
                      stroke="url(#phaseGradientDesktop)"
                      strokeWidth={2.5}
                      strokeDasharray="6 4"
                      isAnimationActive={false}
                      dot={(props: Record<string, unknown>) => {
                        const { cx, cy, index } = props as { cx: number; cy: number; index: number };
                        const isActivePoint = index === activeIndex;
                        const pointPhase = caseData.timeline[index]?.phase;
                        const dotColor = pointPhase ? phaseColor[pointPhase] : "#8e1b1b";
                        return (
                          <circle
                            key={index}
                            cx={cx}
                            cy={cy}
                            r={isActivePoint ? 7 : 4}
                            fill={isActivePoint ? "#f4d5d5" : dotColor}
                            stroke={isActivePoint ? dotColor : "#f4e9e9"}
                            strokeWidth={isActivePoint ? 3 : 1}
                            style={{
                              transition: "all 0.3s ease",
                              filter: isActivePoint ? `drop-shadow(0 0 8px ${dotColor}99)` : "none"
                            }}
                          />
                        );
                      }}
                    />
                    {activeIndex < caseData.timeline.length && (
                      <ReferenceDot
                        x={caseData.timeline[activeIndex].label}
                        y={caseData.timeline[activeIndex].escalationIndex}
                        r={0}
                        label={{
                          value: `${caseData.timeline[activeIndex].escalationIndex}`,
                          position: "top",
                          fill: "#ededed",
                          fontSize: 14,
                          fontWeight: 700,
                          fontFamily: "monospace"
                        }}
                      />
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Phase color legend */}
              <div className="mt-4 flex justify-center gap-6">
                {(["турист", "бродяга", "психоз"] as const).map((phase) => (
                  <div key={phase} className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: phaseColor[phase] }}
                    />
                    <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink-500">
                      {phaseLabel[phase]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: chart displayed at top */}
      <div className="mt-4 lg:hidden">
        <div className="case-panel rounded-2xl p-4">
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={caseData.timeline}
                onClick={(payload) => {
                  const incidentId = (payload?.activePayload?.[0]?.payload as { linkedIncidentId?: string })?.linkedIncidentId;
                  if (incidentId) onSelectIncident(incidentId);
                }}
                margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
              >
                <PhaseGradientDefs id="phaseGradientMobile" />
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis
                  dataKey="label"
                  tick={{ fill: "#666", fontSize: 9, fontFamily: "monospace" }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fill: "#666", fontSize: 9, fontFamily: "monospace" }}
                  tickLine={false}
                  axisLine={false}
                />
                <Line
                  type="monotone"
                  dataKey="escalationIndex"
                  stroke="url(#phaseGradientMobile)"
                  strokeWidth={2}
                  strokeDasharray="6 4"
                  isAnimationActive={false}
                  dot={(props: Record<string, unknown>) => {
                    const { cx, cy, index } = props as { cx: number; cy: number; index: number };
                    const pointPhase = caseData.timeline[index]?.phase;
                    const dotColor = pointPhase ? phaseColor[pointPhase] : "#8e1b1b";
                    return (
                      <circle
                        key={index}
                        cx={cx}
                        cy={cy}
                        r={3}
                        fill={dotColor}
                        stroke="#f4e9e9"
                        strokeWidth={1}
                      />
                    );
                  }}
                  activeDot={{ r: 5, strokeWidth: 1, fill: "#f4d5d5" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
