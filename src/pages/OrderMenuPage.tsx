import { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Plus,
  Minus,
  ShoppingCart,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";
import PortalLayout from "@/components/portal/PortalLayout";
import { catalogItems, categories } from "@/data/catalog";
import { useCart } from "@/contexts/CartContext";

const ITEMS_PER_PAGE_OPTIONS = [20, 40, 60] as const;

const OrderMenuPage = () => {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(20);
  const catalogTopRef = useRef<HTMLDivElement>(null);

  const { addItem, updateQuantity, getQuantity, itemCount, subtotal } = useCart();

  // Reset page whenever filters/search/perPage changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, categoryFilter, itemsPerPage]);

  // ── Filtering ──────────────────────────────────────────────────────────────
  const filteredItems = useMemo(() => {
    return catalogItems
      .filter((i) => i.is_active && i.is_orderable)
      .filter((i) => categoryFilter === "all" || i.category_code === categoryFilter)
      .filter((i) => {
        if (!search) return true;
        const q = search.toLowerCase();
        return (
          i.item_code.toLowerCase().includes(q) ||
          i.display_name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q)
        );
      });
  }, [search, categoryFilter]);

  // ── Pagination ─────────────────────────────────────────────────────────────
  const totalFilteredItems = filteredItems.length;
  const totalPages = Math.max(1, Math.ceil(totalFilteredItems / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalFilteredItems);
  const paginatedItems = filteredItems.slice(startIndex, endIndex); // only this renders

  // ── Sidebar counts ─────────────────────────────────────────────────────────
  const categoryCounts = useMemo(() => {
    const map: Record<string, number> = {};
    catalogItems.filter((i) => i.is_active && i.is_orderable).forEach((i) => {
      map[i.category_code] = (map[i.category_code] || 0) + 1;
    });
    return map;
  }, []);
  const totalActiveItems = catalogItems.filter((i) => i.is_active && i.is_orderable).length;

  const goToPage = (page: number) => {
    setCurrentPage(page);
    catalogTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const getPageNumbers = (): (number | "...")[] => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | "...")[] = [1];
    if (safeCurrentPage > 3) pages.push("...");
    for (
      let i = Math.max(2, safeCurrentPage - 1);
      i <= Math.min(totalPages - 1, safeCurrentPage + 1);
      i++
    ) {
      pages.push(i);
    }
    if (safeCurrentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  // ── Category Panel ─────────────────────────────────────────────────────────
  const CategoryPanel = ({ onSelect }: { onSelect?: () => void }) => (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground mb-3 px-2">
        Category
      </p>
      <div className="space-y-0.5">
        <button
          onClick={() => { setCategoryFilter("all"); onSelect?.(); }}
          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
            categoryFilter === "all"
              ? "bg-primary text-primary-foreground font-semibold"
              : "text-foreground font-medium hover:bg-black/[0.05]"
          }`}
        >
          <span>All</span>
          <span className={`text-xs tabular-nums ${categoryFilter === "all" ? "text-white/60" : "text-muted-foreground"}`}>
            {totalActiveItems}
          </span>
        </button>
        {categories.map((cat) => (
          <button
            key={cat.code}
            onClick={() => { setCategoryFilter(cat.code); onSelect?.(); }}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
              categoryFilter === cat.code
                ? "bg-primary text-primary-foreground font-semibold"
                : "text-foreground font-medium hover:bg-black/[0.05]"
            }`}
          >
            <span className="pr-2 leading-snug">{cat.name}</span>
            <span className={`text-xs tabular-nums flex-shrink-0 ${categoryFilter === cat.code ? "text-white/60" : "text-muted-foreground"}`}>
              {categoryCounts[cat.code] || 0}
            </span>
          </button>
        ))}
      </div>
    </div>
  );

  // ── Pagination Controls ────────────────────────────────────────────────────
  const PaginationControls = () => (
    <div className="flex items-center gap-1 flex-wrap">
      <button
        onClick={() => goToPage(safeCurrentPage - 1)}
        disabled={safeCurrentPage === 1}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border border-black/[0.1] bg-white text-muted-foreground hover:bg-black/[0.04] hover:text-foreground transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={14} />
        <span className="hidden sm:inline">Prev</span>
      </button>

      {getPageNumbers().map((page, i) =>
        page === "..." ? (
          <span
            key={`e-${i}`}
            className="w-9 text-center text-muted-foreground text-sm select-none"
          >
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => goToPage(page as number)}
            className={`w-9 h-9 rounded-lg text-sm font-semibold transition-colors ${
              safeCurrentPage === page
                ? "bg-primary text-primary-foreground shadow-sm"
                : "border border-black/[0.1] bg-white text-muted-foreground hover:bg-black/[0.04] hover:text-foreground"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => goToPage(safeCurrentPage + 1)}
        disabled={safeCurrentPage === totalPages}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border border-black/[0.1] bg-white text-muted-foreground hover:bg-black/[0.04] hover:text-foreground transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={14} />
      </button>
    </div>
  );

  return (
    <PortalLayout>
      <div className="flex gap-7 xl:gap-8">

        {/* ── Desktop category sidebar ────────────────────────────────── */}
        <div className="hidden lg:block w-52 xl:w-60 flex-shrink-0">
          <div className="sticky top-[5.5rem]">
            <CategoryPanel />
          </div>
        </div>

        {/* ── Main content ────────────────────────────────────────────── */}
        <div className="flex-1 min-w-0" ref={catalogTopRef}>

          {/* Page title + search */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
            <div>
              <h1 className="text-3xl font-bold text-foreground tracking-tight leading-none">
                Order Menu
              </h1>
              <p className="text-sm text-muted-foreground mt-2">
                {totalFilteredItems}{" "}
                {totalFilteredItems === 1 ? "product" : "products"}
                {categoryFilter !== "all" && (
                  <button
                    onClick={() => setCategoryFilter("all")}
                    className="ml-2 text-primary hover:underline text-xs font-medium"
                  >
                    Clear filter ×
                  </button>
                )}
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              {/* Mobile filter trigger */}
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl border border-black/[0.1] bg-white text-sm font-medium text-muted-foreground hover:text-foreground transition-colors shadow-sm"
              >
                <SlidersHorizontal size={15} /> Filter
              </button>

              {/* Search bar */}
              <div className="relative">
                <Search
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                  size={15}
                />
                <input
                  type="text"
                  placeholder="Search by name or code..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-60 xl:w-80 pl-10 pr-10 py-2.5 rounded-xl border border-black/[0.1] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 placeholder:text-muted-foreground/50 shadow-sm transition-shadow"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ── Summary / per-page bar ─────────────────────────────────── */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 py-2.5 px-4 bg-white rounded-xl border border-black/[0.06] shadow-sm">
            <p className="text-sm text-muted-foreground">
              {totalFilteredItems === 0 ? (
                "No items found"
              ) : (
                <>
                  Showing{" "}
                  <span className="font-semibold text-foreground">{startIndex + 1}–{endIndex}</span>
                  {" "}of{" "}
                  <span className="font-semibold text-foreground">{totalFilteredItems}</span>
                  {" "}items
                </>
              )}
            </p>
            <div className="flex items-center gap-2.5">
              <span className="text-xs text-muted-foreground font-medium">Per page</span>
              <div className="flex items-center gap-1">
                {ITEMS_PER_PAGE_OPTIONS.map((n) => (
                  <button
                    key={n}
                    onClick={() => setItemsPerPage(n)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      itemsPerPage === n
                        ? "bg-primary text-primary-foreground"
                        : "border border-black/[0.1] text-muted-foreground hover:bg-black/[0.04] hover:text-foreground"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Product grid ───────────────────────────────────────────── */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {paginatedItems.map((item) => {
              const qty = getQuantity(item.item_code);
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-black/[0.07] overflow-hidden hover:shadow-md hover:border-black/[0.13] transition-all duration-200 flex flex-col group"
                >
                  {/* Placeholder image area */}
                  <div className="relative bg-muted/30 aspect-[4/3] flex items-center justify-center overflow-hidden">
                    <span className="text-5xl font-bold text-foreground/[0.05] select-none tracking-tighter">
                      dot
                    </span>
                    {/* Category badge */}
                    <span className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-sm text-foreground/70 text-[9px] font-bold px-2 py-1 rounded-full uppercase tracking-widest border border-black/[0.08] shadow-sm">
                      {item.category_code}
                    </span>
                  </div>

                  {/* Card body */}
                  <div className="p-3.5 flex flex-col flex-1">
                    <p className="text-[9px] text-muted-foreground/60 font-mono tracking-wide mb-1.5 uppercase">
                      {item.item_code}
                    </p>
                    <h3 className="font-bold text-foreground text-sm leading-snug mb-1 line-clamp-2 flex-1">
                      {item.display_name}
                    </h3>
                    <p className="text-[11px] text-muted-foreground line-clamp-1 mb-3.5 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Price row */}
                    <div className="flex items-baseline justify-between mb-3">
                      <span className="text-base font-bold text-foreground">
                        ₱{item.price.toLocaleString()}
                      </span>
                      <span className="text-[11px] text-muted-foreground">/ {item.uom}</span>
                    </div>

                    {/* Add / quantity controls */}
                    {qty === 0 ? (
                      <button
                        onClick={() => addItem(item)}
                        className="w-full bg-foreground text-background py-2.5 rounded-xl text-xs font-bold hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Plus size={12} /> Quick Add
                      </button>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateQuantity(item.item_code, qty - 1)}
                          className="w-8 h-8 rounded-xl bg-muted/60 flex items-center justify-center hover:bg-muted transition-colors flex-shrink-0 border border-black/[0.06]"
                        >
                          <Minus size={13} />
                        </button>
                        <input
                          type="number"
                          value={qty}
                          onChange={(e) =>
                            updateQuantity(
                              item.item_code,
                              Math.max(0, parseInt(e.target.value) || 0)
                            )
                          }
                          className="flex-1 text-center py-1.5 rounded-xl border border-black/[0.1] text-sm font-bold bg-white min-w-0 focus:outline-none focus:ring-2 focus:ring-primary/20"
                          min={0}
                        />
                        <button
                          onClick={() => addItem(item)}
                          className="w-8 h-8 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-colors flex-shrink-0"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── Empty state ─────────────────────────────────────────────── */}
          {totalFilteredItems === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border border-black/[0.06]">
              <div className="text-5xl mb-4 opacity-20 select-none">☕</div>
              <p className="font-semibold text-foreground text-sm mb-1.5">No items found</p>
              <p className="text-muted-foreground text-xs max-w-xs mx-auto">
                Try adjusting your search or selecting a different category.
              </p>
              {(search || categoryFilter !== "all") && (
                <button
                  onClick={() => { setSearch(""); setCategoryFilter("all"); }}
                  className="mt-4 text-primary text-sm font-medium hover:underline"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}

          {/* ── Bottom pagination ───────────────────────────────────────── */}
          {totalPages > 1 && (
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-black/[0.06]">
              <p className="text-sm text-muted-foreground">
                Page{" "}
                <span className="font-semibold text-foreground">{safeCurrentPage}</span>
                {" "}of{" "}
                <span className="font-semibold text-foreground">{totalPages}</span>
              </p>
              <PaginationControls />
            </div>
          )}
        </div>

        {/* ── Desktop cart widget ─────────────────────────────────────── */}
        {itemCount > 0 && (
          <div className="hidden xl:block w-56 flex-shrink-0">
            <div className="sticky top-[5.5rem] bg-white rounded-2xl border border-black/[0.07] p-5 shadow-sm">
              <h3 className="font-bold text-foreground text-sm mb-4 flex items-center gap-2">
                <ShoppingCart size={15} className="text-primary" /> Cart
              </h3>
              <div className="space-y-2.5 text-sm mb-5">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-xs">Items</span>
                  <span className="font-semibold text-foreground text-sm">{itemCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-xs">Subtotal</span>
                  <span className="font-semibold text-foreground text-sm">
                    ₱{subtotal.toLocaleString()}
                  </span>
                </div>
              </div>
              <Link
                to="/cart"
                className="w-full bg-primary text-primary-foreground py-2.5 rounded-xl text-xs font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart size={14} /> View Cart
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* ── Mobile filter drawer ──────────────────────────────────────── */}
      {mobileFiltersOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          onClick={() => setMobileFiltersOpen(false)}
        >
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          <div
            className="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-black/[0.07]">
              <h3 className="font-bold text-foreground text-sm">Filters</h3>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="text-muted-foreground p-1 rounded-lg hover:bg-black/[0.04]"
              >
                <X size={19} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <CategoryPanel onSelect={() => setMobileFiltersOpen(false)} />
            </div>
          </div>
        </div>
      )}

      {/* ── Mobile floating cart ──────────────────────────────────────── */}
      {itemCount > 0 && (
        <Link
          to="/cart"
          className="xl:hidden fixed bottom-6 right-6 bg-primary text-primary-foreground px-5 py-3 rounded-full shadow-lg shadow-primary/25 flex items-center gap-2 text-sm font-bold hover:opacity-90 z-30"
        >
          <ShoppingCart size={16} />
          {itemCount} · ₱{subtotal.toLocaleString()}
        </Link>
      )}
    </PortalLayout>
  );
};

export default OrderMenuPage;
