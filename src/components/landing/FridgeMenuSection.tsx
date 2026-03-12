import { fridgeMenu } from "@/data/landing";
import SectionHeader from "./SectionHeader";
import DrinkCard from "./DrinkCard";
import dotFridge from "@/assets/dot-fridge.png";

const FridgeMenuSection = () => {
  return (
    <section className="relative py-32 px-6 bg-section-fridge overflow-hidden" id="fridge-menu">
      {/* Decorative cool shapes */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/[0.03] blur-3xl" />
      <div className="absolute bottom-0 right-10 w-72 h-72 rounded-full bg-secondary/[0.05] blur-3xl" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <SectionHeader
          title="dot fridge menu"
          badge="package c"
          subtitle="Stock your fridge with dot's canned cold brew and espresso — ready to serve, always on brand."
          id="fridge-menu-header"
        />

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Cold Brew */}
          <div>
            <div className="flex items-center gap-4 mb-10">
              <h3 className="font-display text-3xl md:text-4xl font-bold text-accent tracking-tight">
                canned cold brew
              </h3>
              <div className="flex-1 h-px bg-foreground/[0.06]" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {fridgeMenu.cannedColdBrew.map((item) => (
                <DrinkCard key={item} name={item} />
              ))}
            </div>
          </div>

          {/* Espresso */}
          <div>
            <div className="flex items-center gap-4 mb-10">
              <h3 className="font-display text-3xl md:text-4xl font-bold text-accent tracking-tight">
                canned espresso
              </h3>
              <div className="flex-1 h-px bg-foreground/[0.06]" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {fridgeMenu.cannedEspresso.map((item, i) => (
                <DrinkCard key={item} name={item} variant={i < 3 ? "blue" : "default"} />
              ))}
            </div>
          </div>
        </div>

        {/* Fridge showcase */}
        
      </div>
    </section>
  );
};

export default FridgeMenuSection;
