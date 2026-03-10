import { motion } from "framer-motion";
import { Coffee, Truck, Package } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-28 lg:py-36 px-6">
      {/* Background accent shape */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 rounded-bl-[120px] -z-10 hidden lg:block" />

      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Copy */}
          <div className="max-w-xl">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block bg-primary text-primary-foreground px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest font-body mb-8"
            >
              Coffee for every occasion
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-foreground leading-[0.95] tracking-tight mb-8"
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
              className="text-lg md:text-xl text-muted-foreground font-body leading-relaxed mb-10 max-w-md"
            >
              Coffee carts, canned favorites, and café essentials — crafted by dot for celebrations, offices, and everyday moments.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              <a
                href="#contact"
                className="bg-accent text-accent-foreground px-8 py-4 rounded-full text-base font-bold font-body hover:opacity-90 transition-opacity"
              >
                Inquire Now
              </a>
              <a
                href="#contact"
                className="border-2 border-foreground text-foreground px-8 py-4 rounded-full text-base font-semibold font-body hover:bg-foreground hover:text-background transition-colors"
              >
                Franchise Login
              </a>
            </motion.div>
          </div>

          {/* Right — Visual block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main brand block */}
              <div className="bg-primary rounded-3xl p-12 aspect-[4/5] flex flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-8 right-8 w-48 h-48 rounded-full border-[3px] border-primary-foreground/40" />
                  <div className="absolute bottom-12 left-8 w-32 h-32 rounded-full border-[3px] border-primary-foreground/40" />
                </div>

                <div className="relative z-10">
                  <p className="font-display text-primary-foreground/60 text-lg font-semibold uppercase tracking-widest mb-2">Since est.</p>
                  <p className="font-display text-primary-foreground text-7xl font-bold">dot</p>
                </div>

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-3 text-primary-foreground/80">
                    <Coffee className="w-5 h-5" />
                    <span className="font-body text-sm">Coffee Carts</span>
                  </div>
                  <div className="flex items-center gap-3 text-primary-foreground/80">
                    <Package className="w-5 h-5" />
                    <span className="font-body text-sm">Canned Cold Brew & Espresso</span>
                  </div>
                  <div className="flex items-center gap-3 text-primary-foreground/80">
                    <Truck className="w-5 h-5" />
                    <span className="font-body text-sm">Event & Office Delivery</span>
                  </div>
                </div>
              </div>

              {/* Floating accent card */}
              <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground rounded-2xl px-6 py-4 shadow-xl">
                <p className="font-display text-2xl font-bold">100+</p>
                <p className="font-body text-xs opacity-80">events served</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
