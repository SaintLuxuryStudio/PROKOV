"use client";

import { useScrollProgress } from "@/src/components/hooks/use-scroll-progress";

export function ReadingProgressBar() {
  const progress = useScrollProgress();

  return (
    <div className="fixed left-0 top-0 z-[60] h-[2px] w-full">
      <div
        className="h-full bg-gradient-to-r from-signal-700 via-signal-500 to-signal-400 transition-[width] duration-150"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}
