"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SectionTitle } from "@/src/components/ui/section-title";
import { EvidenceDocumentCard } from "@/src/components/ui/evidence-document-card";
import { caseData } from "@/src/data/case-data";
import { evidenceTypeColor } from "@/src/lib/phase-colors";
import { sectionAnimation } from "@/src/lib/animation-config";

const evidenceTypes = Array.from(new Set(caseData.evidence.map((e) => e.type)));

export function EvidenceSection({
  onSelectEvidence,
  onOpenSource
}: {
  onSelectEvidence: (id: string) => void;
  onOpenSource: (code: string) => void;
}) {
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [confidenceFilter, setConfidenceFilter] = useState<number>(0);

  const filteredEvidence = useMemo(
    () =>
      caseData.evidence.filter((entry) => {
        const byType = typeFilter === "all" || entry.type === typeFilter;
        const byConfidence = entry.confidence >= confidenceFilter;
        return byType && byConfidence;
      }),
    [confidenceFilter, typeFilter]
  );

  return (
    <motion.section id="evidence" className="mt-12" initial={{ opacity: 1, y: 0 }} animate={{ opacity: 1, y: 0 }}>
      <SectionTitle title="Каталог улик" subtitle="Фильтрация по типу и степени уверенности" />

      <div className="case-panel mt-5 rounded-2xl p-5 sm:p-6">
        {/* Filter bar */}
        <div className="flex flex-wrap items-end gap-4">
          {/* Type toggle buttons */}
          <div>
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-500">Тип</p>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setTypeFilter("all")}
                className={`rounded-md border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] transition ${
                  typeFilter === "all"
                    ? "border-white/20 bg-white/10 text-ink-100"
                    : "border-white/8 text-ink-500 hover:border-white/15 hover:text-ink-300"
                }`}
              >
                Все ({caseData.evidence.length})
              </button>
              {evidenceTypes.map((type) => {
                const color = evidenceTypeColor(type);
                const isActive = typeFilter === type;
                const count = caseData.evidence.filter((e) => e.type === type).length;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setTypeFilter(type)}
                    className={`rounded-md border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] transition ${
                      isActive
                        ? "text-ink-100"
                        : "text-ink-500 hover:text-ink-300"
                    }`}
                    style={{
                      borderColor: isActive ? `${color}66` : "rgba(255,255,255,0.06)",
                      backgroundColor: isActive ? `${color}15` : "transparent"
                    }}
                  >
                    {type} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Confidence slider */}
          <div className="flex-1" style={{ minWidth: 180 }}>
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-500">
              Мин. уверенность: <span className="text-ink-200">{Math.round(confidenceFilter * 100)}%</span>
            </p>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={confidenceFilter}
              onChange={(e) => setConfidenceFilter(Number(e.target.value))}
              className="w-full accent-signal-700"
            />
          </div>

          {/* Count */}
          <p className="font-mono text-[10px] text-ink-500">
            {filteredEvidence.length} из {caseData.evidence.length}
          </p>
        </div>

        {/* Evidence grid */}
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredEvidence.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: Math.min(i * 0.05, 0.3) }}
            >
              <EvidenceDocumentCard
                entry={entry}
                onOpenCard={() => onSelectEvidence(entry.id)}
                onOpenSource={() => onOpenSource(entry.code)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
