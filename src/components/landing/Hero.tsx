import { motion } from "framer-motion";
import { Coffee, Truck, Package, Calendar } from "lucide-react";
import heroCups from "@/assets/hero-cups.png";

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28 lg:pt-20 lg:pb-36 px-6">
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 w-[60%] h-full bg-primary/[0.04] rounded-bl-[160px] -z-10 hidden lg:block" />
      <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-accent/[0.06] -z-10 blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full bg-primary/[0.05] -z-10 blur-3xl" />

      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Copy */}
          <div className="max-w-xl">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block bg-primary/10 text-primary px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest font-body mb-6"
            >
              Events · Carts · Cans
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-[3.2rem] md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.02] tracking-tight mb-6"
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
              className="text-base md:text-lg text-muted-foreground font-body leading-relaxed mb-8 max-w-md"
            >
              Coffee carts, canned favorites, and café essentials — crafted by dot for celebrations, offices, and everyday moments.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-col sm:flex-row items-start gap-3 mb-10"
            >
              <a
                href="#contact"
                className="bg-accent text-accent-foreground px-8 py-3.5 rounded-full text-sm font-bold font-body hover:opacity-90 transition-all shadow-lg shadow-accent/20"
              >
                Inquire Now
              </a>
              <a
                href="#contact"
                className="border-2 border-foreground/80 text-foreground px-8 py-3.5 rounded-full text-sm font-semibold font-body hover:bg-foreground hover:text-background transition-colors"
              >
                Franchise Login
              </a>
            </motion.div>

            {/* Trust points */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: Coffee, text: "Mobile coffee cart" },
                { icon: Package, text: "Custom event packages" },
                { icon: Truck, text: "Canned cold brew & espresso" },
                { icon: Calendar, text: "Corporate, school & private" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-body text-xs text-muted-foreground leading-tight">{text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Product showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative">
              {/* Main image card */}
              <div className="bg-card rounded-3xl p-6 md:p-8 shadow-xl shadow-foreground/5 border border-foreground/5">
                <img
                  src={heroCups}
                  alt="Four dot branded iced coffee cups on a tray with coffee beans and caramel"
                  className="w-full rounded-2xl"
                />
                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <p className="font-display text-lg font-bold text-foreground">Signature Collection</p>
                    <p className="font-body text-sm text-muted-foreground">Barista-crafted for your event</p>
                  </div>
                  <span className="bg-accent text-accent-foreground px-4 py-1.5 rounded-full text-xs font-bold font-body uppercase tracking-wider">
                    Popular
                  </span>
                </div>
              </div>

              {/* Floating stat card */}
              <div className="absolute -bottom-5 -left-5 bg-primary text-primary-foreground rounded-2xl px-5 py-4 shadow-xl">
                <p className="font-display text-3xl font-bold">100+</p>
                <p className="font-body text-xs opacity-80">events served</p>
              </div>

              {/* Floating accent dot */}
              <div className="absolute -top-3 -right-3 w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-accent/40" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
