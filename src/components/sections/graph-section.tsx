"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import ReactFlow, {
  Background,
  Controls,
  MarkerType,
  type Edge,
  type Node,
  type NodeMouseHandler
} from "reactflow";
import { SectionTitle } from "@/src/components/ui/section-title";
import { EntityNode } from "@/src/components/graph/entity-node";
import { IncidentNode } from "@/src/components/graph/incident-node";
import { EvidenceNode as EvidenceGraphNode } from "@/src/components/graph/evidence-node";
import { caseData } from "@/src/data/case-data";
import { phaseColor } from "@/src/lib/phase-colors";
import { sectionAnimation } from "@/src/lib/animation-config";
import type { Evidence, Incident } from "@/src/types/case";

const nodeTypes = {
  entityNode: EntityNode,
  incidentNode: IncidentNode,
  evidenceNode: EvidenceGraphNode
};

export function GraphSection({
  onSelectIncident,
  onSelectEvidence
}: {
  onSelectIncident: (id: string) => void;
  onSelectEvidence: (id: string) => void;
}) {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const incidentById = useMemo(
    () => new Map(caseData.incidents.map((i) => [i.id, i])),
    []
  );
  const evidenceById = useMemo(
    () => new Map(caseData.evidence.map((e) => [e.id, e])),
    []
  );

  const graph = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    const entityCount = caseData.entities.length;
    const incidentCount = caseData.incidents.length;
    const evidenceCount = caseData.evidence.length;

    // Entity nodes — left column, centered vertically
    const entitySpacing = 130;
    const entityStartY = Math.max(0, (incidentCount * 120 - entityCount * entitySpacing) / 2);
    caseData.entities.forEach((entity, index) => {
      nodes.push({
        id: entity.id,
        type: "entityNode",
        position: { x: 0, y: entityStartY + index * entitySpacing },
        data: {
          label: entity.name,
          role: entity.role,
          riskScore: entity.riskScore,
          tags: entity.tags
        }
      });
    });

    // Incident nodes — center column
    caseData.incidents.forEach((incident, index) => {
      nodes.push({
        id: incident.id,
        type: "incidentNode",
        position: { x: 350, y: 10 + index * 120 },
        data: {
          label: incident.title,
          phase: incident.phase,
          severity: incident.severity,
          date: incident.datetimeApprox
        }
      });

      incident.linkedEntityIds.forEach((entityId) => {
        const ispsychosis = incident.phase === "психоз";
        edges.push({
          id: `${entityId}-${incident.id}`,
          source: entityId,
          target: incident.id,
          type: "smoothstep",
          markerEnd: { type: MarkerType.ArrowClosed, color: ispsychosis ? "rgba(142,27,27,0.8)" : "rgba(200,200,200,0.5)" },
          style: {
            stroke: ispsychosis ? "rgba(142,27,27,0.4)" : "rgba(200,200,200,0.15)",
            strokeWidth: ispsychosis ? 2 : 1.2
          },
          animated: ispsychosis
        });
      });
    });

    // Evidence nodes — right column, spaced proportionally
    const evSpacing = Math.max(70, (incidentCount * 120) / evidenceCount);
    caseData.evidence.forEach((entry, index) => {
      nodes.push({
        id: entry.id,
        type: "evidenceNode",
        position: { x: 760, y: 10 + index * evSpacing },
        data: {
          label: `${entry.code} ${entry.type}`,
          code: entry.code,
          type: entry.type,
          confidence: entry.confidence
        }
      });

      entry.linkedIncidentIds.forEach((incidentId) => {
        const incident = incidentById.get(incidentId);
        const color = incident ? phaseColor[incident.phase] || "rgba(200,200,200,0.3)" : "rgba(200,200,200,0.3)";
        edges.push({
          id: `${incidentId}-${entry.id}`,
          source: incidentId,
          target: entry.id,
          type: "smoothstep",
          markerEnd: { type: MarkerType.ArrowClosed, color: `${color}99` },
          style: { stroke: `${color}55`, strokeWidth: 1.4 }
        });
      });
    });

    return { nodes, edges };
  }, [incidentById]);

  const selectedNode = useMemo(
    () => graph.nodes.find((n) => n.id === selectedNodeId) ?? null,
    [graph.nodes, selectedNodeId]
  );

  const relatedIncidents = useMemo(() => {
    if (!selectedNodeId) return [];
    const incidentIds = new Set<string>();
    // If it's an entity, find all incidents linked to it
    const entity = caseData.entities.find((e) => e.id === selectedNodeId);
    if (entity) {
      caseData.incidents.forEach((inc) => {
        if (inc.linkedEntityIds.includes(entity.id)) incidentIds.add(inc.id);
      });
    }
    // If it's an incident itself
    if (incidentById.has(selectedNodeId)) {
      incidentIds.add(selectedNodeId);
    }
    // If it's evidence, find linked incidents
    const ev = evidenceById.get(selectedNodeId);
    if (ev) {
      ev.linkedIncidentIds.forEach((id) => incidentIds.add(id));
    }
    return Array.from(incidentIds)
      .map((id) => incidentById.get(id))
      .filter((i): i is Incident => Boolean(i));
  }, [selectedNodeId, incidentById, evidenceById]);

  const relatedEvidence = useMemo(() => {
    if (!selectedNodeId) return [];
    const evidenceIds = new Set<string>();
    // From incident
    const inc = incidentById.get(selectedNodeId);
    if (inc) {
      inc.linkedEvidenceIds.forEach((id) => evidenceIds.add(id));
    }
    // If it's evidence itself
    if (evidenceById.has(selectedNodeId)) {
      evidenceIds.add(selectedNodeId);
    }
    // From entity -> incidents -> evidence
    const entity = caseData.entities.find((e) => e.id === selectedNodeId);
    if (entity) {
      caseData.incidents.forEach((i) => {
        if (i.linkedEntityIds.includes(entity.id)) {
          i.linkedEvidenceIds.forEach((id) => evidenceIds.add(id));
        }
      });
    }
    return Array.from(evidenceIds)
      .map((id) => evidenceById.get(id))
      .filter((e): e is Evidence => Boolean(e));
  }, [selectedNodeId, incidentById, evidenceById]);

  const onNodeClick: NodeMouseHandler = (_, node) => {
    setSelectedNodeId(node.id);
  };

  return (
    <motion.section id="links" className="mt-12" {...sectionAnimation}>
      <SectionTitle title="Граф связей" subtitle="Сущности → инциденты → подтверждающие улики" />

      <div className="case-panel mt-5 rounded-2xl p-3 sm:p-5">
        <div className="grid gap-4 xl:grid-cols-[1.4fr_0.8fr]">
          {/* Graph */}
          <div className="h-[800px] rounded-xl border border-white/8 bg-ink-950">
            <ReactFlow
              nodes={graph.nodes}
              edges={graph.edges}
              nodeTypes={nodeTypes}
              fitView
              fitViewOptions={{ padding: 0.1 }}
              onNodeClick={onNodeClick}
              className="rounded-xl"
              proOptions={{ hideAttribution: true }}
            >
              <Background color="rgba(255,255,255,0.04)" gap={22} size={1} />
              <Controls
                showInteractive={false}
                className="!bg-ink-900/80 !border-white/10"
              />
            </ReactFlow>
          </div>

          {/* Context panel */}
          <div className="rounded-xl border border-white/8 bg-ink-850/60 p-5">
            <h3 className="font-serif text-lg font-semibold">Связанный контекст</h3>
            {!selectedNode && (
              <p className="mt-3 text-sm leading-relaxed text-ink-400">
                Выберите узел на графе. Панель покажет связанные эпизоды и улики.
              </p>
            )}
            {selectedNode && (
              <div className="mt-4 space-y-5">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-500">Активный узел</p>
                  <p className="mt-1 text-sm text-ink-100">
                    {selectedNode.data.label || selectedNode.data.code || selectedNode.id}
                  </p>
                </div>

                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-500">
                    Инциденты ({relatedIncidents.length})
                  </p>
                  <div className="mt-2 space-y-2">
                    {relatedIncidents.length === 0 && (
                      <p className="text-sm text-ink-500">Нет связей.</p>
                    )}
                    {relatedIncidents.map((incident) => (
                      <button
                        key={incident.id}
                        type="button"
                        onClick={() => onSelectIncident(incident.id)}
                        className="w-full rounded-md border border-white/8 bg-white/[0.02] px-3 py-2 text-left text-sm transition hover:border-signal-700/50 hover:bg-signal-900/10"
                      >
                        <span className="text-ink-100">{incident.title}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-500">
                    Улики ({relatedEvidence.length})
                  </p>
                  <div className="mt-2 space-y-2">
                    {relatedEvidence.length === 0 && (
                      <p className="text-sm text-ink-500">Нет связей.</p>
                    )}
                    {relatedEvidence.map((entry) => (
                      <button
                        key={entry.id}
                        type="button"
                        onClick={() => onSelectEvidence(entry.id)}
                        className="w-full rounded-md border border-white/8 bg-white/[0.02] px-3 py-2 text-left text-sm transition hover:border-signal-700/50 hover:bg-signal-900/10"
                      >
                        <span className="font-mono text-ink-300">{entry.code}</span>
                        <span className="ml-2 text-ink-500">· {entry.type}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
