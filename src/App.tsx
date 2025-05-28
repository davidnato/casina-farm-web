
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ProductsPage from "./pages/ProductsPage";
import ProjectsPage from "./pages/ProjectsPage";
import BlogPage from "./pages/BlogPage";
import OrderPage from "./pages/OrderPage";
import ResourcesPage from "./pages/ResourcesPage";
import AuthPage from "./pages/AuthPage";
import PaymentPage from "./pages/PaymentPage";
import CreateAdminPage from "./pages/CreateAdminPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/create-admin" element={<CreateAdminPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
