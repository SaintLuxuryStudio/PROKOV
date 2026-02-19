"use client";

import { evidenceTypeColor, confidenceColor } from "@/src/lib/phase-colors";
import type { Evidence } from "@/src/types/case";

export function EvidenceDocumentCard({
  entry,
  onOpenCard,
  onOpenSource
}: {
  entry: Evidence;
  onOpenCard: () => void;
  onOpenSource: () => void;
}) {
  const typeColor = evidenceTypeColor(entry.type);
  const confColor = confidenceColor(entry.confidence);
  const confPercent = Math.round(entry.confidence * 100);

  return (
    <article className="document-card" style={{ borderTopColor: typeColor }}>
      <div className="relative p-4">
        {/* Stamp in corner */}
        <div className="absolute -right-1 top-3 rotate-[-4deg]">
          <span
            className="inline-block rounded border-2 border-dashed px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em]"
            style={{ borderColor: `${typeColor}66`, color: `${typeColor}cc` }}
          >
            {entry.code}
          </span>
        </div>

        {/* Type badge */}
        <div className="mb-3 flex items-center gap-2">
          <span
            className="rounded-full px-2 py-0.5 text-[10px] uppercase tracking-[0.1em]"
            style={{
              backgroundColor: `${typeColor}18`,
              color: `${typeColor}cc`
            }}
          >
            {entry.type}
          </span>
        </div>

        {/* Description */}
        <p className="mt-2 pr-12 text-sm leading-relaxed text-ink-200">{entry.description}</p>

        {/* Confidence bar */}
        <div className="mt-4">
          <div className="mb-1 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-500">
              Уверенность
            </span>
            <span
              className="font-mono text-xs font-semibold"
              style={{ color: confColor }}
            >
              {confPercent}%
            </span>
          </div>
          <div className="confidence-bar">
            <div
              className="confidence-bar-fill"
              style={{ width: `${confPercent}%`, backgroundColor: confColor }}
            />
          </div>
        </div>

        {/* Source ref */}
        <p className="mt-3 font-mono text-[10px] text-ink-500">
          {entry.sourceRef}
        </p>

        {/* Actions */}
        <div className="mt-4 flex gap-2 border-t border-white/5 pt-3">
          <button
            type="button"
            onClick={onOpenCard}
            className="animated-underline font-mono text-[10px] uppercase tracking-[0.12em] text-ink-300 transition hover:text-ink-100"
          >
            [Карточка]
          </button>
          <button
            type="button"
            onClick={onOpenSource}
            className="animated-underline font-mono text-[10px] uppercase tracking-[0.12em] text-ink-300 transition hover:text-ink-100"
          >
            [{entry.code}]
          </button>
        </div>
      </div>
    </article>
  );
}
