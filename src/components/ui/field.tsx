export function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.02] p-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-400">{label}</p>
      <p className="mt-1 text-sm text-ink-100">{value}</p>
    </div>
  );
}
