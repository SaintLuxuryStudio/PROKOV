"use client";

import { useActiveSection } from "@/src/components/hooks/use-active-section";
import { caseData } from "@/src/data/case-data";

const quickSections = [
  { id: "timeline", label: "Таймлайн" },
  { id: "geography", label: "Карта" },
  { id: "evidence", label: "Улики" },
  { id: "versions", label: "Версии" },
  { id: "conclusion", label: "Заключение" }
];

const sectionIds = quickSections.map((s) => s.id);

export function NavBar() {
  const activeId = useActiveSection(sectionIds);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="sticky top-0 z-40 mt-5 rounded-xl border border-white/[0.06] bg-ink-900/90 px-3 py-2 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        {/* Case number - visible on larger screens */}
        <span className="hidden font-mono text-[9px] uppercase tracking-[0.14em] text-ink-500 lg:block">
          {caseData.meta.caseNumber}
        </span>
        <div className="hidden h-4 w-px bg-white/10 lg:block" />

        <ul className="case-scrollbar flex flex-1 gap-1.5 overflow-x-auto py-1">
          {quickSections.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`whitespace-nowrap rounded-md px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] transition-all ${
                    isActive
                      ? "border border-signal-700/60 bg-signal-900/30 text-signal-300"
                      : "border border-transparent text-ink-400 hover:border-white/10 hover:text-ink-200"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
