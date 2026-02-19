import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const file = await readFile("src/data/case-data.ts", "utf8");

function sectionBlock(startKey, endKey) {
  const expression = new RegExp(`${startKey}:\\s*\\[(?<block>[\\s\\S]*?)\\],\\s*${endKey}:`);
  const match = file.match(expression);
  assert.ok(match?.groups?.block, `Не найден блок ${startKey}`);
  return match.groups.block;
}

function extractCodesFromListLiteral(listLiteral) {
  return Array.from(listLiteral.matchAll(/"([^"]+)"/g)).map((match) => match[1]);
}

function extractAll(pattern, target) {
  return Array.from(target.matchAll(pattern));
}

test("Все коды из инцидентов и улик раскрываются в блоке sources", () => {
  const sourceBlock = sectionBlock("sources", "profileFindings");
  const sourceCodes = new Set(extractAll(/code:\s*"([^"]+)"/g, sourceBlock).map((m) => m[1]));

  const incidentCodeLists = extractAll(/sourceCodes:\s*\[([^\]]+)\]/g, file).map((m) => m[1]);
  const incidentCodes = incidentCodeLists.flatMap(extractCodesFromListLiteral);

  const evidenceBlock = sectionBlock("evidence", "timeline");
  const evidenceCodes = extractAll(/code:\s*"([^"]+)"/g, evidenceBlock).map((m) => m[1]);

  for (const code of [...incidentCodes, ...evidenceCodes]) {
    assert.equal(sourceCodes.has(code), true, `Код ${code} отсутствует в блоке sources`);
  }
});

test("Связи timeline/evidence/incidents целостны", () => {
  const incidentBlock = sectionBlock("incidents", "evidence");
  const evidenceBlock = sectionBlock("evidence", "timeline");
  const timelineBlock = sectionBlock("timeline", "sources");

  const incidentIds = new Set(extractAll(/id:\s*"(inc-[^"]+)"/g, incidentBlock).map((m) => m[1]));
  const evidenceIds = new Set(extractAll(/id:\s*"(ev-[^"]+)"/g, evidenceBlock).map((m) => m[1]));

  const timelineLinks = extractAll(/linkedIncidentId:\s*"([^"]+)"/g, timelineBlock).map((m) => m[1]);
  for (const linkedIncidentId of timelineLinks) {
    assert.equal(incidentIds.has(linkedIncidentId), true, `Timeline ссылается на неизвестный инцидент ${linkedIncidentId}`);
  }

  const incidentEvidenceLinks = extractAll(/linkedEvidenceIds:\s*\[([^\]]+)\]/g, incidentBlock)
    .map((m) => extractCodesFromListLiteral(m[1]))
    .flat();
  for (const linkedEvidenceId of incidentEvidenceLinks) {
    assert.equal(evidenceIds.has(linkedEvidenceId), true, `Инцидент ссылается на неизвестную улику ${linkedEvidenceId}`);
  }

  const evidenceIncidentLinks = extractAll(/linkedIncidentIds:\s*\[([^\]]+)\]/g, evidenceBlock)
    .map((m) => extractCodesFromListLiteral(m[1]))
    .flat();
  for (const linkedIncidentId of evidenceIncidentLinks) {
    assert.equal(incidentIds.has(linkedIncidentId), true, `Улика ссылается на неизвестный инцидент ${linkedIncidentId}`);
  }
});
