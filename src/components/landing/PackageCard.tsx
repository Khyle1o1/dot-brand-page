import { Check } from "lucide-react";
import type { EventPackage } from "@/data/landing";

interface PackageCardProps {
  pkg: EventPackage;
  featured?: boolean;
}

const PackageCard = ({ pkg, featured = false }: PackageCardProps) => {
  return (
    <div
      className={`relative rounded-[1.75rem] p-8 md:p-10 flex flex-col h-full transition-all duration-300 ${
        featured
          ? "bg-primary text-primary-foreground shadow-2xl shadow-primary/25 scale-[1.03] hover:shadow-3xl"
          : "bg-card border border-foreground/[0.06] shadow-lg shadow-foreground/[0.03] hover:shadow-xl hover:border-foreground/[0.1] hover:-translate-y-1"
      }`}
    >
      {/* Most Popular badge */}
      {featured && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-foreground text-primary px-6 py-2 rounded-full text-[10px] font-bold font-body uppercase tracking-[0.15em] shadow-lg shadow-foreground/10">
          Most Popular
        </span>
      )}

      {/* Label pill */}
      <span
        className={`self-start px-5 py-2 rounded-full text-[10px] font-bold font-body uppercase tracking-[0.15em] mb-8 ${
          featured
            ? "bg-primary-foreground/15 text-primary-foreground"
            : "bg-primary/10 text-primary"
        }`}
      >
        {pkg.label}
      </span>

      {/* Title & Price */}
      <h3
        className={`font-display text-2xl md:text-3xl font-bold mb-2 ${
          featured ? "text-primary-foreground" : "text-foreground"
        }`}
      >
        {pkg.title}
      </h3>
      <p className={`font-display text-4xl md:text-5xl font-bold mb-10 ${featured ? "text-primary-foreground" : "text-primary"}`}>
        {pkg.price}
      </p>

      {/* Details */}
      <ul className="space-y-3.5 mb-10">
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
              className={`text-sm font-body leading-relaxed ${
                featured ? "text-primary-foreground/90" : "text-foreground"
              }`}
            >
              {d}
            </span>
          </li>
        ))}
      </ul>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-10">
        {pkg.badges.map((b) => (
          <span
            key={b}
            className={`border rounded-full px-4 py-1.5 text-[10px] font-bold font-body uppercase tracking-[0.1em] ${
              featured
                ? "border-primary-foreground/25 text-primary-foreground/80"
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
        className={`block text-center px-6 py-3.5 rounded-full text-sm font-bold font-body transition-all mb-6 ${
          featured
            ? "bg-primary-foreground text-primary hover:opacity-90 shadow-lg shadow-foreground/10"
            : "bg-primary text-primary-foreground hover:opacity-90 shadow-md shadow-primary/15"
        }`}
      >
        Inquire Now
      </a>

      {/* Add-ons */}
      {pkg.addOns.length > 0 && (
        <div className={`mt-auto pt-6 border-t ${featured ? "border-primary-foreground/15" : "border-foreground/[0.08]"}`}>
          <p className={`font-bold text-[10px] uppercase tracking-[0.15em] mb-4 font-body ${featured ? "text-primary-foreground/70" : "text-primary"}`}>
            Add-ons
          </p>
          <ul
            className={`space-y-2 font-body text-sm ${
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
