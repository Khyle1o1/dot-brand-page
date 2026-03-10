import { fridgeMenu } from "@/data/landing";
import SectionHeader from "./SectionHeader";
import DrinkCard from "./DrinkCard";

const FridgeMenuSection = () => {
  return (
    <section className="py-24 px-6" id="fridge-menu">
      <div className="container mx-auto max-w-7xl">
        <SectionHeader
          title="dot fridge menu"
          badge="package c"
          subtitle="Stock your fridge with dot's canned cold brew and espresso — ready to serve, always on brand."
          id="fridge-menu-header"
        />

        <div className="grid md:grid-cols-2 gap-16">
          {/* Cold Brew */}
          <div>
            <h3 className="font-display text-3xl md:text-4xl font-bold text-accent mb-8 tracking-tight">canned cold brew</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {fridgeMenu.cannedColdBrew.map((item, i) => (
                <DrinkCard key={item} name={item} variant={i < 2 ? "blue" : "default"} />
              ))}
            </div>
          </div>

          {/* Espresso */}
          <div>
            <h3 className="font-display text-3xl md:text-4xl font-bold text-accent mb-8 tracking-tight">canned espresso</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {fridgeMenu.cannedEspresso.map((item, i) => (
                <DrinkCard key={item} name={item} variant={i < 2 ? "blue" : "default"} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FridgeMenuSection;
