import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { catalogItems, categories } from "@/data/catalog";
import {
  Users,
  Package,
  ClipboardList,
  Settings,
  LogOut,
  LayoutDashboard,
  ChevronRight,
  ShoppingBag,
  Percent,
  UserCircle2,
  Menu,
  X,
  Activity,
  CheckCircle2,
  AlertCircle,
  Boxes,
  ArrowUpRight,
  Building2,
  BadgeCheck,
  Layers,
  Home,
  TrendingUp,
  Clock,
  CircleCheck,
  CircleX,
  Loader,
  SendHorizonal,
  BarChart3,
  Wallet,
  CalendarDays,
  Store,
} from "lucide-react";
import { useState, useMemo } from "react";

// ── Mock analytics data ─────────────────────────────────────────────────────
const MOCK = {
  franchises: {
    total: 24,
    active: 22,
    suspended: 2,
    discounted: 6,
    newThisMonth: 2,
  },
  orders: {
    pending: 8,
    submitted: 5,
    confirmed: 6,
    processing: 4,
    completed: 21,
    cancelled: 2,
    thisWeek: 11,
    thisMonth: 47,
    avgOrderValue: 8450,
    activeBranchesThisWeek: 7,
  },
};

const ORDER_STATUSES = [
  { label: "Pending",    value: MOCK.orders.pending,    color: "bg-amber-400",   text: "text-amber-700",  bg: "bg-amber-50" },
  { label: "Submitted",  value: MOCK.orders.submitted,  color: "bg-blue-400",    text: "text-blue-700",   bg: "bg-blue-50" },
  { label: "Confirmed",  value: MOCK.orders.confirmed,  color: "bg-primary",     text: "text-primary",    bg: "bg-primary/10" },
  { label: "Processing", value: MOCK.orders.processing, color: "bg-violet-400",  text: "text-violet-700", bg: "bg-violet-50" },
  { label: "Completed",  value: MOCK.orders.completed,  color: "bg-emerald-500", text: "text-emerald-700",bg: "bg-emerald-50" },
  { label: "Cancelled",  value: MOCK.orders.cancelled,  color: "bg-gray-300",    text: "text-gray-500",   bg: "bg-gray-50" },
];

const MOCK_RECENT_ACTIVITY = [
  { id: 1, type: "order",   text: "New order DOT-0047 submitted",        detail: "Metro Manila Branch",          time: "2 min ago",   status: "new" },
  { id: 2, type: "account", text: "Franchise account #fr-018 activated", detail: "Account status changed",       time: "1 hr ago",    status: "ok" },
  { id: 3, type: "order",   text: "Order DOT-0046 confirmed",            detail: "Now in processing queue",      time: "3 hrs ago",   status: "ok" },
  { id: 4, type: "catalog", text: "Item pricing updated",                detail: "12 SKUs in Raw Materials",     time: "Yesterday",   status: "info" },
  { id: 5, type: "order",   text: "Order DOT-0044 completed",            detail: "Marked as fulfilled",          time: "Yesterday",   status: "ok" },
  { id: 6, type: "account", text: "Discount assigned to #fr-022",        detail: "10% partner discount applied", time: "2 days ago",  status: "info" },
];

// ── Nav items ───────────────────────────────────────────────────────────────
const adminNavItems = [
  { label: "Dashboard",  href: "/admin",            icon: LayoutDashboard, ready: true },
  { label: "Franchises", href: "/admin/franchises", icon: Building2,       ready: false },
  { label: "Catalog",    href: "/admin/catalog",    icon: Package,         ready: false },
  { label: "Orders",     href: "/admin/orders",     icon: ClipboardList,   ready: false },
  { label: "Settings",   href: "/admin/settings",   icon: Settings,        ready: false },
];

// ── Module cards ────────────────────────────────────────────────────────────
const modules = [
  { icon: Building2,   title: "Franchise Accounts", desc: "Manage users, discounts, and account access.",        color: "text-blue-600",    bg: "bg-blue-50",    href: "/admin/franchises" },
  { icon: Package,     title: "Item Catalog",        desc: "Update items, pricing, categories, and toggles.",    color: "text-violet-600",  bg: "bg-violet-50",  href: "/admin/catalog" },
  { icon: ClipboardList, title: "Orders",            desc: "View orders, track statuses, inspect line items.",   color: "text-emerald-600", bg: "bg-emerald-50", href: "/admin/orders" },
  { icon: Settings,    title: "Settings",            desc: "Discount rules, system preferences, configuration.", color: "text-orange-600",  bg: "bg-orange-50",  href: "/admin/settings" },
];

// ═══════════════════════════════════════════════════════════════════════════
const AdminPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => { logout(); navigate("/"); };

  // Real catalog stats
  const catalogStats = useMemo(() => {
    const active   = catalogItems.filter((i) => i.is_active && i.is_orderable);
    const inactive = catalogItems.filter((i) => !i.is_active || !i.is_orderable);
    const byCategory: Record<string, number> = {};
    active.forEach((i) => { byCategory[i.category_code] = (byCategory[i.category_code] || 0) + 1; });
    return { total: catalogItems.length, active: active.length, inactive: inactive.length, byCategory };
  }, []);

  const totalOrders = ORDER_STATUSES.reduce((s, o) => s + o.value, 0);

  // ── Sidebar shared components ──────────────────────────────────────────
  const NavLinks = ({ onNavigate }: { onNavigate?: () => void }) => (
    <nav className="flex-1 px-3 py-3 space-y-0.5">
      <Link
        to="/"
        onClick={onNavigate}
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-foreground/50 hover:bg-black/[0.04] hover:text-foreground/80 transition-colors"
      >
        <Home size={17} className="flex-shrink-0" />
        <span>Back to Website</span>
      </Link>
      <div className="h-px bg-black/[0.05] my-1.5 mx-2" />
      {adminNavItems.map((item) => {
        const active = location.pathname === item.href;
        return (
          <Link
            key={item.href}
            to={item.ready ? item.href : "#"}
            onClick={(e) => { if (!item.ready) e.preventDefault(); onNavigate?.(); }}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
              active
                ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                : item.ready
                ? "text-foreground/60 hover:bg-black/[0.04] hover:text-foreground/90"
                : "text-foreground/30 cursor-not-allowed"
            }`}
          >
            <item.icon size={17} className="flex-shrink-0" />
            <span className="flex-1">{item.label}</span>
            {!item.ready && (
              <span className="text-[9px] font-bold uppercase tracking-wider bg-black/[0.06] text-foreground/40 px-2 py-0.5 rounded-full">
                soon
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );

  const UserFooter = () => (
    <div className="px-3 pb-4 border-t border-black/[0.05]">
      <div className="flex items-center gap-2.5 px-3 py-3">
        <div className="w-7 h-7 rounded-full bg-black/[0.06] flex items-center justify-center flex-shrink-0">
          <UserCircle2 size={15} className="text-foreground/50" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-foreground/80 leading-none truncate">{user?.email}</p>
          <p className="text-[10px] text-foreground/40 mt-0.5 leading-none">Administrator</p>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-foreground/50 hover:bg-destructive/[0.07] hover:text-destructive transition-colors"
      >
        <LogOut size={16} /> Sign Out
      </button>
    </div>
  );

  return (
    <div className="min-h-screen w-full flex bg-white">

      {/* ══ SIDEBAR — warm beige ══════════════════════════════════════════ */}
      <aside className="hidden md:flex flex-col w-56 flex-shrink-0 border-r border-[#E8E4DC]/80 bg-[#F6F3EC]">
        <div className="px-5 py-5 border-b border-[#E8E4DC]/70">
          <Link to="/" className="flex items-baseline gap-0 mb-3">
            <span className="font-bold text-xl text-primary tracking-tight">dot</span>
            <span className="font-bold text-xl text-accent">.</span>
          </Link>
          <span className="text-[10px] font-bold uppercase tracking-[0.12em] bg-[#1E2230] text-white/90 px-2.5 py-1 rounded-full inline-block">
            Admin Portal
          </span>
        </div>
        <NavLinks />
        <UserFooter />
      </aside>

      {/* ══ MAIN AREA — white ════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col min-w-0 bg-white">

        {/* Mobile topbar */}
        <header className="md:hidden sticky top-0 z-40 bg-white border-b border-gray-100 px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button onClick={() => setMobileMenuOpen(true)} className="p-1.5 rounded-lg text-foreground hover:bg-gray-100">
              <Menu size={20} />
            </button>
            <Link to="/" className="flex items-baseline gap-0">
              <span className="font-bold text-lg text-primary">dot</span>
              <span className="font-bold text-lg text-accent">.</span>
            </Link>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#1E2230] text-white/90 px-2 py-0.5 rounded-full">
              Admin
            </span>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-muted-foreground border border-gray-200 hover:bg-red-50 hover:text-destructive transition-colors">
            <LogOut size={13} />
        </button>
      </header>

        {/* Mobile drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden" onClick={() => setMobileMenuOpen(false)}>
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
            <div className="absolute left-0 top-0 bottom-0 w-64 bg-[#F6F3EC] shadow-xl flex flex-col" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between px-5 py-4 border-b border-black/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg text-primary">dot<span className="text-accent">.</span></span>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#1E2230] text-white/90 px-2 py-0.5 rounded-full">Admin</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1 rounded-lg text-foreground/50 hover:bg-black/[0.06]">
                  <X size={19} />
                </button>
              </div>
              <NavLinks onNavigate={() => setMobileMenuOpen(false)} />
              <UserFooter />
            </div>
          </div>
        )}

        {/* ── Dashboard content ─────────────────────────────────────── */}
        <main className="flex-1 p-6 md:p-8 lg:p-10 max-w-screen-xl mx-auto w-full">

          {/* ── Page intro ──────────────────────────────────────────── */}
          <div className="mb-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-gray-400 mb-2">
              Admin Dashboard
            </p>
            <h1 className="text-3xl font-bold text-foreground tracking-tight mb-1.5">
              Welcome back,{" "}
              <span className="text-primary">{user?.email?.split("@")[0]}</span>
            </h1>
            <p className="text-sm text-gray-500">
              Manage franchise accounts, the item catalog, order operations, and system settings.
            </p>
          </div>

          {/* ── KPI stat cards ───────────────────────────────────────── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              {
                label: "Franchise Accounts",
                value: MOCK.franchises.total,
                sub: `${MOCK.franchises.active} active · ${MOCK.franchises.suspended} suspended`,
                change: `+${MOCK.franchises.newThisMonth} this month`,
                icon: Users,
                iconColor: "text-blue-600",
                iconBg: "bg-blue-50",
                up: true,
              },
              {
                label: "Active Catalog Items",
                value: catalogStats.active,
                sub: `${catalogStats.total} total SKUs`,
                change: `${catalogStats.inactive} inactive`,
                icon: Boxes,
                iconColor: "text-violet-600",
                iconBg: "bg-violet-50",
                up: null,
              },
              {
                label: "Pending Orders",
                value: MOCK.orders.pending,
                sub: `${MOCK.orders.thisMonth} orders this month`,
                change: `${MOCK.orders.processing} processing now`,
                icon: ShoppingBag,
                iconColor: "text-amber-600",
                iconBg: "bg-amber-50",
                up: false,
              },
              {
                label: "Discounted Accounts",
                value: MOCK.franchises.discounted,
                sub: `of ${MOCK.franchises.total} total accounts`,
                change: `Avg ₱${MOCK.orders.avgOrderValue.toLocaleString()} / order`,
                icon: Percent,
                iconColor: "text-emerald-600",
                iconBg: "bg-emerald-50",
                up: null,
              },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-9 h-9 rounded-xl ${s.iconBg} flex items-center justify-center`}>
                    <s.icon size={18} className={s.iconColor} />
                  </div>
                  {s.up === true && <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{s.change}</span>}
                  {s.up === false && <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">{s.change}</span>}
                  {s.up === null && <span className="text-[10px] font-medium text-gray-400">{s.change}</span>}
                </div>
                <p className="text-3xl font-bold text-foreground leading-none mb-1.5 tabular-nums">{s.value}</p>
                <p className="text-xs font-semibold text-foreground mb-0.5">{s.label}</p>
                <p className="text-[11px] text-gray-400">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* ── Analytics section ────────────────────────────────────── */}
          <div className="grid lg:grid-cols-3 gap-4 mb-8">

            {/* Order Status Breakdown */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 size={14} className="text-primary" />
                  <h2 className="text-sm font-bold text-foreground">Order Status</h2>
                </div>
                <span className="text-xs text-gray-400 tabular-nums">{totalOrders} total</span>
              </div>
              <div className="px-5 py-4 space-y-3">
                {ORDER_STATUSES.map((s) => {
                  const pct = totalOrders > 0 ? (s.value / totalOrders) * 100 : 0;
                  return (
                    <div key={s.label}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${s.color}`} />
                          <span className="text-xs font-medium text-foreground">{s.label}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${s.bg} ${s.text}`}>
                            {s.value}
                          </span>
                        </div>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${s.color} rounded-full transition-all duration-500`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Franchise Account Overview */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 size={14} className="text-primary" />
                  <h2 className="text-sm font-bold text-foreground">Franchise Accounts</h2>
                </div>
                <span className="text-xs text-gray-400">{MOCK.franchises.total} total</span>
              </div>
              <div className="px-5 py-4 space-y-4">
                {[
                  { label: "Active Accounts",  value: MOCK.franchises.active,     of: MOCK.franchises.total,     color: "bg-emerald-500", text: "text-emerald-700", bg: "bg-emerald-50" },
                  { label: "Suspended",        value: MOCK.franchises.suspended,  of: MOCK.franchises.total,     color: "bg-red-400",     text: "text-red-700",    bg: "bg-red-50" },
                  { label: "With Discounts",   value: MOCK.franchises.discounted, of: MOCK.franchises.total,     color: "bg-primary",     text: "text-primary",    bg: "bg-primary/10" },
                ].map((s) => {
                  const pct = s.of > 0 ? (s.value / s.of) * 100 : 0;
                  return (
                    <div key={s.label}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-medium text-foreground">{s.label}</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${s.bg} ${s.text}`}>
                          {s.value} / {s.of}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full ${s.color} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}

                <div className="pt-2 border-t border-gray-100 grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-2xl font-bold text-foreground tabular-nums">{MOCK.franchises.newThisMonth}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5 leading-snug">New this month</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-2xl font-bold text-foreground tabular-nums">{MOCK.franchises.discounted}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5 leading-snug">With pricing discounts</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Volume Snapshot */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp size={14} className="text-primary" />
                  <h2 className="text-sm font-bold text-foreground">Order Volume</h2>
                </div>
                <span className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full font-medium">Mock</span>
              </div>
              <div className="px-5 py-4 space-y-3">
                {[
                  { icon: CalendarDays, label: "This Week",          value: MOCK.orders.thisWeek,                    unit: "orders",  color: "text-primary",     bg: "bg-primary/10" },
                  { icon: CalendarDays, label: "This Month",         value: MOCK.orders.thisMonth,                   unit: "orders",  color: "text-violet-600",  bg: "bg-violet-50" },
                  { icon: Wallet,       label: "Avg Order Value",    value: `₱${MOCK.orders.avgOrderValue.toLocaleString()}`, unit: "", color: "text-emerald-600", bg: "bg-emerald-50" },
                  { icon: Store,        label: "Active Branches",    value: MOCK.orders.activeBranchesThisWeek,     unit: "this wk", color: "text-orange-600",  bg: "bg-orange-50" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl ${s.bg} flex items-center justify-center flex-shrink-0`}>
                      <s.icon size={15} className={s.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] text-gray-400 leading-none mb-0.5">{s.label}</p>
                      <p className="text-sm font-bold text-foreground leading-none">
                        {s.value}
                        {s.unit && <span className="text-[11px] font-normal text-gray-400 ml-1">{s.unit}</span>}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mini highlight */}
              <div className="mx-5 mb-5 bg-primary/[0.06] border border-primary/[0.12] rounded-xl p-3.5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <ShoppingBag size={15} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground leading-none mb-0.5">{MOCK.orders.pending} orders pending review</p>
                  <p className="text-[10px] text-primary/70">Requires admin attention</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Management modules ──────────────────────────────────────── */}
          <div className="flex items-center gap-3 mb-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-gray-400 whitespace-nowrap">Management Modules</p>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            {modules.map((mod) => (
              <div
                key={mod.title}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col group hover:shadow-md hover:border-gray-200 hover:-translate-y-0.5 transition-all duration-200 cursor-not-allowed opacity-80"
              >
                <div className={`w-11 h-11 rounded-2xl ${mod.bg} flex items-center justify-center mb-5`}>
                  <mod.icon size={22} className={mod.color} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-foreground text-sm">{mod.title}</h3>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded-full">Soon</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">{mod.desc}</p>
                </div>
                <div className="flex items-center gap-1.5 mt-5 text-xs font-semibold text-gray-300">
                  Coming soon <AlertCircle size={12} />
                </div>
              </div>
            ))}
          </div>

          {/* ── Bottom panels ────────────────────────────────────────────── */}
          <div className="flex items-center gap-3 mb-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-gray-400 whitespace-nowrap">System Overview</p>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <div className="grid lg:grid-cols-5 gap-5">

            {/* Recent Activity — wider */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Activity size={14} className="text-primary" />
                  <h2 className="text-sm font-bold text-foreground">Recent Activity</h2>
                </div>
                <span className="text-[10px] text-gray-400 font-medium">Mock data</span>
              </div>
              <div className="divide-y divide-gray-50">
                {MOCK_RECENT_ACTIVITY.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 px-5 py-3.5">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      item.status === "new"  ? "bg-primary/10" :
                      item.status === "ok"   ? "bg-emerald-50" : "bg-gray-100"
                    }`}>
                      {item.status === "new"  && <ArrowUpRight size={11} className="text-primary" />}
                      {item.status === "ok"   && <CheckCircle2 size={11} className="text-emerald-600" />}
                      {item.status === "info" && <BadgeCheck size={11} className="text-gray-400" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground leading-snug">{item.text}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{item.detail} · {item.time}</p>
                    </div>
            </div>
          ))}
        </div>
            </div>

            {/* Catalog Breakdown — wider */}
            <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Layers size={14} className="text-primary" />
                  <h2 className="text-sm font-bold text-foreground">Catalog Breakdown</h2>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span><strong className="text-foreground tabular-nums">{catalogStats.active}</strong> active</span>
                  <span><strong className="text-foreground tabular-nums">{catalogStats.inactive}</strong> inactive</span>
                  <span><strong className="text-foreground tabular-nums">{catalogStats.total}</strong> total</span>
                </div>
              </div>

              <div className="px-5 py-4 grid sm:grid-cols-2 gap-x-8 gap-y-3">
                {categories.map((cat) => {
                  const count = catalogStats.byCategory[cat.code] || 0;
                  const pct   = catalogStats.active > 0 ? (count / catalogStats.active) * 100 : 0;
                  return (
                    <div key={cat.code}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-[9px] font-bold text-gray-300 font-mono uppercase tracking-widest w-7 flex-shrink-0">
                            {cat.code}
                          </span>
                          <span className="text-xs text-foreground font-medium truncate">{cat.name}</span>
                        </div>
                        <span className="text-xs font-bold text-foreground tabular-nums ml-2 flex-shrink-0">{count}</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary/40 rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer summary */}
              <div className="flex items-center justify-between px-5 py-3 bg-gray-50/70 border-t border-gray-100">
                <div className="flex items-center gap-1.5 text-xs">
                  <BadgeCheck size={13} className="text-emerald-500" />
                  <span className="text-gray-500"><strong className="text-foreground">{catalogStats.active}</strong> orderable</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs">
                  <AlertCircle size={12} className="text-gray-300" />
                  <span className="text-gray-500"><strong className="text-foreground">{catalogStats.inactive}</strong> inactive SKUs</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs">
                  <Boxes size={12} className="text-gray-300" />
                  <span className="text-gray-500"><strong className="text-foreground">{catalogStats.total}</strong> total SKUs</span>
                </div>
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="mt-8 flex items-center gap-2 text-xs text-gray-300">
            <BadgeCheck size={13} />
            <span>dot Admin Portal — Management modules are in development. Real data integration coming soon.</span>
          </div>

      </main>
      </div>
    </div>
  );
};

export default AdminPage;
