import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import OrderMenuPage from "./pages/OrderMenuPage.tsx";
import CartPage from "./pages/CartPage.tsx";
import OrdersPage from "./pages/OrdersPage.tsx";
import OrderDetailPage from "./pages/OrderDetailPage.tsx";
import AdminPage from "./pages/AdminPage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/order-menu" element={<ProtectedRoute allowedRoles={["franchise"]}><OrderMenuPage /></ProtectedRoute>} />
              <Route path="/cart" element={<ProtectedRoute allowedRoles={["franchise"]}><CartPage /></ProtectedRoute>} />
              <Route path="/orders" element={<ProtectedRoute allowedRoles={["franchise"]}><OrdersPage /></ProtectedRoute>} />
              <Route path="/orders/:id" element={<ProtectedRoute allowedRoles={["franchise"]}><OrderDetailPage /></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><AdminPage /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
