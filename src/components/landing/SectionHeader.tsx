interface SectionHeaderProps {
  title: string;
  badge?: string;
  id?: string;
}

const SectionHeader = ({ title, badge, id }: SectionHeaderProps) => {
  return (
    <div id={id} className="flex flex-wrap items-center gap-4 mb-10 scroll-mt-24">
      <h2 className="font-heading text-4xl md:text-5xl text-accent">{title}</h2>
      {badge && (
        <span className="bg-secondary text-secondary-foreground px-4 py-1.5 rounded-full text-sm font-semibold font-body">
          {badge}
        </span>
      )}
    </div>
  );
};

export default SectionHeader;
