import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import LoginModal from "@/components/LoginModal";

const navLinks = [
  { label: "Packages", href: "#packages" },
  { label: "Coffee Menu", href: "#coffee-menu" },
  { label: "Fridge Menu", href: "#fridge-menu" },
  { label: "Contact", href: "#contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-foreground/5">
        <div className="container mx-auto flex items-center justify-between py-5 px-6">
          <a href="#" className="font-display text-3xl font-bold text-primary tracking-tight">
            dot<span className="text-sidebar-accent">.</span>
          </a>

          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors font-body tracking-wide uppercase">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => navigate(user?.role === "admin" ? "/admin" : "/order-menu")}
                  className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-sm font-bold hover:opacity-90 transition-opacity tracking-wide"
                >
                  {user?.role === "admin" ? "Admin Panel" : "Order Portal"}
                </button>
                <button onClick={logout} className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <a href="#contact" className="bg-primary text-primary-foreground px-7 py-2.5 rounded-full text-sm font-bold hover:opacity-90 transition-opacity tracking-wide">
                  Get Started
                </a>
                <button onClick={() => setLoginOpen(true)} className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  <LogIn size={15} /> Login
                </button>
              </>
            )}
          </div>

          <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileOpen && (
          <nav className="md:hidden bg-background border-t border-foreground/5 px-6 pb-6 pt-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors font-body uppercase tracking-wide">
                {link.label}
              </a>
            ))}
            {isAuthenticated ? (
              <>
                <button onClick={() => { setMobileOpen(false); navigate(user?.role === "admin" ? "/admin" : "/order-menu"); }} className="bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-bold text-center hover:opacity-90 transition-opacity mt-2">
                  {user?.role === "admin" ? "Admin Panel" : "Order Portal"}
                </button>
                <button onClick={() => { setMobileOpen(false); logout(); }} className="text-sm text-muted-foreground hover:text-foreground text-center">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <a href="#contact" onClick={() => setMobileOpen(false)} className="bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-bold text-center hover:opacity-90 transition-opacity mt-2">
                  Get Started
                </a>
                <button onClick={() => { setMobileOpen(false); setLoginOpen(true); }} className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center justify-center gap-1.5">
                  <LogIn size={15} /> Franchise Login
                </button>
              </>
            )}
          </nav>
        )}
      </header>
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
};

export default Header;
