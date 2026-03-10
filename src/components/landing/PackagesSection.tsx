import { eventPackages, landingNotes } from "@/data/landing";
import SectionHeader from "./SectionHeader";
import PackageCard from "./PackageCard";

const PackagesSection = () => {
  return (
    <section className="py-24 px-6" id="packages">
      <div className="container mx-auto max-w-7xl">
        <SectionHeader
          title="dot events packages"
          subtitle="From intimate gatherings to large-scale events — choose the package that fits your occasion. Every setup comes with the dot experience."
        />

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {eventPackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>

        <div className="space-y-2 font-body text-sm text-muted-foreground max-w-3xl border-t border-foreground/10 pt-8">
          <p>• {landingNotes.packageFootnote1}</p>
          <p>• {landingNotes.packageFootnote2}</p>
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
