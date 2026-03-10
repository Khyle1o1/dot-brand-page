import { eventPackages, landingNotes } from "@/data/landing";
import SectionHeader from "./SectionHeader";
import PackageCard from "./PackageCard";

const PackagesSection = () => {
  return (
    <section className="py-20 px-6" id="packages">
      <div className="container mx-auto">
        <SectionHeader title="dot events packages" />

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {eventPackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>

        <div className="space-y-2 font-body text-sm text-muted-foreground max-w-3xl">
          <p>• {landingNotes.packageFootnote1}</p>
          <p>• {landingNotes.packageFootnote2}</p>
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
