import { fridgeMenu } from "@/data/landing";
import SectionHeader from "./SectionHeader";
import DrinkCard from "./DrinkCard";

const FridgeMenuSection = () => {
  return (
    <section className="py-20 px-6" id="fridge-menu">
      <div className="container mx-auto">
        <SectionHeader title="dot fridge menu" badge="package c" id="fridge-menu-header" />

        <div className="grid md:grid-cols-2 gap-12">
          {/* Cold Brew */}
          <div>
            <h3 className="font-heading text-3xl md:text-4xl text-accent mb-6">canned cold brew</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {fridgeMenu.cannedColdBrew.map((item, i) => (
                <DrinkCard key={item} name={item} variant={i < 2 ? "blue" : "default"} />
              ))}
            </div>
          </div>

          {/* Espresso */}
          <div>
            <h3 className="font-heading text-3xl md:text-4xl text-accent mb-6">canned espresso</h3>
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
