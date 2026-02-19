"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function DisclaimerModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAccept = () => {
    // Trigger background audio start directly via global method exposed by BackgroundAudio
    if (typeof window !== "undefined") {
      const starter = (window as Window & { __startBackgroundAudio?: () => void }).__startBackgroundAudio;
      if (starter) starter();
    }
    setIsOpen(false);
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950/95 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="mx-4 max-w-lg overflow-hidden rounded-2xl border border-signal-700/40 bg-ink-900/95 shadow-2xl"
          >
            {/* Header */}
            <div className="relative border-b border-white/8 bg-gradient-to-br from-signal-900/30 to-transparent px-6 py-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-signal-700/30 text-xl">
                  ⚠️
                </span>
                <div>
                  <h2 className="font-serif text-xl font-bold text-signal-300">
                    18+
                  </h2>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-signal-400/80">
                    Внимание — предупреждение перед входом
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-4 p-6 text-sm text-ink-200">
              <div className="rounded-lg border border-signal-700/20 bg-signal-900/10 p-4">
                <p className="leading-relaxed">
                  Данный сайт содержит фрагменты художественных фильмов, включая сцены насилия, жестокости и контент для взрослых (18+).
                </p>
              </div>

              <div className="rounded-lg border border-white/8 bg-ink-850/50 p-4">
                <p className="mb-2 font-semibold text-signal-200">
                  ⚠️ Все материалы являются художественным вымыслом.
                </p>
                <p className="leading-relaxed text-ink-300">
                  Показанные события, персонажи и ситуации — выдуманы. Все фрагменты взяты из официальных художественных фильмов и размещены в аналитических и обзорных целях. Любое сходство с реальными событиями является случайным совпадением.
                </p>
              </div>

              <p className="text-center text-xs text-ink-400">
                Продолжая просмотр, вы подтверждаете, что вам исполнилось 18 лет и вы осознаёте художественный характер всего контента на данном сайте.
              </p>
            </div>

            {/* Footer */}
            <div className="border-t border-white/8 bg-ink-850/30 px-6 py-4">
              <button
                type="button"
                onClick={handleAccept}
                className="w-full rounded-lg border border-signal-700/60 bg-gradient-to-r from-signal-800/60 to-signal-700/40 px-4 py-3 font-semibold text-signal-100 shadow-[0_0_20px_rgba(142,27,27,0.2)] transition-all hover:scale-[1.02] hover:border-signal-500/80 hover:shadow-[0_0_30px_rgba(142,27,27,0.35)] active:scale-[0.98]"
              >
                <span className="flex items-center justify-center gap-2">
                  <span>🔞</span>
                  Мне есть 18 лет — войти
                </span>
              </button>
              <p className="mt-2 text-center font-mono text-[9px] text-ink-500">
                Нажимая кнопку, вы соглашаетесь с условиями использования сайта
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
