const CTASection = () => {
  return (
    <section id="contact" className="py-20 px-6 scroll-mt-24">
      <div className="container mx-auto max-w-3xl">
        <div className="bg-card rounded-3xl p-10 md:p-16 text-center border border-foreground/5">
          <h2 className="font-heading text-3xl md:text-5xl text-foreground mb-4">
            ready to order for your <span className="text-accent">branch</span> or{" "}
            <span className="text-primary">event</span>?
          </h2>
          <p className="text-muted-foreground font-body text-base md:text-lg mb-10 max-w-xl mx-auto">
            franchise users can log in to access the protected ordering portal.
            for partnership, package, and event inquiries, contact the dot team.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="bg-primary text-primary-foreground px-8 py-3.5 rounded-full text-base font-semibold font-body hover:opacity-90 transition-opacity"
            >
              Franchise Login
            </a>
            <a
              href="#"
              className="bg-accent text-accent-foreground px-8 py-3.5 rounded-full text-base font-semibold font-body hover:opacity-90 transition-opacity"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
