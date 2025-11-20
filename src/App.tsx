import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import Lab from "./pages/Lab";
import Pharmacy from "./pages/Pharmacy";
import Wards from "./pages/Wards";
import Billing from "./pages/Billing";
import Consultations from "./pages/Consultations";
import Maternity from "./pages/Maternity";
import Optical from "./pages/Optical";
import Appointments from "./pages/Appointments";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />

          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/lab" element={<Lab />} />
            <Route path="/pharmacy" element={<Pharmacy />} />
            <Route path="/wards" element={<Wards />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/consultations" element={<Consultations />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/maternity" element={<Maternity />} />
            <Route path="/optical" element={<Optical />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
