import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="py-24 md:py-36 px-6">
      <div className="container mx-auto max-w-4xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-heading text-5xl md:text-7xl text-foreground leading-tight mb-6"
        >
          dot <span className="text-accent">franchise</span> ordering
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-body"
        >
          coffee, cans, and café essentials for dot franchise partners.
          browse our event packages and full menu offerings below.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="bg-primary text-primary-foreground px-8 py-3.5 rounded-full text-base font-semibold font-body hover:opacity-90 transition-opacity"
          >
            Franchise Login
          </a>
          <a
            href="#contact"
            className="border-2 border-foreground text-foreground px-8 py-3.5 rounded-full text-base font-semibold font-body hover:bg-foreground hover:text-background transition-colors"
          >
            Inquire Now
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
