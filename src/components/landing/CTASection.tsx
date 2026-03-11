import coffeeCart from "@/assets/coffee-cart.png";

const CTASection = () => {
  return (
    <section id="contact" className="py-28 px-6 scroll-mt-24">
      <div className="container mx-auto max-w-6xl">
        <div className="bg-primary rounded-[2rem] p-10 md:p-16 lg:p-20 relative overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-primary-foreground/[0.04] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-primary-foreground/[0.04] translate-y-1/3 -translate-x-1/4" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-[1.05] mb-6">
                Let's bring dot
                <br />
                to your next event.
              </h2>
              <p className="text-primary-foreground/70 font-body text-base md:text-lg mb-10 max-w-lg leading-relaxed">
                Whether it's a corporate gathering, a birthday celebration, or your next office restock — we'll make the coffee unforgettable.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-3">
                <a
                  href="#"
                  className="bg-accent text-accent-foreground px-10 py-4 rounded-full text-sm font-bold font-body hover:opacity-90 transition-all shadow-lg shadow-accent/20"
                >
                  Inquire Now
                </a>
                <a
                  href="#"
                  className="border-2 border-primary-foreground/80 text-primary-foreground px-10 py-4 rounded-full text-sm font-semibold font-body hover:bg-primary-foreground hover:text-primary transition-colors"
                >
                  Franchise Login
                </a>
              </div>
            </div>

            {/* Cart illustration */}
            <div className="hidden lg:flex justify-center">
              <img
                src={coffeeCart}
                alt="dot coffee cart illustration"
                className="w-full max-w-xs drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
