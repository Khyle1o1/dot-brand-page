import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Users, Package, ClipboardList, Settings, LogOut } from "lucide-react";

const cards = [
  { title: "Franchise Accounts", desc: "Manage franchise users and discounts", icon: Users },
  { title: "Item Catalog", desc: "Manage orderable items and pricing", icon: Package },
  { title: "Orders", desc: "View and manage all franchise orders", icon: ClipboardList },
  { title: "Settings", desc: "Discount rules and system settings", icon: Settings },
];

const AdminPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-foreground/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="font-display text-2xl font-bold text-primary">dot<span style={{ color: "hsl(14 89% 54%)" }}>.</span></Link>
          <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-bold uppercase tracking-wider">Admin</span>
        </div>
        <button onClick={() => { logout(); navigate("/"); }} className="text-sm text-muted-foreground hover:text-destructive flex items-center gap-2 font-medium">
          <LogOut size={16} /> Sign Out
        </button>
      </header>
      <main className="container mx-auto max-w-4xl py-12 px-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground text-sm mb-10">Welcome, {user?.email}</p>
        <div className="grid sm:grid-cols-2 gap-5">
          {cards.map((card) => (
            <div key={card.title} className="bg-card rounded-2xl border border-foreground/5 p-6 hover:shadow-md transition-shadow cursor-pointer">
              <card.icon className="text-primary mb-4" size={28} />
              <h3 className="font-bold text-foreground mb-1">{card.title}</h3>
              <p className="text-sm text-muted-foreground">{card.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground text-center mt-12">Admin features coming soon. This is a placeholder dashboard.</p>
      </main>
    </div>
  );
};

export default AdminPage;
