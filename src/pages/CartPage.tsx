import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Minus, Plus, ArrowLeft, ShoppingCart } from "lucide-react";
import PortalLayout from "@/components/portal/PortalLayout";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

const CartPage = () => {
  const { items, updateQuantity, removeItem, clearCart, subtotal, discountAmount, finalTotal, placeOrder } = useCart();
  const { franchise } = useAuth();
  const [notes, setNotes] = useState("");
  const [placing, setPlacing] = useState(false);
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    setPlacing(true);
    setTimeout(() => {
      const order = placeOrder(notes);
      setPlacing(false);
      navigate(`/orders/${order.id}`);
    }, 600);
  };

  if (items.length === 0) {
    return (
      <PortalLayout>
        <div className="max-w-lg mx-auto text-center py-20">
          <ShoppingCart className="mx-auto text-muted-foreground mb-4" size={48} />
          <h2 className="text-xl font-bold text-foreground mb-2">Your cart is empty</h2>
          <p className="text-sm text-muted-foreground mb-6">Browse the catalog and add items to get started.</p>
          <Link to="/order-menu" className="bg-primary text-primary-foreground px-8 py-3 rounded-xl text-sm font-bold hover:opacity-90 transition-all inline-flex items-center gap-2">
            <ArrowLeft size={16} /> Browse Catalog
          </Link>
        </div>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Cart</h1>
            <p className="text-sm text-muted-foreground mt-1">{items.length} distinct items</p>
          </div>
          <button onClick={clearCart} className="text-sm text-destructive hover:underline font-medium">Clear All</button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Items list */}
          <div className="lg:col-span-2 space-y-3">
            {items.map((ci) => (
              <div key={ci.item.item_code} className="bg-card rounded-2xl border border-foreground/5 p-5 flex gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-bold text-foreground text-sm">{ci.item.display_name}</p>
                      <p className="text-xs text-muted-foreground font-mono mt-0.5">{ci.item.item_code} · {ci.item.uom}</p>
                    </div>
                    <button onClick={() => removeItem(ci.item.item_code)} className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(ci.item.item_code, ci.quantity - 1)} className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-muted-foreground/10">
                        <Minus size={14} />
                      </button>
                      <input
                        type="number"
                        value={ci.quantity}
                        onChange={(e) => updateQuantity(ci.item.item_code, Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-16 text-center py-1.5 rounded-lg border border-foreground/10 text-sm font-bold bg-card"
                        min={1}
                      />
                      <button onClick={() => updateQuantity(ci.item.item_code, ci.quantity + 1)} className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90">
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">₱{ci.item.price} × {ci.quantity}</p>
                      <p className="font-bold text-foreground">₱{ci.lineTotal.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-card rounded-2xl border border-foreground/5 p-6">
              <h3 className="font-bold text-foreground mb-5">Order Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="text-foreground font-semibold">₱{subtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({franchise?.discountNote})</span>
                    <span className="font-semibold">-₱{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t border-foreground/5 pt-3 flex justify-between font-bold text-foreground text-lg">
                  <span>Total</span>
                  <span>₱{finalTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-5">
                <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Order Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any special instructions..."
                  className="w-full p-3 rounded-xl border border-foreground/10 bg-background text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={placing}
                className="mt-5 w-full bg-primary text-primary-foreground py-3.5 rounded-xl text-sm font-bold hover:opacity-90 transition-all disabled:opacity-60"
              >
                {placing ? "Placing Order..." : "Place Order"}
              </button>

              <Link to="/order-menu" className="mt-3 w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-1.5 py-2">
                <ArrowLeft size={14} /> Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
};

export default CartPage;
