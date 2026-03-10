const Footer = () => {
  return (
    <footer className="border-t border-foreground/10 py-12 px-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="font-heading text-2xl text-primary">dot</p>
        <nav className="flex flex-wrap gap-6 font-body text-sm text-muted-foreground">
          <a href="#packages" className="hover:text-foreground transition-colors">Packages</a>
          <a href="#coffee-menu" className="hover:text-foreground transition-colors">Coffee Menu</a>
          <a href="#fridge-menu" className="hover:text-foreground transition-colors">Fridge Menu</a>
          <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
        </nav>
        <p className="text-sm text-muted-foreground font-body">
          © {new Date().getFullYear()} dot. all rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
