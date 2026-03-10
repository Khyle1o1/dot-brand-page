const CTASection = () => {
  return (
    <section id="contact" className="py-24 px-6 scroll-mt-24">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-primary rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary-foreground/5 -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-primary-foreground/5 translate-y-1/3 -translate-x-1/4" />

          <div className="relative z-10">
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              Let's bring dot
              <br />
              to your next event.
            </h2>
            <p className="text-primary-foreground/70 font-body text-base md:text-lg mb-12 max-w-xl mx-auto leading-relaxed">
              Whether it's a corporate gathering, a birthday celebration, or your next office restock — we'll make the coffee unforgettable.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#"
                className="bg-accent text-accent-foreground px-10 py-4 rounded-full text-base font-bold font-body hover:opacity-90 transition-opacity"
              >
                Inquire Now
              </a>
              <a
                href="#"
                className="border-2 border-primary-foreground text-primary-foreground px-10 py-4 rounded-full text-base font-semibold font-body hover:bg-primary-foreground hover:text-primary transition-colors"
              >
                Franchise Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
