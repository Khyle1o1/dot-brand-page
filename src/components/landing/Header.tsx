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
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-foreground/10">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <a href="#" className="font-heading text-3xl text-primary tracking-tight">
          dot
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors font-body"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-sm font-semibold font-body hover:opacity-90 transition-opacity"
          >
            Franchise Login
          </a>
        </nav>

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
        <nav className="md:hidden bg-background border-t border-foreground/10 px-6 pb-6 pt-2 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-base font-medium text-foreground/70 hover:text-foreground transition-colors font-body"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-semibold font-body text-center hover:opacity-90 transition-opacity"
          >
            Franchise Login
          </a>
        </nav>
      )}
    </header>
  );
};

export default Header;
