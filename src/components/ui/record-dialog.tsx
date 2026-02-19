"use client";

import * as Dialog from "@radix-ui/react-dialog";

export function RecordDialog({
  title,
  open,
  onOpenChange,
  children
}: {
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" />
        <Dialog.Content className="case-scrollbar fixed left-1/2 top-1/2 z-50 max-h-[84vh] w-[92vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border border-white/12 bg-ink-900 shadow-dossier">
          {/* Top severity/accent bar */}
          <div className="h-[3px] w-full bg-gradient-to-r from-signal-700 to-signal-900" />

          <div className="relative p-5 sm:p-6">
            {/* Watermark */}
            <div className="pointer-events-none absolute right-4 top-4 select-none font-mono text-[8rem] font-black leading-none text-white/[0.02]">
              #
            </div>

            <div className="relative mb-5 flex items-start justify-between gap-3">
              <Dialog.Title className="font-serif text-xl font-bold">{title}</Dialog.Title>
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="rounded-md border border-white/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-400 transition hover:border-signal-700/70 hover:text-white"
                >
                  Закрыть
                </button>
              </Dialog.Close>
            </div>
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
