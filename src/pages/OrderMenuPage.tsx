import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, Plus, Minus, ShoppingCart, Filter, X } from "lucide-react";
import PortalLayout from "@/components/portal/PortalLayout";
import { catalogItems, categories } from "@/data/catalog";
import { useCart } from "@/contexts/CartContext";

const OrderMenuPage = () => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { addItem, updateQuantity, getQuantity, itemCount, subtotal } = useCart();

  const filtered = useMemo(() => {
    return catalogItems
      .filter((i) => i.is_active && i.is_orderable)
      .filter((i) => categoryFilter === "all" || i.category_code === categoryFilter)
      .filter((i) => {
        if (!search) return true;
        const q = search.toLowerCase();
        return i.item_code.toLowerCase().includes(q) || i.display_name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q);
      });
  }, [search, categoryFilter]);

  const categoryCounts = useMemo(() => {
    const map: Record<string, number> = {};
    catalogItems.filter((i) => i.is_active && i.is_orderable).forEach((i) => {
      map[i.category_code] = (map[i.category_code] || 0) + 1;
    });
    return map;
  }, []);

  const CategorySidebar = () => (
    <div className="space-y-1">
      <button
        onClick={() => setCategoryFilter("all")}
        className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
          categoryFilter === "all" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }`}
      >
        All Items
        <span className="ml-2 opacity-60">({catalogItems.filter((i) => i.is_active).length})</span>
      </button>
      {categories.map((cat) => (
        <button
          key={cat.code}
          onClick={() => { setCategoryFilter(cat.code); setMobileFiltersOpen(false); }}
          className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
            categoryFilter === cat.code ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          {cat.name}
          <span className="ml-2 opacity-60">({categoryCounts[cat.code] || 0})</span>
        </button>
      ))}
    </div>
  );

  return (
    <PortalLayout>
      <div className="flex gap-6">
        {/* Desktop sidebar filters */}
        <div className="hidden lg:block w-56 flex-shrink-0">
          <h3 className="font-bold text-sm text-foreground mb-4 px-4">Categories</h3>
          <CategorySidebar />
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Order Menu</h1>
              <p className="text-sm text-muted-foreground mt-1">{filtered.length} items available</p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button onClick={() => setMobileFiltersOpen(true)} className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl border border-foreground/10 text-sm font-medium text-muted-foreground">
                <Filter size={16} /> Filters
              </button>
              <div className="relative flex-1 sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                <input
                  type="text"
                  placeholder="Search by name or code..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-foreground/10 bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
            </div>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((item) => {
              const qty = getQuantity(item.item_code);
              return (
                <div key={item.id} className="bg-card rounded-2xl border border-foreground/5 p-5 flex flex-col hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {item.category_code}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-mono">{item.item_code}</span>
                  </div>
                  <h3 className="font-bold text-foreground text-sm leading-snug mb-1">{item.display_name}</h3>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-1">{item.description}</p>
                  <div className="mt-auto flex items-end justify-between">
                    <div>
                      <span className="text-lg font-bold text-foreground">₱{item.price.toLocaleString()}</span>
                      <span className="text-xs text-muted-foreground ml-1.5">/ {item.uom}</span>
                    </div>
                    {qty === 0 ? (
                      <button
                        onClick={() => addItem(item)}
                        className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-xs font-bold hover:opacity-90 transition-all flex items-center gap-1.5"
                      >
                        <Plus size={14} /> Add
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQuantity(item.item_code, qty - 1)} className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-muted-foreground/10 transition-colors">
                          <Minus size={14} />
                        </button>
                        <input
                          type="number"
                          value={qty}
                          onChange={(e) => updateQuantity(item.item_code, Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-14 text-center py-1.5 rounded-lg border border-foreground/10 text-sm font-bold bg-card"
                          min={0}
                        />
                        <button onClick={() => addItem(item)} className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-colors">
                          <Plus size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-sm">No items found matching your search.</p>
            </div>
          )}
        </div>

        {/* Desktop cart summary */}
        {itemCount > 0 && (
          <div className="hidden xl:block w-64 flex-shrink-0">
            <div className="sticky top-8 bg-card rounded-2xl border border-foreground/5 p-5">
              <h3 className="font-bold text-foreground text-sm mb-4 flex items-center gap-2">
                <ShoppingCart size={16} /> Cart Summary
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Items</span>
                  <span className="font-semibold text-foreground">{itemCount}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-semibold text-foreground">₱{subtotal.toLocaleString()}</span>
                </div>
              </div>
              <Link to="/cart" className="mt-5 w-full bg-primary text-primary-foreground py-3 rounded-xl text-sm font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2">
                <ShoppingCart size={16} /> View Cart
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Mobile filter drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" onClick={() => setMobileFiltersOpen(false)}>
          <div className="absolute inset-0 bg-foreground/40" />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-card shadow-2xl p-5" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-foreground">Categories</h3>
              <button onClick={() => setMobileFiltersOpen(false)}><X size={20} /></button>
            </div>
            <CategorySidebar />
          </div>
        </div>
      )}

      {/* Mobile floating cart */}
      {itemCount > 0 && (
        <Link to="/cart" className="xl:hidden fixed bottom-6 right-6 bg-primary text-primary-foreground px-6 py-3.5 rounded-full shadow-lg shadow-primary/30 flex items-center gap-3 text-sm font-bold hover:opacity-90 z-30">
          <ShoppingCart size={18} />
          {itemCount} items · ₱{subtotal.toLocaleString()}
        </Link>
      )}
    </PortalLayout>
  );
};

export default OrderMenuPage;
