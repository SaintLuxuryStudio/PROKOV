"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "@/src/components/ui/section-title";
import { caseData } from "@/src/data/case-data";
import { sectionAnimation } from "@/src/lib/animation-config";

export function ConclusionSection() {
  return (
    <motion.section id="conclusion" className="mt-12" {...sectionAnimation}>
      <SectionTitle title="Итог по делу" subtitle="Формализованный вывод и нерешенные задачи" />

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

        {/* Open questions */}
        <div className="mt-8">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-500">
            Нерешенные вопросы
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {caseData.openQuestions.map((question, i) => (
              <motion.div
                key={question}
                className="relative rounded-lg border border-white/8 bg-ink-850/60 p-4 pl-12"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                {/* Number */}
                <span className="absolute left-4 top-4 font-mono text-lg font-bold text-ink-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm leading-relaxed text-ink-300">{question}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer line */}
        <div className="mt-10 border-t border-white/5 pt-6 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-600">
            {caseData.meta.caseNumber} · Досье сформировано · Международный розыск: активно
          </p>
          <div className="mx-auto mt-3 w-32 border-b border-dashed border-white/15" />
          <p className="mt-2 font-mono text-[9px] text-ink-600">подпись уполномоченного</p>
        </div>
      </div>
    </motion.section>
  );
}
