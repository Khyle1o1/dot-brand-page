import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, LogIn } from "lucide-react";
import { useAuth, UserRole } from "@/contexts/AuthContext";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

const LoginModal = ({ open, onClose }: LoginModalProps) => {
  const [role, setRole] = useState<UserRole>("franchise");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const result = login(email, password, role);
      setLoading(false);
      if (result.success) {
        onClose();
        navigate(role === "admin" ? "/admin" : "/order-menu");
      } else {
        setError(result.error || "Login failed");
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" />
      <div
        className="relative z-10 bg-card rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8 animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
          <X size={20} />
        </button>

        <div className="text-center mb-8">
          <h2 className="font-display text-3xl font-bold text-foreground">
            dot<span className="text-primary">.</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-2">Sign in to your account</p>
        </div>

        {/* Role Toggle */}
        <div className="flex bg-muted rounded-xl p-1 mb-6">
          {(["franchise", "admin"] as UserRole[]).map((r) => (
            <button
              key={r}
              onClick={() => { setRole(r); setError(""); }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                role === r ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {r === "franchise" ? "Franchise User" : "Admin"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={role === "admin" ? "admin@dot.com" : "franchise@dot.com"}
              className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-foreground/10 bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-destructive bg-destructive/10 px-4 py-2.5 rounded-xl">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl text-sm font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 disabled:opacity-60"
          >
            <LogIn size={16} />
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-6">
          Demo: {role === "admin" ? "admin@dot.com / admin123" : "franchise@dot.com / franchise123"}
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
