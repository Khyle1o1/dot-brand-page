import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, Package, ClipboardList, LogOut, Menu, X, Home } from "lucide-react";

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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar — desktop */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-foreground/5 bg-card">
        <div className="p-6 border-b border-foreground/5">
          <Link to="/" className="font-display text-2xl font-bold text-primary tracking-tight">
            dot<span className="text-sidebar-accent">.</span>
          </Link>
          <p className="text-xs text-muted-foreground mt-1">Franchise Portal</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const active = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon size={18} />
                {item.label}
                {item.href === "/cart" && itemCount > 0 && (
                  <span className="ml-auto bg-sidebar-accent text-sidebar-accent-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                    {itemCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-foreground/5">
          <div className="text-xs text-muted-foreground mb-3 px-4">
            <p className="font-semibold text-foreground">{user?.franchiseName || user?.email}</p>
            <p className="capitalize">{user?.role}</p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors w-full">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile header + sidebar */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden sticky top-0 z-40 bg-card/95 backdrop-blur border-b border-foreground/5 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="text-foreground"><Menu size={22} /></button>
            <Link to="/" className="font-display text-xl font-bold text-primary">dot<span className="text-sidebar-accent">.</span></Link>
          </div>
          <Link to="/cart" className="relative text-foreground">
            <ShoppingCart size={22} />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-sidebar-accent text-sidebar-accent-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
        </header>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden" onClick={() => setSidebarOpen(false)}>
            <div className="absolute inset-0 bg-foreground/40" />
            <div className="absolute left-0 top-0 bottom-0 w-72 bg-card shadow-2xl flex flex-col" onClick={(e) => e.stopPropagation()}>
              <div className="p-5 flex items-center justify-between border-b border-foreground/5">
                <span className="font-display text-xl font-bold text-primary">dot<span className="text-sidebar-accent">.</span></span>
                <button onClick={() => setSidebarOpen(false)}><X size={20} /></button>
              </div>
              <nav className="flex-1 p-4 space-y-1">
                <Link to="/" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
                  <Home size={18} /> Back to Website
                </Link>
                {navItems.map((item) => {
                  const active = location.pathname === item.href;
                  return (
                    <Link key={item.href} to={item.href} onClick={() => setSidebarOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
                      <item.icon size={18} />{item.label}
                    </Link>
                  );
                })}
              </nav>
              <div className="p-4 border-t border-foreground/5">
                <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-destructive w-full">
                  <LogOut size={18} /> Sign Out
                </button>
              </div>
            </div>
          </div>
        )}

        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
};

export default PortalLayout;
