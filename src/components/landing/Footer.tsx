const Footer = () => {
  return (
    <footer className="border-t border-foreground/10 py-16 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <p className="font-display text-3xl font-bold text-primary mb-2">
              dot<span className="text-accent">.</span>
            </p>
            <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-xs">
              Good coffee, made for your events. Coffee carts, canned favorites, and café essentials by dot.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="font-body text-xs font-bold uppercase tracking-widest text-foreground mb-4">Navigate</p>
            <nav className="flex flex-col gap-3 font-body text-sm text-muted-foreground">
              <a href="#packages" className="hover:text-foreground transition-colors">Packages</a>
              <a href="#coffee-menu" className="hover:text-foreground transition-colors">Coffee Menu</a>
              <a href="#fridge-menu" className="hover:text-foreground transition-colors">Fridge Menu</a>
              <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
            </nav>
          </div>

          {/* Contact / Social */}
          <div>
            <p className="font-body text-xs font-bold uppercase tracking-widest text-foreground mb-4">Get in touch</p>
            <div className="flex flex-col gap-3 font-body text-sm text-muted-foreground">
              <a href="https://instagram.com/drink.dotcoffee" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                @drink.dotcoffee
              </a>
              <a href="mailto:hello@dotcoffee.ph" className="hover:text-foreground transition-colors">
                hello@dotcoffee.ph
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-foreground/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-body">
            © {new Date().getFullYear()} dot. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/60 font-body">
            today is a good day for good coffee.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
