import { coffeeCartMenu, landingNotes } from "@/data/landing";
import SectionHeader from "./SectionHeader";
import MenuGroup from "./MenuGroup";

const CoffeeMenuSection = () => {
  return (
    <section className="relative py-32 px-6 bg-section-coffee overflow-hidden" id="coffee-menu">
      {/* Subtle decorative accent */}
      <div className="absolute top-20 right-0 w-80 h-80 rounded-full bg-primary/[0.03] blur-3xl" />
      <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full bg-primary/[0.03] blur-3xl" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <SectionHeader
          title="dot coffee cart menu"
          badge="package a & b"
          subtitle="Our full barista-served lineup — from beloved classics to signature specials, every cup crafted on-site for your guests."
          id="coffee-menu-header"
        />

        {/* Legend */}
        <div className="flex items-center gap-5 mb-14">
          <div className="flex items-center gap-2">
            <span className="bg-primary text-primary-foreground text-[10px] px-4 py-1.5 rounded-full font-bold font-body uppercase tracking-[0.12em]">
              best seller
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-secondary text-secondary-foreground text-[10px] px-4 py-1.5 rounded-full font-bold font-body uppercase tracking-[0.12em]">
              dairy free
            </span>
          </div>
        </div>

        <MenuGroup title="classics" items={coffeeCartMenu.classics} />
        <MenuGroup title="specials — coffee" items={coffeeCartMenu.specialsCoffee} />
        <MenuGroup title="specials — non coffee" items={coffeeCartMenu.specialsNonCoffee} />
        <MenuGroup title="for kids" items={coffeeCartMenu.kids} />

        <p className="font-body text-sm text-muted-foreground italic mt-4 border-t border-foreground/[0.08] pt-8">
          {landingNotes.kidsNote}
        </p>
      </div>
    </section>
  );
};

export default CoffeeMenuSection;
