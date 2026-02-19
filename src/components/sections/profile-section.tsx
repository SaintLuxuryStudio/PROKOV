"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "@/src/components/ui/section-title";
import { caseData } from "@/src/data/case-data";
import { phaseColor, phaseLabel } from "@/src/lib/phase-colors";
import { sectionAnimation } from "@/src/lib/animation-config";

const phases = ["турист", "бродяга", "психоз"] as const;
const phaseDescriptions: Record<string, string> = {
  "турист": "Социальная наивность, зависимость от одобрения, импульсивность",
  "бродяга": "Агрессия как инструмент, утрата тормозов, символизация",
  "психоз": "Ритуализация, языковая дезинтеграция, серийные паттерны"
};

export function ProfileSection() {
  return (
    <motion.section id="profile" className="mt-12" {...sectionAnimation}>
      <SectionTitle title="Психологический профайл" subtitle="Поведенческие признаки и траектория распада" />

      <div className="case-panel mt-5 rounded-2xl p-5 sm:p-7">
        {/* Phase progression - journey map */}
        <div className="mb-8">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-500">
            Траектория деградации
          </p>
          <div className="flex flex-col gap-0 sm:flex-row">
            {phases.map((phase, i) => (
              <div key={phase} className="relative flex-1">
                {/* Connector line */}
                {i < phases.length - 1 && (
                  <div className="absolute right-0 top-1/2 hidden h-px w-full -translate-y-1/2 sm:block" style={{
                    background: `linear-gradient(90deg, ${phaseColor[phase]}66, ${phaseColor[phases[i + 1]]}66)`
                  }} />
                )}
                <div
                  className="relative rounded-lg border p-4"
                  style={{
                    borderColor: `${phaseColor[phase]}33`,
                    background: `${phaseColor[phase]}08`
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: phaseColor[phase] }}
                    />
                    <span
                      className="font-mono text-xs font-bold uppercase tracking-[0.12em]"
                      style={{ color: phaseColor[phase] }}
                    >
                      {phaseLabel[phase]}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-ink-300">
                    {phaseDescriptions[phase]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {/* Key findings as blockquote cards */}
          <div>
            <h3 className="font-serif text-lg font-semibold">Ключевые признаки</h3>
            <div className="mt-4 space-y-3">
              {caseData.profileFindings.map((item, i) => (
                <motion.blockquote
                  key={item}
                  className="relative rounded-lg border border-white/5 bg-white/[0.02] p-4 pl-5"
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  {/* Large quote mark */}
                  <span className="absolute -left-1 -top-2 font-serif text-3xl text-signal-700/30">
                    &ldquo;
                  </span>
                  <div className="absolute left-0 top-0 h-full w-1 rounded-l-lg bg-signal-700/40" />
                  <p className="text-sm leading-relaxed text-ink-200">{item}</p>
                </motion.blockquote>
              ))}
            </div>
          </div>

          {/* Response level */}
          <div>
            <h3 className="font-serif text-lg font-semibold">Рекомендуемый уровень реагирования</h3>
            <p className="mt-4 text-sm leading-relaxed text-ink-200">
              Субъект рассматривается как лицо с экстремальной склонностью к повторной эскалации. Требуется усиленный контур
              реагирования: межрегиональный обмен данными, ретроспективная сверка нераскрытых дел и приоритетная обработка
              любого сигнала о ритуализированных эпизодах с поджогами и символикой сердца.
            </p>

            {/* Critical alert */}
            <div className="mt-6 rounded-lg border border-signal-700/50 bg-signal-900/20 p-4 animate-pulse-glow">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-signal-600 animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-signal-400">
                  Критический статус
                </span>
              </div>
              <p className="mt-2 text-sm text-signal-200">
                Немедленная координация между оперативными, криминалистическими и медицинскими службами.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
