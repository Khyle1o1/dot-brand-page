import { fridgeMenu } from "@/data/landing";
import SectionHeader from "./SectionHeader";
import DrinkCard from "./DrinkCard";
import dotFridge from "@/assets/dot-fridge.png";

const FridgeMenuSection = () => {
  return (
    <section className="py-28 px-6" id="fridge-menu">
      <div className="container mx-auto max-w-7xl">
        <SectionHeader
          title="dot fridge menu"
          badge="package c"
          subtitle="Stock your fridge with dot's canned cold brew and espresso — ready to serve, always on brand."
          id="fridge-menu-header"
        />

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Cold Brew */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h3 className="font-display text-3xl md:text-4xl font-bold text-accent tracking-tight">
                canned cold brew
              </h3>
              <div className="flex-1 h-px bg-foreground/8" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {fridgeMenu.cannedColdBrew.map((item) => (
                <DrinkCard key={item} name={item} />
              ))}
            </div>
          </div>

          {/* Espresso */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h3 className="font-display text-3xl md:text-4xl font-bold text-accent tracking-tight">
                canned espresso
              </h3>
              <div className="flex-1 h-px bg-foreground/8" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {fridgeMenu.cannedEspresso.map((item, i) => (
                <DrinkCard key={item} name={item} variant={i < 3 ? "blue" : "default"} />
              ))}
            </div>
          </div>
        </div>

        {/* Fridge showcase */}
        <div className="mt-20 flex justify-center">
          <div className="bg-card rounded-3xl p-8 md:p-12 border border-foreground/5 max-w-sm text-center">
            <img
              src={dotFridge}
              alt="The dot fridge — a mini display fridge filled with dot canned coffee"
              className="w-full rounded-2xl mb-6"
            />
            <p className="font-display text-lg font-bold text-foreground mb-1">The dot Fridge</p>
            <p className="font-body text-sm text-muted-foreground">
              A fully stocked branded display fridge for your event or office.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FridgeMenuSection;
