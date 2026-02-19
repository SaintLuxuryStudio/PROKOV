"use client";

import { useMemo, useState } from "react";

import { ReadingProgressBar } from "@/src/components/ui/reading-progress-bar";
import { RecordDialog } from "@/src/components/ui/record-dialog";
import { Field } from "@/src/components/ui/field";
import { SeverityBadge } from "@/src/components/ui/severity-badge";
import { HeroSection } from "@/src/components/sections/hero-section";
import { NavBar } from "@/src/components/sections/nav-bar";
import { TimelineSection } from "@/src/components/sections/timeline-section";
import { GeographySection } from "@/src/components/sections/geography-section";
import { EvidenceSection } from "@/src/components/sections/evidence-section";
import { HypothesesSection } from "@/src/components/sections/hypotheses-section";
import { ConclusionSection } from "@/src/components/sections/conclusion-section";

import { caseData } from "@/src/data/case-data";
import { phaseLabel } from "@/src/lib/phase-colors";

export function CaseDossierPage() {
  const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(null);
  const [selectedEvidenceId, setSelectedEvidenceId] = useState<string | null>(null);
  const [selectedSourceCode, setSelectedSourceCode] = useState<string | null>(null);

  const sourceByCode = useMemo(
    () => new Map(caseData.sources.map((s) => [s.code, s])),
    []
  );
  const incidentById = useMemo(
    () => new Map(caseData.incidents.map((i) => [i.id, i])),
    []
  );
  const evidenceById = useMemo(
    () => new Map(caseData.evidence.map((e) => [e.id, e])),
    []
  );

  const selectedIncident = selectedIncidentId ? incidentById.get(selectedIncidentId) ?? null : null;
  const selectedEvidence = selectedEvidenceId ? evidenceById.get(selectedEvidenceId) ?? null : null;
  const selectedSource = selectedSourceCode ? sourceByCode.get(selectedSourceCode) ?? null : null;

  const openSource = (code: string) => {
    if (sourceByCode.has(code)) {
      setSelectedSourceCode(code);
    }
  };

  return (
    <>
      <ReadingProgressBar />

      <main className="mx-auto max-w-[1300px] px-4 pb-24 pt-6 text-ink-100 sm:px-6 lg:px-8">
        {/* Author credit — top */}
        <div className="mb-6 text-center">
          <p className="text-sm text-ink-400">
            сделано прекрасным{" "}
            <a
              href="https://t.me/serezha168"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 font-semibold text-sky-400 transition hover:bg-sky-500/20 hover:text-sky-300"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
              serezha168
            </a>
            {" "}переходите в мой тг
          </p>
        </div>

        <HeroSection />
        <NavBar />
        <TimelineSection onSelectIncident={setSelectedIncidentId} />
        <GeographySection onSelectIncident={setSelectedIncidentId} />
        <EvidenceSection
          onSelectEvidence={setSelectedEvidenceId}
          onOpenSource={openSource}
        />
        <HypothesesSection />
        <ConclusionSection />

        {/* Author credit — bottom */}
        <div className="mt-12 text-center">
          <p className="text-sm text-ink-400">
            сделано прекрасным{" "}
            <a
              href="https://t.me/serezha168"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 font-semibold text-sky-400 transition hover:bg-sky-500/20 hover:text-sky-300"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
              serezha168
            </a>
            {" "}переходите в мой тг
          </p>
        </div>
      </main>

      {/* Incident dialog */}
      <RecordDialog
        title={selectedIncident ? selectedIncident.title : "Инцидент"}
        open={Boolean(selectedIncident)}
        onOpenChange={(open) => {
          if (!open) setSelectedIncidentId(null);
        }}
      >
        {selectedIncident && (
          <div className="space-y-4 text-sm text-ink-100">
            <div className="grid gap-2 sm:grid-cols-3">
              <Field label="Фаза" value={phaseLabel[selectedIncident.phase] || selectedIncident.phase} />
              <Field label="Время" value={selectedIncident.datetimeApprox} />
              <Field label="Локация" value={selectedIncident.location} />
            </div>
            <p className="leading-relaxed text-ink-200">{selectedIncident.summary}</p>
            <SeverityBadge severity={selectedIncident.severity} />
            <div className="flex flex-wrap gap-2 border-t border-white/5 pt-3">
              {selectedIncident.sourceCodes.map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => openSource(code)}
                  className="animated-underline font-mono text-[10px] uppercase tracking-[0.12em] text-ink-400 transition hover:text-ink-100"
                >
                  [{code}]
                </button>
              ))}
            </div>
          </div>
        )}
      </RecordDialog>

      {/* Evidence dialog */}
      <RecordDialog
        title={selectedEvidence ? `${selectedEvidence.code}: карточка улики` : "Карточка улики"}
        open={Boolean(selectedEvidence)}
        onOpenChange={(open) => {
          if (!open) setSelectedEvidenceId(null);
        }}
      >
        {selectedEvidence && (
          <div className="space-y-4 text-sm text-ink-100">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Тип" value={selectedEvidence.type} />
              <Field label="Уверенность" value={`${Math.round(selectedEvidence.confidence * 100)}%`} />
              <Field label="Источник" value={selectedEvidence.sourceRef} />
              <Field label="Связано инцидентов" value={String(selectedEvidence.linkedIncidentIds.length)} />
            </div>
            <p className="leading-relaxed text-ink-200">{selectedEvidence.description}</p>

            {selectedEvidence.media?.length ? (
              <div className="space-y-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-500">Медиа</p>
                <div className="flex flex-col gap-3">
                  {selectedEvidence.media.map((item) => (
                    <div key={item.url} className="overflow-hidden rounded-lg border border-white/8 bg-white/[0.02] p-2">
                      {item.kind === "image" ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={encodeURI(item.url)} alt={selectedEvidence.code} className="w-full rounded-md" />
                      ) : (
                        <video
                          src={encodeURI(item.url)}
                          controls
                          className="w-full rounded-md"
                          preload="metadata"
                        />
                      )}
                      <p className="mt-1 font-mono text-[10px] text-ink-500 break-words">{item.url}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="space-y-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-500">Связанные эпизоды</p>
              {selectedEvidence.linkedIncidentIds.map((incidentId) => {
                const incident = incidentById.get(incidentId);
                if (!incident) return null;
                return (
                  <button
                    key={incident.id}
                    type="button"
                    onClick={() => {
                      setSelectedEvidenceId(null);
                      setSelectedIncidentId(incident.id);
                    }}
                    className="block w-full rounded-md border border-white/8 bg-white/[0.02] px-3 py-2 text-left text-sm transition hover:border-signal-700/50"
                  >
                    {incident.title}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </RecordDialog>

      {/* Source dialog */}
      <RecordDialog
        title={selectedSource ? `${selectedSource.code}: сноска архива` : "Сноска архива"}
        open={Boolean(selectedSource)}
        onOpenChange={(open) => {
          if (!open) setSelectedSourceCode(null);
        }}
      >
        {selectedSource && (
          <div className="space-y-3 text-sm text-ink-100">
            <Field label="Документ" value={selectedSource.title} />
            <Field label="Происхождение" value={selectedSource.origin} />
            <div className="rounded-md border border-white/8 bg-white/[0.02] p-3 leading-relaxed text-ink-200">
              {selectedSource.fragment}
            </div>
          </div>
        )}
      </RecordDialog>
    </>
  );
}
