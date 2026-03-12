import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { CatalogItem } from "@/data/catalog";
import { useAuth } from "@/contexts/AuthContext";

export interface CartItem {
  item: CatalogItem;
  quantity: number;
  lineTotal: number;
}

export interface OrderItemSnapshot {
  item_id: string;
  item_code_snapshot: string;
  item_name_snapshot: string;
  description_snapshot: string;
  uom_snapshot: string;
  unit_price_snapshot: number;
  quantity: number;
  line_total: number;
}

export interface Order {
  id: string;
  franchise_id: string;
  order_number: string;
  status: "pending" | "submitted" | "confirmed" | "processing" | "completed" | "cancelled";
  subtotal: number;
  discount_amount: number;
  final_total: number;
  notes: string;
  items: OrderItemSnapshot[];
  created_at: string;
  updated_at: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CatalogItem, qty?: number) => void;
  updateQuantity: (itemCode: string, qty: number) => void;
  removeItem: (itemCode: string) => void;
  clearCart: () => void;
  getQuantity: (itemCode: string) => number;
  subtotal: number;
  discountAmount: number;
  finalTotal: number;
  itemCount: number;
  placeOrder: (notes: string) => Order;
  orders: Order[];
  getOrder: (id: string) => Order | undefined;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const { franchise } = useAuth();
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("dot_cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem("dot_orders");
    return saved ? JSON.parse(saved) : [];
  });

  const persist = (newItems: CartItem[]) => {
    setItems(newItems);
    localStorage.setItem("dot_cart", JSON.stringify(newItems));
  };

  const addItem = useCallback((item: CatalogItem, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((ci) => ci.item.item_code === item.item_code);
      let next: CartItem[];
      if (existing) {
        next = prev.map((ci) =>
          ci.item.item_code === item.item_code
            ? { ...ci, quantity: ci.quantity + qty, lineTotal: (ci.quantity + qty) * ci.item.price }
            : ci
        );
      } else {
        next = [...prev, { item, quantity: qty, lineTotal: qty * item.price }];
      }
      localStorage.setItem("dot_cart", JSON.stringify(next));
      return next;
    });
  }, []);

  const updateQuantity = useCallback((itemCode: string, qty: number) => {
    if (qty <= 0) {
      setItems((prev) => {
        const next = prev.filter((ci) => ci.item.item_code !== itemCode);
        localStorage.setItem("dot_cart", JSON.stringify(next));
        return next;
      });
    } else {
      setItems((prev) => {
        const next = prev.map((ci) =>
          ci.item.item_code === itemCode ? { ...ci, quantity: qty, lineTotal: qty * ci.item.price } : ci
        );
        localStorage.setItem("dot_cart", JSON.stringify(next));
        return next;
      });
    }
  }, []);

  const removeItem = useCallback((itemCode: string) => {
    setItems((prev) => {
      const next = prev.filter((ci) => ci.item.item_code !== itemCode);
      localStorage.setItem("dot_cart", JSON.stringify(next));
      return next;
    });
  }, []);

  const clearCart = useCallback(() => persist([]), []);

  const getQuantity = useCallback((itemCode: string) => {
    return items.find((ci) => ci.item.item_code === itemCode)?.quantity || 0;
  }, [items]);

  const subtotal = items.reduce((s, ci) => s + ci.lineTotal, 0);
  const discountAmount = franchise?.hasDiscount
    ? franchise.discountType === "percentage"
      ? Math.round(subtotal * (franchise.discountValue / 100))
      : franchise.discountValue
    : 0;
  const finalTotal = subtotal - discountAmount;
  const itemCount = items.reduce((s, ci) => s + ci.quantity, 0);

  const placeOrder = useCallback(
    (notes: string): Order => {
      const order: Order = {
        id: `ord-${Date.now()}`,
        franchise_id: franchise?.id || "unknown",
        order_number: `DOT-${String(orders.length + 1).padStart(4, "0")}`,
        status: "submitted",
        subtotal,
        discount_amount: discountAmount,
        final_total: finalTotal,
        notes,
        items: items.map((ci) => ({
          item_id: ci.item.id,
          item_code_snapshot: ci.item.item_code,
          item_name_snapshot: ci.item.display_name,
          description_snapshot: ci.item.description,
          uom_snapshot: ci.item.uom,
          unit_price_snapshot: ci.item.price,
          quantity: ci.quantity,
          line_total: ci.lineTotal,
        })),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      const newOrders = [order, ...orders];
      setOrders(newOrders);
      localStorage.setItem("dot_orders", JSON.stringify(newOrders));
      persist([]);
      return order;
    },
    [items, orders, subtotal, discountAmount, finalTotal, franchise]
  );

  const getOrder = useCallback((id: string) => orders.find((o) => o.id === id), [orders]);

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQuantity, removeItem, clearCart, getQuantity, subtotal, discountAmount, finalTotal, itemCount, placeOrder, orders, getOrder }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
