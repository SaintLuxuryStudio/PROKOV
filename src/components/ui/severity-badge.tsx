import { severityColor, severityLabel } from "@/src/lib/phase-colors";

export function SeverityBadge({ severity }: { severity: number }) {
  const color = severityColor(severity);

  return (
    <span
      className="inline-flex items-center gap-1.5 rounded border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em]"
      style={{ borderColor: `${color}88`, color: `${color}ee` }}
    >
      <span
        className="severity-dot"
        style={{ backgroundColor: color, width: 6, height: 6 }}
      />
      {severity}/100 · {severityLabel(severity)}
    </span>
  );
}
