import { memo } from "react";
import { Handle, Position, type NodeProps } from "reactflow";
import { severityColor } from "@/src/lib/phase-colors";

interface EntityNodeData {
  label: string;
  role: string;
  riskScore: number;
  tags: string[];
}

function EntityNodeComponent({ data }: NodeProps<EntityNodeData>) {
  const color = severityColor(data.riskScore);

  return (
    <div className="group relative min-w-[200px] rounded-lg border border-white/15 bg-ink-850 p-3 transition-all hover:border-white/25">
      <Handle type="source" position={Position.Right} className="!bg-white/30" />

      <div className="flex items-start gap-2">
        {/* Avatar silhouette */}
        <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white/5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ink-400">
            <circle cx="12" cy="8" r="4" />
            <path d="M20 21a8 8 0 1 0-16 0" />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[11px] font-semibold text-ink-100">{data.label}</p>
          <p className="truncate text-[9px] uppercase tracking-[0.1em] text-ink-500">{data.role}</p>
        </div>
        {/* Risk badge */}
        <span
          className="flex-shrink-0 rounded px-1.5 py-0.5 font-mono text-[8px] font-bold"
          style={{ backgroundColor: `${color}20`, color }}
        >
          {data.riskScore}
        </span>
      </div>

      {data.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {data.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded bg-white/5 px-1.5 py-0.5 text-[8px] text-ink-400"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export const EntityNode = memo(EntityNodeComponent);
