import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PortalLayout from "@/components/portal/PortalLayout";
import { useCart } from "@/contexts/CartContext";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  submitted: "bg-primary/10 text-primary",
  confirmed: "bg-blue-100 text-blue-700",
  processing: "bg-purple-100 text-purple-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-destructive/10 text-destructive",
};

const OrderDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getOrder } = useCart();
  const order = getOrder(id || "");

  if (!order) {
    return (
      <PortalLayout>
        <div className="text-center py-20">
          <p className="text-muted-foreground">Order not found.</p>
          <Link to="/orders" className="text-primary hover:underline text-sm mt-2 inline-block">← Back to Orders</Link>
        </div>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout>
      <div className="max-w-3xl mx-auto">
        <Link to="/orders" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft size={16} /> Back to Orders
        </Link>

        <div className="bg-card rounded-2xl border border-foreground/5 p-6 mb-6">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">{order.order_number}</h1>
              <p className="text-sm text-muted-foreground mt-1">
                {new Date(order.created_at).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
            <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${statusColors[order.status] || ""}`}>
              {order.status}
            </span>
          </div>

          {order.notes && (
            <div className="bg-background rounded-xl p-4 mb-6">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Notes</p>
              <p className="text-sm text-foreground">{order.notes}</p>
            </div>
          )}

          {/* Items table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-foreground/5">
                  <th className="text-left py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Item</th>
                  <th className="text-center py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">UOM</th>
                  <th className="text-center py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Qty</th>
                  <th className="text-right py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Unit Price</th>
                  <th className="text-right py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, i) => (
                  <tr key={i} className="border-b border-foreground/5 last:border-0">
                    <td className="py-3">
                      <p className="font-medium text-foreground">{item.item_name_snapshot}</p>
                      <p className="text-xs text-muted-foreground font-mono">{item.item_code_snapshot}</p>
                    </td>
                    <td className="py-3 text-center text-muted-foreground">{item.uom_snapshot}</td>
                    <td className="py-3 text-center font-semibold text-foreground">{item.quantity}</td>
                    <td className="py-3 text-right text-muted-foreground">₱{item.unit_price_snapshot.toLocaleString()}</td>
                    <td className="py-3 text-right font-semibold text-foreground">₱{item.line_total.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="border-t border-foreground/5 pt-5 mt-5 space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span className="text-foreground font-semibold">₱{order.subtotal.toLocaleString()}</span>
            </div>
            {order.discount_amount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span className="font-semibold">-₱{order.discount_amount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-foreground text-lg pt-2 border-t border-foreground/5">
              <span>Total</span>
              <span>₱{order.final_total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
};

export default OrderDetailPage;
