interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-8 border-b border-rule pb-3">
      <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-ink">
        {title}
      </h2>
      {subtitle && (
        <p className="text-ink-soft text-sm sm:text-base max-w-3xl mt-1.5 leading-relaxed font-sans">
          {subtitle}
        </p>
      )}
    </div>
  );
}
