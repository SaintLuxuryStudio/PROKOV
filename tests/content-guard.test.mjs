import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const files = [
  "app/page.tsx",
  "app/layout.tsx",
  "src/components/case-dossier-page.tsx",
  "src/data/case-data.ts"
];

const forbidden = [
  /\bфильм\b/iu,
  /\bрежиссер\b/iu,
  /\bактер\b/iu,
  /\bпремьера\b/iu,
  /\bimdb\b/iu,
  /стриминг-?платформ/iu
];

test("UI и данные не содержат кино-маркеров", async () => {
  for (const relativeFile of files) {
    const fullPath = path.join(root, relativeFile);
    const content = await readFile(fullPath, "utf8");

    for (const pattern of forbidden) {
      assert.equal(
        pattern.test(content),
        false,
        `Найден запрещенный термин ${pattern} в файле ${relativeFile}`
      );
    }
  }
});
