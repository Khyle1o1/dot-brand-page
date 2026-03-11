import { Check } from "lucide-react";
import type { EventPackage } from "@/data/landing";

interface PackageCardProps {
  pkg: EventPackage;
  featured?: boolean;
}

const PackageCard = ({ pkg, featured = false }: PackageCardProps) => {
  return (
    <div
      className={`relative rounded-3xl p-8 md:p-10 flex flex-col h-full transition-all hover:shadow-xl ${
        featured
          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]"
          : "bg-card border border-foreground/5 hover:border-foreground/10"
      }`}
    >
      {/* Most Popular badge */}
      {featured && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-5 py-1.5 rounded-full text-xs font-bold font-body uppercase tracking-wider shadow-md">
          Most Popular
        </span>
      )}

      {/* Label pill */}
      <span
        className={`self-start px-5 py-1.5 rounded-full text-xs font-bold font-body uppercase tracking-wider mb-6 ${
          featured
            ? "bg-primary-foreground/15 text-primary-foreground"
            : "bg-primary/10 text-primary"
        }`}
      >
        {pkg.label}
      </span>

      {/* Title & Price */}
      <h3
        className={`font-display text-2xl md:text-3xl font-bold mb-1 ${
          featured ? "text-primary-foreground" : "text-foreground"
        }`}
      >
        {pkg.title}
      </h3>
      <p
        className={`font-display text-3xl md:text-4xl font-bold mb-8 ${
          featured ? "text-accent" : "text-accent"
        }`}
      >
        {pkg.price}
      </p>

      {/* Details */}
      <ul className="space-y-3 mb-8">
        {pkg.details.map((d) => (
          <li key={d} className="flex items-start gap-3">
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                featured ? "bg-primary-foreground/15" : "bg-primary/10"
              }`}
            >
              <Check className={`w-3 h-3 ${featured ? "text-primary-foreground" : "text-primary"}`} />
            </div>
            <span
              className={`text-sm font-body ${
                featured ? "text-primary-foreground/90" : "text-foreground"
              }`}
            >
              {d}
            </span>
          </li>
        ))}
      </ul>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-8">
        {pkg.badges.map((b) => (
          <span
            key={b}
            className={`border rounded-full px-4 py-1 text-xs font-bold font-body uppercase tracking-wide ${
              featured
                ? "border-primary-foreground/30 text-primary-foreground/80"
                : "border-foreground/15 text-foreground"
            }`}
          >
            {b}
          </span>
        ))}
      </div>

      {/* CTA Button */}
      <a
        href="#contact"
        className={`block text-center px-6 py-3 rounded-full text-sm font-bold font-body transition-all mb-6 ${
          featured
            ? "bg-accent text-accent-foreground hover:opacity-90 shadow-lg shadow-accent/20"
            : "bg-primary text-primary-foreground hover:opacity-90"
        }`}
      >
        Inquire Now
      </a>

      {/* Add-ons */}
      {pkg.addOns.length > 0 && (
        <div className={`mt-auto pt-6 border-t ${featured ? "border-primary-foreground/15" : "border-foreground/10"}`}>
          <p
            className={`font-bold text-xs uppercase tracking-wider mb-3 font-body ${
              featured ? "text-accent" : "text-accent"
            }`}
          >
            Add-ons
          </p>
          <ul
            className={`space-y-1.5 font-body text-sm ${
              featured ? "text-primary-foreground/70" : "text-muted-foreground"
            }`}
          >
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
