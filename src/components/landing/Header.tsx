import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Packages", href: "#packages" },
  { label: "Coffee Menu", href: "#coffee-menu" },
  { label: "Fridge Menu", href: "#fridge-menu" },
  { label: "Contact", href: "#contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-foreground/5">
      <div className="container mx-auto flex items-center justify-between py-5 px-6">
        <a href="#" className="font-display text-3xl font-bold text-primary tracking-tight">
          dot<span className="text-accent">.</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors font-body tracking-wide uppercase"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden md:inline-flex bg-primary text-primary-foreground px-7 py-2.5 rounded-full text-sm font-bold font-body hover:opacity-90 transition-opacity tracking-wide"
        >
          Get Started
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="md:hidden bg-background border-t border-foreground/5 px-6 pb-6 pt-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors font-body uppercase tracking-wide"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-bold font-body text-center hover:opacity-90 transition-opacity mt-2"
          >
            Get Started
          </a>
        </nav>
      )}
    </header>
  );
};

export default Header;
