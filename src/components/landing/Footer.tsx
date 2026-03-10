const Footer = () => {
  return (
    <footer className="border-t border-foreground/10 py-16 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="font-display text-3xl font-bold text-primary mb-1">dot<span className="text-accent">.</span></p>
            <p className="font-body text-sm text-muted-foreground">Good coffee, made for your events.</p>
          </div>
          <nav className="flex flex-wrap gap-8 font-body text-sm text-muted-foreground">
            <a href="#packages" className="hover:text-foreground transition-colors">Packages</a>
            <a href="#coffee-menu" className="hover:text-foreground transition-colors">Coffee Menu</a>
            <a href="#fridge-menu" className="hover:text-foreground transition-colors">Fridge Menu</a>
            <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
          </nav>
        </div>
        <div className="mt-12 pt-8 border-t border-foreground/5">
          <p className="text-xs text-muted-foreground font-body">
            © {new Date().getFullYear()} dot. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
