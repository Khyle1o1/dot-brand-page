import { eventPackages, landingNotes } from "@/data/landing";
import SectionHeader from "./SectionHeader";
import PackageCard from "./PackageCard";

const PackagesSection = () => {
  return (
    <section className="relative py-32 px-6 bg-section-packages overflow-hidden" id="packages">
      {/* Decorative shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-primary/[0.03] -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-accent/[0.03] translate-x-1/3 translate-y-1/3 blur-3xl" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <SectionHeader
          title="dot events packages"
          subtitle="From intimate gatherings to large-scale events — choose the package that fits your occasion. Every setup comes with the dot experience."
        />

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16 items-stretch">
          {eventPackages.map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} featured={i === 1} />
          ))}
        </div>

        <div className="space-y-2.5 font-body text-sm text-muted-foreground max-w-3xl border-t border-foreground/[0.08] pt-8">
          <p>• {landingNotes.packageFootnote1}</p>
          <p>• {landingNotes.packageFootnote2}</p>
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
