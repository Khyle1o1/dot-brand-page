import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import {
  ShoppingCart,
  Package,
  ClipboardList,
  LogOut,
  Menu,
  X,
  Home,
  UserCircle2,
} from "lucide-react";

const navItems = [
  { label: "Order Menu", href: "/order-menu", icon: Package },
  { label: "Cart", href: "/cart", icon: ShoppingCart },
  { label: "My Orders", href: "/orders", icon: ClipboardList },
];

const PortalLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* ── Top header ──────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-black/[0.07]">
        {/* Desktop layout: 3-column grid for true center alignment */}
        <div className="hidden md:grid grid-cols-[1fr_auto_1fr] items-center h-14 px-6 max-w-screen-2xl mx-auto">

          {/* Left: Logo + portal label */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-baseline gap-0 group">
              <span className="font-bold text-xl text-primary tracking-tight group-hover:opacity-80 transition-opacity">
                dot
              </span>
              <span className="font-bold text-xl text-accent group-hover:opacity-80 transition-opacity">
                .
              </span>
            </Link>
            <div className="h-4 w-px bg-black/[0.12]" />
            <span className="text-xs text-muted-foreground font-medium tracking-wide select-none">
              Franchise Portal
            </span>
          </div>

          {/* Center: Nav items */}
          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const active = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`relative flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    active
                      ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                      : "text-muted-foreground hover:bg-black/[0.05] hover:text-foreground"
                  }`}
                >
                  <item.icon size={15} className="flex-shrink-0" />
                  <span>{item.label}</span>
                  {item.href === "/cart" && itemCount > 0 && (
                    <span
                      className={`text-[10px] font-bold min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center leading-none ${
                        active
                          ? "bg-white/25 text-white"
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      {itemCount > 99 ? "99+" : itemCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: User info + logout */}
          <div className="flex items-center gap-3 justify-end">
            <div className="flex items-center gap-2.5 text-right">
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <UserCircle2 size={16} className="text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground leading-none max-w-[140px] truncate">
                  {user?.franchiseName || user?.email}
                </p>
                <p className="text-[10px] text-muted-foreground capitalize mt-0.5 leading-none">
                  {user?.role}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-muted-foreground border border-black/[0.1] hover:bg-destructive/[0.07] hover:text-destructive hover:border-destructive/20 transition-all"
            >
              <LogOut size={13} />
              <span>Sign out</span>
            </button>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="md:hidden flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="text-foreground p-1.5 rounded-lg hover:bg-black/[0.05] transition-colors"
            >
              <Menu size={20} />
            </button>
            <Link to="/" className="flex items-baseline gap-0">
              <span className="font-bold text-lg text-primary tracking-tight">dot</span>
              <span className="font-bold text-lg text-accent">.</span>
            </Link>
          </div>
          <Link
            to="/cart"
            className="relative p-1.5 rounded-lg text-foreground hover:bg-black/[0.05] transition-colors"
          >
            <ShoppingCart size={20} />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[9px] font-bold min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center leading-none">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
          </Link>
        </div>
      </header>

      {/* ── Mobile menu drawer ───────────────────────────────────────── */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          <div
            className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-black/[0.07]">
              <div className="flex items-baseline gap-0">
                <span className="font-bold text-lg text-primary tracking-tight">dot</span>
                <span className="font-bold text-lg text-accent">.</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-muted-foreground p-1 rounded-lg hover:bg-black/[0.05]"
              >
                <X size={19} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 px-4 py-4 space-y-1">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-black/[0.05] hover:text-foreground transition-colors"
              >
                <Home size={17} /> Back to Website
              </Link>
              {navItems.map((item) => {
                const active = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      active
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-black/[0.05] hover:text-foreground"
                    }`}
                  >
                    <item.icon size={17} />
                    <span className="flex-1">{item.label}</span>
                    {item.href === "/cart" && itemCount > 0 && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          active
                            ? "bg-white/25 text-white"
                            : "bg-primary text-primary-foreground"
                        }`}
                      >
                        {itemCount}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* User section */}
            <div className="px-4 pb-5 border-t border-black/[0.07]">
              <div className="flex items-center gap-3 px-3 py-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <UserCircle2 size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    {user?.franchiseName || user?.email}
                  </p>
                  <p className="text-[11px] text-muted-foreground capitalize mt-0.5">
                    {user?.role} account
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:bg-destructive/[0.07] hover:text-destructive transition-colors"
              >
                <LogOut size={16} /> Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Page content ─────────────────────────────────────────────── */}
      <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-screen-2xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
};

export default PortalLayout;
