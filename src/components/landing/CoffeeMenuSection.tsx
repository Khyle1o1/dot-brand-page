import { coffeeCartMenu, landingNotes } from "@/data/landing";
import SectionHeader from "./SectionHeader";
import MenuGroup from "./MenuGroup";

const CoffeeMenuSection = () => {
  return (
    <section className="py-20 px-6" id="coffee-menu">
      <div className="container mx-auto">
        <SectionHeader title="dot coffee cart menu" badge="package a & b" id="coffee-menu-header" />

        <MenuGroup title="classics" items={coffeeCartMenu.classics} />
        <MenuGroup title="specials — coffee" items={coffeeCartMenu.specialsCoffee} />
        <MenuGroup title="specials — non coffee" items={coffeeCartMenu.specialsNonCoffee} />
        <MenuGroup title="for kids" items={coffeeCartMenu.kids} />

        <p className="font-body text-sm text-muted-foreground italic mt-4">
          {landingNotes.kidsNote}
        </p>
      </div>
    </section>
  );
};

export default CoffeeMenuSection;
