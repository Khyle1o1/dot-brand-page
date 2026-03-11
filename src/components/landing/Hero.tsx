import { motion } from "framer-motion";
import { Coffee, Truck, Package, Calendar } from "lucide-react";
import heroCups from "@/assets/hero-cups.png";

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 md:pt-20 md:pb-32 lg:pt-24 lg:pb-40 px-6 bg-section-hero">
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 w-[55%] h-[120%] bg-primary/[0.03] rounded-bl-[200px] -z-0 hidden lg:block" />
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-accent/[0.04] -z-0 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-primary/[0.04] -z-0 blur-3xl" />
      <div className="absolute top-1/2 right-1/4 w-40 h-40 rounded-full bg-accent/[0.06] -z-0 blur-2xl hidden md:block" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Copy */}
          <div className="max-w-xl">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block bg-primary/10 text-primary px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] font-body mb-8"
            >
              Events · Carts · Cans
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] font-bold text-foreground leading-[0.95] tracking-tight mb-8"
            >
              good coffee,
              <br />
              <span className="text-primary">made for</span>
              <br />
              your events.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-base md:text-lg text-muted-foreground font-body leading-relaxed mb-10 max-w-md"
            >
              Coffee carts, canned favorites, and café essentials — crafted by dot for celebrations, offices, and everyday moments.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-col sm:flex-row items-start gap-4 mb-14"
            >
              <a
                href="#contact"
                className="bg-accent text-accent-foreground px-10 py-4 rounded-full text-sm font-bold font-body hover:opacity-90 transition-all shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5"
              >
                Inquire Now
              </a>
              <a
                href="#contact"
                className="border-2 border-foreground/70 text-foreground px-10 py-4 rounded-full text-sm font-semibold font-body hover:bg-foreground hover:text-background transition-all"
              >
                Franchise Login
              </a>
            </motion.div>

            {/* Trust points */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-2 gap-5"
            >
              {[
                { icon: Coffee, text: "Mobile coffee cart" },
                { icon: Package, text: "Custom event packages" },
                { icon: Truck, text: "Canned cold brew & espresso" },
                { icon: Calendar, text: "Corporate, school & private" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-body text-xs text-muted-foreground leading-tight">{text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Product showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="relative"
          >
            <div className="relative">
              {/* Layered background shapes behind card */}
              <div className="absolute -inset-6 bg-primary/[0.06] rounded-[2.5rem] -rotate-2 hidden lg:block" />
              <div className="absolute -inset-3 bg-accent/[0.04] rounded-[2.5rem] rotate-1 hidden lg:block" />

              {/* Main image card */}
              <div className="relative bg-card rounded-3xl p-6 md:p-8 shadow-2xl shadow-foreground/[0.06] border border-foreground/[0.04]">
                <img
                  src={heroCups}
                  alt="Four dot branded iced coffee cups on a tray with coffee beans and caramel"
                  className="w-full rounded-2xl"
                />
                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <p className="font-display text-xl font-bold text-foreground">Signature Collection</p>
                    <p className="font-body text-sm text-muted-foreground">Barista-crafted for your event</p>
                  </div>
                  <span className="bg-accent text-accent-foreground px-5 py-2 rounded-full text-[10px] font-bold font-body uppercase tracking-[0.15em]">
                    Popular
                  </span>
                </div>
              </div>

              {/* Floating stat card */}
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground rounded-2xl px-6 py-5 shadow-xl shadow-primary/20">
                <p className="font-display text-4xl font-bold">100+</p>
                <p className="font-body text-xs opacity-80">events served</p>
              </div>

              {/* Floating accent ring */}
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-accent/15 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-accent/30" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
