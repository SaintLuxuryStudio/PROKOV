"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "@/src/components/ui/section-title";
import { caseData } from "@/src/data/case-data";
import { sectionAnimation } from "@/src/lib/animation-config";

export function SummarySection() {
  return (
    <motion.section id="summary" className="mt-10" {...sectionAnimation}>
      <SectionTitle title="Сводка по делу" subtitle="Стартовые условия и ключевая картина эскалации" />

      <div className="mt-5 space-y-6">
        {/* Pull quote */}
        <div className="pull-quote">
          Наблюдение показывает последовательный сдвиг от социальной неуклюжести к устойчивой практике насилия.
        </div>

        {/* Main text */}
        <div className="case-panel rounded-2xl p-5 sm:p-7">
          <p className="text-sm leading-relaxed text-ink-200 sm:text-base">
            Субъект сначала фиксировал окружающую среду как пространство надежды, затем перешел к стратегии выживания через
            агрессию и в финальной фазе демонстрировал дезорганизованные, но повторяемые ритуальные паттерны.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {/* Escalation factors - vertical timeline style */}
            <div className="rounded-xl border border-white/8 bg-ink-850/60 p-5">
              <h3 className="font-serif text-lg font-semibold">Факторы эскалации</h3>
              <div className="relative mt-4 space-y-4 pl-5">
                {/* Vertical line */}
                <div className="absolute bottom-2 left-[5px] top-2 w-px bg-gradient-to-b from-signal-700 to-signal-900" />
                {caseData.escalationFactors.map((item, i) => (
                  <motion.div
                    key={item}
                    className="relative flex gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <span className="absolute -left-5 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-signal-700 bg-ink-900" />
                    <span className="text-sm leading-relaxed text-ink-200">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Profile findings - quote cards */}
            <div className="rounded-xl border border-white/8 bg-ink-850/60 p-5">
              <h3 className="font-serif text-lg font-semibold">Профайлинг</h3>
              <div className="mt-4 space-y-3">
                {caseData.profileFindings.map((item, i) => (
                  <motion.div
                    key={item}
                    className="relative rounded-lg border border-white/5 bg-white/[0.02] p-3 pl-4"
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                  >
                    <div className="absolute left-0 top-0 h-full w-1 rounded-l-lg bg-ink-600" />
                    <p className="text-sm text-ink-300">{item}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
