import type { EventPackage } from "@/data/landing";

interface PackageCardProps {
  pkg: EventPackage;
}

const PackageCard = ({ pkg }: PackageCardProps) => {
  return (
    <div className="bg-card rounded-2xl p-8 flex flex-col h-full border border-foreground/5">
      {/* Label pill */}
      <span className="self-start bg-primary text-primary-foreground px-5 py-1.5 rounded-full text-sm font-semibold font-body mb-6">
        {pkg.label}
      </span>

      {/* Title & Price */}
      <h3 className="font-heading text-2xl md:text-3xl text-primary mb-2">{pkg.title}</h3>
      <p className="font-heading text-3xl md:text-4xl text-accent mb-6">{pkg.price}</p>

      {/* Details */}
      <ul className="space-y-2 mb-6 font-body text-foreground">
        {pkg.details.map((d) => (
          <li key={d} className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
            {d}
          </li>
        ))}
      </ul>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-6">
        {pkg.badges.map((b) => (
          <span
            key={b}
            className="border border-foreground rounded-full px-4 py-1 text-xs font-semibold font-body text-foreground"
          >
            {b}
          </span>
        ))}
      </div>

      {/* Add-ons */}
      {pkg.addOns.length > 0 && (
        <div className="mt-auto pt-4 border-t border-foreground/10">
          <p className="text-accent font-semibold text-sm mb-3 font-body">add-ons</p>
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
