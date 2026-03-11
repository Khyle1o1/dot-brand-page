interface SectionHeaderProps {
  title: string;
  badge?: string;
  subtitle?: string;
  id?: string;
}

const SectionHeader = ({ title, badge, subtitle, id }: SectionHeaderProps) => {
  return (
    <div id={id} className="mb-16 scroll-mt-24">
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-accent tracking-tight">
          {title}
        </h2>
        {badge && (
          <span className="bg-secondary text-secondary-foreground px-5 py-1.5 rounded-full text-xs font-bold font-body uppercase tracking-wider">
            {badge}
          </span>
        )}
      </div>
      {subtitle && (
        <p className="text-muted-foreground font-body text-base md:text-lg max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
