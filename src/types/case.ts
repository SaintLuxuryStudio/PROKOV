export type RiskLevel = "критический" | "высокий" | "средний" | "низкий";

export interface CaseMeta {
  caseNumber: string;
  title: string;
  status: string;
  period: string;
  geography: string;
  riskLevel: RiskLevel;
  synopsis: string;
}

export interface Entity {
  id: string;
  name: string;
  role: string;
  tags: string[];
  riskScore: number;
}

export interface Incident {
  id: string;
  title: string;
  phase: "турист" | "бродяга" | "психоз";
  datetimeApprox: string;
  location: string;
  summary: string;
  severity: number;
  linkedEntityIds: string[];
  linkedEvidenceIds: string[];
  sourceCodes: string[];
}

export interface Evidence {
  id: string;
  code: string;
  type: "видеофрагмент" | "поведенческий маркер" | "свидетельство" | "оперативная заметка";
  description: string;
  sourceRef: string;
  confidence: number;
  linkedIncidentIds: string[];
  media?: EvidenceMedia[];
}

export interface EvidenceMedia {
  url: string;
  kind: "video" | "image";
}

export interface TimelinePoint {
  id: string;
  label: string;
  phase: "турист" | "бродяга" | "психоз";
  escalationIndex: number;
  linkedIncidentId: string;
}

export interface CaseSource {
  id: string;
  code: string;
  title: string;
  fragment: string;
  origin: string;
}

export interface Hypothesis {
  id: string;
  title: string;
  weight: number;
  argument: string;
}

export interface CaseData {
  meta: CaseMeta;
  entities: Entity[];
  incidents: Incident[];
  evidence: Evidence[];
  timeline: TimelinePoint[];
  sources: CaseSource[];
  profileFindings: string[];
  escalationFactors: string[];
  hypotheses: Hypothesis[];
  openQuestions: string[];
}
