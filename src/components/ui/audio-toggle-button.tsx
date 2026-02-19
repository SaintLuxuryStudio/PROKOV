"use client";

import { useEffect, useState } from "react";

export function AudioToggleButton() {
  const [mounted, setMounted] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const getter = (window as Window & { __getBackgroundMute?: () => boolean }).__getBackgroundMute;
      if (getter) setMuted(Boolean(getter()));
    }
  }, []);

  const toggle = () => {
    const next = !muted;
    setMuted(next);
    if (typeof window !== "undefined") {
      const setter = (window as Window & { __setBackgroundMute?: (mute: boolean) => void }).__setBackgroundMute;
      if (setter) setter(next);
    }
  };

  if (!mounted) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      className="fixed bottom-4 right-4 z-[120] flex items-center gap-2 rounded-full border border-white/15 bg-ink-900/70 px-3 py-2 text-xs font-semibold text-ink-100 shadow-lg backdrop-blur-md transition hover:border-white/30 hover:bg-ink-850/80"
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink-800 text-base">
        {muted ? "🔇" : "🔊"}
      </span>
      <span className="hidden sm:inline">{muted ? "Звук выкл" : "Звук вкл"}</span>
    </button>
  );
}
