"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "@/src/components/ui/section-title";
import { caseData } from "@/src/data/case-data";
import { sectionAnimation } from "@/src/lib/animation-config";

export function ConclusionSection() {
  return (
    <motion.section id="conclusion" className="mt-12" {...sectionAnimation}>
      <SectionTitle title="Итог по делу" subtitle="Формализованный вывод" />

      <div className="case-panel mt-5 rounded-2xl p-5 sm:p-7">
        {/* Verdict stamp */}
        <div className="mb-6 flex justify-center">
          <div className="stamp-lg">
            Статус дела: активно
          </div>
        </div>

        <p className="mx-auto max-w-3xl text-center text-sm leading-relaxed text-ink-200 sm:text-base">
          Массив подтвержденных эпизодов указывает на сверхвысокий риск повторных насильственных действий. Внутренняя логика
          поведения сочетает импульсивность, ритуальные элементы и частичную осознанность при сокрытии следов. Приоритет
          следствия: расширение географии проверки, идентификация дополнительных носителей и восстановление полной цепочки
          действий после финального обрыва записи.
        </p>

        {/* Footer line */}
        <div className="mt-10 border-t border-white/5 pt-6 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-600">
            {caseData.meta.caseNumber} · Досье сформировано · Международный розыск: активно
          </p>
        </div>
      </div>
    </motion.section>
  );
}
