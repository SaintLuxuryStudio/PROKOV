"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "@/src/components/ui/section-title";
import { caseData } from "@/src/data/case-data";
import { sectionAnimation } from "@/src/lib/animation-config";

export function HypothesesSection() {
  return (
    <motion.section id="versions" className="mt-12" {...sectionAnimation}>
      <SectionTitle title="Версионность интерпретаций" subtitle="Две рабочие гипотезы с весами уверенности" />

      <div className="case-panel mt-5 rounded-2xl p-5 sm:p-7">
        <div className="grid gap-5 sm:grid-cols-2">
          {caseData.hypotheses.map((hypothesis) => {
            const isStronger = hypothesis.weight > 50;
            return (
              <motion.article
                key={hypothesis.id}
                className={`relative overflow-hidden rounded-xl border p-5 ${
                  isStronger
                    ? "border-signal-700/40 bg-signal-900/10"
                    : "border-white/8 bg-ink-850/60"
                }`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {/* Weight arc visualization */}
                <div className="mb-4 flex items-center gap-4">
                  <div className="relative h-16 w-16 flex-shrink-0">
                    <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90">
                      {/* Background circle */}
                      <circle
                        cx="32" cy="32" r="26"
                        fill="none"
                        stroke="rgba(255,255,255,0.06)"
                        strokeWidth="5"
                      />
                      {/* Progress arc */}
                      <circle
                        cx="32" cy="32" r="26"
                        fill="none"
                        stroke={isStronger ? "#8e1b1b" : "#666666"}
                        strokeWidth="5"
                        strokeDasharray={`${hypothesis.weight * 1.63} ${163 - hypothesis.weight * 1.63}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`font-mono text-sm font-bold ${isStronger ? "text-signal-300" : "text-ink-300"}`}>
                        {hypothesis.weight}%
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-semibold leading-tight sm:text-lg">
                      {hypothesis.title}
                    </h3>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-500">
                      Вес: {hypothesis.weight}%
                    </p>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-ink-300">{hypothesis.argument}</p>

                {isStronger && (
                  <div className="mt-4 rounded border border-signal-700/30 bg-signal-900/15 px-3 py-2">
                    <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-signal-400">
                      Приоритетная версия
                    </span>
                  </div>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
