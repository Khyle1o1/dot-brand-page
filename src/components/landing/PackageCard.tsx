import type { EventPackage } from "@/data/landing";

interface PackageCardProps {
  pkg: EventPackage;
}

const PackageCard = ({ pkg }: PackageCardProps) => {
  return (
    <div className="bg-card rounded-3xl p-8 md:p-10 flex flex-col h-full border border-foreground/5 hover:shadow-lg transition-shadow">
      {/* Label pill */}
      <span className="self-start bg-primary text-primary-foreground px-5 py-1.5 rounded-full text-xs font-bold font-body uppercase tracking-wider mb-8">
        {pkg.label}
      </span>

      {/* Title & Price */}
      <h3 className="font-display text-2xl md:text-3xl font-bold text-primary mb-1">{pkg.title}</h3>
      <p className="font-display text-3xl md:text-4xl font-bold text-accent mb-8">{pkg.price}</p>

      {/* Details */}
      <ul className="space-y-3 mb-8 font-body text-foreground">
        {pkg.details.map((d) => (
          <li key={d} className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
            <span className="text-sm">{d}</span>
          </li>
        ))}
      </ul>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-8">
        {pkg.badges.map((b) => (
          <span
            key={b}
            className="border border-foreground rounded-full px-4 py-1 text-xs font-bold font-body text-foreground uppercase tracking-wide"
          >
            {b}
          </span>
        ))}
      </div>

      {/* Add-ons */}
      {pkg.addOns.length > 0 && (
        <div className="mt-auto pt-6 border-t border-foreground/10">
          <p className="text-accent font-bold text-xs uppercase tracking-wider mb-3 font-body">Add-ons</p>
          <ul className="space-y-1.5 font-body text-sm text-muted-foreground">
            {pkg.addOns.map((a) => (
              <li key={a}>• {a}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PackageCard;
