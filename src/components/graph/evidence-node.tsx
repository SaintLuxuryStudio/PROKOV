import { memo } from "react";
import { Handle, Position, type NodeProps } from "reactflow";
import { evidenceTypeColor } from "@/src/lib/phase-colors";

interface EvidenceNodeData {
  label: string;
  code: string;
  type: string;
  confidence: number;
}

function EvidenceNodeComponent({ data }: NodeProps<EvidenceNodeData>) {
  const color = evidenceTypeColor(data.type);

  return (
    <div className="group relative min-w-[180px] overflow-hidden rounded-lg border border-white/10 bg-ink-850 transition-all hover:border-white/20">
      <Handle type="target" position={Position.Left} className="!bg-white/30" />

      {/* Top color bar */}
      <div className="h-[2px] w-full" style={{ backgroundColor: color }} />

      <div className="p-2.5">
        <div className="flex items-start justify-between gap-1">
          <span className="font-mono text-[10px] font-bold text-ink-200">{data.code}</span>
          <span
            className="rounded px-1 py-0.5 text-[7px] uppercase"
            style={{ backgroundColor: `${color}18`, color: `${color}cc` }}
          >
            {Math.round(data.confidence * 100)}%
          </span>
        </div>
        <p className="mt-1 text-[8px] uppercase tracking-[0.08em] text-ink-500">{data.type}</p>
      </div>
    </div>
  );
}

export const EvidenceNode = memo(EvidenceNodeComponent);
