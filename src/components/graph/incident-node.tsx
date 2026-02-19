import { memo } from "react";
import { Handle, Position, type NodeProps } from "reactflow";
import { phaseColor, phaseLabel, severityColor } from "@/src/lib/phase-colors";

interface IncidentNodeData {
  label: string;
  phase: string;
  severity: number;
  date: string;
}

function IncidentNodeComponent({ data }: NodeProps<IncidentNodeData>) {
  const sevColor = severityColor(data.severity);
  const phColor = phaseColor[data.phase] || "#666";

  return (
    <div className="group relative flex min-w-[260px] overflow-hidden rounded-lg border border-signal-700/40 bg-ink-850 transition-all hover:border-signal-600/60">
      <Handle type="target" position={Position.Left} className="!bg-white/30" />
      <Handle type="source" position={Position.Right} className="!bg-white/30" />

      {/* Severity bar */}
      <div className="w-1 flex-shrink-0" style={{ backgroundColor: sevColor }} />

      <div className="flex-1 p-2.5">
        <div className="flex items-center gap-2">
          <span
            className="rounded-sm px-1.5 py-0.5 text-[8px] uppercase tracking-[0.1em]"
            style={{ backgroundColor: `${phColor}22`, color: phColor }}
          >
            {phaseLabel[data.phase] || data.phase}
          </span>
          <span className="font-mono text-[8px] text-ink-500">{data.date}</span>
        </div>
        <p className="mt-1.5 text-[10px] font-semibold leading-tight text-ink-100">{data.label}</p>
        <div className="mt-1.5 flex items-center gap-1">
          <div className="h-1 flex-1 rounded-full bg-white/5">
            <div
              className="h-full rounded-full"
              style={{
                width: `${data.severity}%`,
                backgroundColor: sevColor
              }}
            />
          </div>
          <span className="font-mono text-[7px] text-ink-500">{data.severity}</span>
        </div>
      </div>
    </div>
  );
}

export const IncidentNode = memo(IncidentNodeComponent);
