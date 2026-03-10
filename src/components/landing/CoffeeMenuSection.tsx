import { coffeeCartMenu, landingNotes } from "@/data/landing";
import SectionHeader from "./SectionHeader";
import MenuGroup from "./MenuGroup";

const CoffeeMenuSection = () => {
  return (
    <section className="py-24 px-6" id="coffee-menu">
      <div className="container mx-auto max-w-7xl">
        <SectionHeader
          title="dot coffee cart menu"
          badge="package a & b"
          subtitle="Our full barista-served lineup — from beloved classics to signature specials, every cup crafted on-site for your guests."
          id="coffee-menu-header"
        />

        <MenuGroup title="classics" items={coffeeCartMenu.classics} />
        <MenuGroup title="specials — coffee" items={coffeeCartMenu.specialsCoffee} />
        <MenuGroup title="specials — non coffee" items={coffeeCartMenu.specialsNonCoffee} />
        <MenuGroup title="for kids" items={coffeeCartMenu.kids} />

        <p className="font-body text-sm text-muted-foreground italic mt-6 border-t border-foreground/10 pt-6">
          {landingNotes.kidsNote}
        </p>
      </div>
    </section>
  );
};

export default CoffeeMenuSection;
