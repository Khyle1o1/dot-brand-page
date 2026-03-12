import { useState } from "react";
import { motion } from "framer-motion";
import heroCups from "@/assets/hero-cups.png";
import LoginModal from "@/components/LoginModal";

const Hero = () => {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden pt-10 pb-20 md:pt-14 md:pb-28 lg:pt-16 lg:pb-32 px-6 bg-section-hero">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left — Copy */}
            <div className="max-w-xl">
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-block bg-primary/10 text-primary px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] mb-8"
              >
                Events · Carts · Cans
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] font-bold text-foreground leading-[0.95] tracking-tight mb-8"
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
                className="text-base md:text-lg text-muted-foreground leading-relaxed mb-10 max-w-md"
              >
                Coffee carts, canned favorites, and café essentials — crafted by dot for celebrations, offices, and everyday moments.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="flex flex-col sm:flex-row items-start gap-4"
              >
                <a
                  href="#contact"
                  className="bg-primary text-primary-foreground px-10 py-4 rounded-full text-sm font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
                >
                  Inquire Now
                </a>
                <button
                  onClick={() => setLoginOpen(true)}
                  className="border-2 border-foreground/70 text-foreground px-10 py-4 rounded-full text-sm font-semibold hover:bg-foreground hover:text-background transition-all"
                >
                  Franchise Login
                </button>
              </motion.div>
            </div>

            {/* Right — Product image */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="flex items-center justify-center lg:justify-end"
            >
              <img
                src={heroCups}
                alt="Four dot branded iced coffee cups on a tray with coffee beans and caramel"
                className="w-full scale-110 lg:scale-125 object-contain drop-shadow-2xl"
              />
            </motion.div>

          </div>
        </div>
      </section>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
};

export default Hero;
