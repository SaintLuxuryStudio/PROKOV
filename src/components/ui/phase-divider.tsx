import { phaseColor } from "@/src/lib/phase-colors";

export function PhaseDivider({
  from,
  to,
  fromLabel,
  toLabel
}: {
  from: string;
  to: string;
  fromLabel: string;
  toLabel: string;
}) {
  return (
    <div className="phase-divider my-6">
      <span
        className="font-mono text-[10px] uppercase tracking-[0.18em]"
        style={{ color: phaseColor[from] || "#666" }}
      >
        {fromLabel}
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500">→</span>
      <span
        className="font-mono text-[10px] uppercase tracking-[0.18em]"
        style={{ color: phaseColor[to] || "#666" }}
      >
        {toLabel}
      </span>
    </div>
  );
}
