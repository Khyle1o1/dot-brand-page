import { Link } from "react-router-dom";
import { ClipboardList, ChevronRight, Package } from "lucide-react";
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

const OrdersPage = () => {
  const { orders } = useCart();

  if (orders.length === 0) {
    return (
      <PortalLayout>
        <div className="max-w-lg mx-auto text-center py-20">
          <ClipboardList className="mx-auto text-muted-foreground mb-4" size={48} />
          <h2 className="text-xl font-bold text-foreground mb-2">No orders yet</h2>
          <p className="text-sm text-muted-foreground mb-6">Place your first order from the catalog.</p>
          <Link to="/order-menu" className="bg-primary text-primary-foreground px-8 py-3 rounded-xl text-sm font-bold hover:opacity-90 transition-all inline-flex items-center gap-2">
            <Package size={16} /> Browse Catalog
          </Link>
        </div>
      </PortalLayout>
    );
  }

  return (
    <PortalLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-6">My Orders</h1>
        <div className="space-y-3">
          {orders.map((order) => (
            <Link
              key={order.id}
              to={`/orders/${order.id}`}
              className="bg-card rounded-2xl border border-foreground/5 p-5 flex items-center justify-between hover:shadow-md transition-shadow group"
            >
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-bold text-foreground text-sm">{order.order_number}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${statusColors[order.status] || ""}`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {new Date(order.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                  {" · "}{order.items.length} items
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-foreground">₱{order.final_total.toLocaleString()}</span>
                <ChevronRight size={18} className="text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PortalLayout>
  );
};

export default OrdersPage;
