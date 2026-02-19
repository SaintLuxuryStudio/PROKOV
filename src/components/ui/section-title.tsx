export function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header>
      <h2 className="font-serif text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">{title}</h2>
      <p className="mt-2 text-sm text-ink-400 sm:text-base">{subtitle}</p>
    </header>
  );
}
