import coffeeCart from "@/assets/coffee-cart.png";

const CTASection = () => {
  return (
    <section id="contact" className="py-32 px-6 bg-background scroll-mt-24">
      <div className="container mx-auto max-w-6xl">
        <div className="bg-primary rounded-[2.5rem] p-12 md:p-16 lg:p-24 relative overflow-hidden">
          {/* Decorative abstract shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary-foreground/[0.04] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-primary-foreground/[0.04] translate-y-1/3 -translate-x-1/4" />
          <div className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full bg-accent/[0.08] blur-2xl" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-[3.75rem] font-bold text-primary-foreground leading-[1.02] mb-8">
                Let's bring dot
                <br />
                to your next event.
              </h2>
              <p className="text-primary-foreground/70 font-body text-base md:text-lg mb-12 max-w-lg leading-relaxed">
                Whether it's a corporate gathering, a birthday celebration, or your next office restock — we'll make the coffee unforgettable.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <a
                  href="#"
                  className="bg-accent text-accent-foreground px-12 py-4.5 rounded-full text-sm font-bold font-body hover:opacity-90 transition-all shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5"
                >
                  Inquire Now
                </a>
                <a
                  href="#"
                  className="border-2 border-primary-foreground/70 text-primary-foreground px-12 py-4.5 rounded-full text-sm font-semibold font-body hover:bg-primary-foreground hover:text-primary transition-all"
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
