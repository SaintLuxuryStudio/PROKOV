export const phaseColor: Record<string, string> = {
  "турист": "#2d6a4f",
  "бродяга": "#b08d3e",
  "психоз": "#8e1b1b"
};

export const phaseLabel: Record<string, string> = {
  "турист": "Турист",
  "бродяга": "Бродяга",
  "психоз": "Психоз"
};

export const phaseBgClass: Record<string, string> = {
  "турист": "phase-bg-tourist",
  "бродяга": "phase-bg-vagrant",
  "психоз": "phase-bg-psychosis"
};

export function severityColor(severity: number): string {
  if (severity >= 90) return "#8e1b1b";
  if (severity >= 70) return "#c44e1a";
  if (severity >= 50) return "#b08d3e";
  return "#2d6a4f";
}

export function severityLabel(severity: number): string {
  if (severity >= 90) return "Критический";
  if (severity >= 70) return "Высокий";
  if (severity >= 50) return "Существенный";
  return "Контролируемый";
}

export function evidenceTypeColor(type: string): string {
  switch (type) {
    case "видеофрагмент": return "#3b82f6";
    case "поведенческий маркер": return "#8b5cf6";
    case "свидетельство": return "#10b981";
    case "оперативная заметка": return "#f59e0b";
    default: return "#666666";
  }
}

export function confidenceColor(confidence: number): string {
  if (confidence >= 0.8) return "#2d6a4f";
  if (confidence >= 0.6) return "#b08d3e";
  return "#c44e1a";
}
