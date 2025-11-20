import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Calendar,
  Bed,
  DollarSign,
  Activity,
  FileText,
  Pill,
  TestTube,
  LogOut,
  Menu,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavLink } from "@/components/NavLink";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPatients: 0,
    todayAppointments: 0,
    activeAdmissions: 0,
    pendingBills: 0,
    todayRevenue: 0,
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check authentication
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      setUser(session.user);
      await fetchStats();
      setLoading(false);
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        navigate("/auth");
      }
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchStats = async () => {
    try {
      // Fetch total patients
      const { count: patientsCount } = await supabase
        .from("patients")
        .select("*", { count: "exact", head: true });

      // Fetch today's appointments
      const today = new Date().toISOString().split("T")[0];
      const { count: appointmentsCount } = await supabase
        .from("appointments")
        .select("*", { count: "exact", head: true })
        .gte("appointment_date", `${today}T00:00:00`)
        .lt("appointment_date", `${today}T23:59:59`);

      // Fetch active admissions
      const { count: admissionsCount } = await supabase
        .from("admissions")
        .select("*", { count: "exact", head: true })
        .eq("status", "admitted");

      // Fetch pending bills
      const { count: billsCount } = await supabase
        .from("bills")
        .select("*", { count: "exact", head: true })
        .in("payment_status", ["pending", "partial"]);

      // Fetch today's revenue
      const { data: todayBills } = await supabase
        .from("bills")
        .select("paid_amount")
        .gte("created_at", `${today}T00:00:00`)
        .lt("created_at", `${today}T23:59:59`)
        .eq("payment_status", "paid");

      const revenue = todayBills?.reduce((sum, bill) => sum + Number(bill.paid_amount || 0), 0) || 0;

      setStats({
        totalPatients: patientsCount || 0,
        todayAppointments: appointmentsCount || 0,
        activeAdmissions: admissionsCount || 0,
        pendingBills: billsCount || 0,
        todayRevenue: revenue,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged out successfully",
      });
      navigate("/auth");
    } catch (error: any) {
      toast({
        title: "Error logging out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const navigationItems = [
    { to: "/patients", icon: Users, label: "Patients" },
    { to: "/appointments", icon: Calendar, label: "Appointments" },
    { to: "/consultations", icon: FileText, label: "Consultations" },
    { to: "/laboratory", icon: TestTube, label: "Laboratory" },
    { to: "/pharmacy", icon: Pill, label: "Pharmacy" },
    { to: "/wards", icon: Bed, label: "Wards" },
    { to: "/billing", icon: DollarSign, label: "Billing" },
  ];

  const NavigationMenu = () => (
    <nav className="space-y-2 p-4">
      {navigationItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground transition-colors hover:bg-accent"
          activeClassName="bg-accent"
        >
          <item.icon className="h-5 w-5" />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-card">
        <div className="flex h-16 items-center px-4 gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="py-4 px-3 border-b">
                <h2 className="text-lg font-semibold">HMS</h2>
              </div>
              <NavigationMenu />
            </SheetContent>
          </Sheet>

          <h1 className="text-xl font-bold">Hospital Management System</h1>
          
          <div className="ml-auto flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden md:inline">
              {user?.email}
            </span>
            <Button onClick={handleLogout} variant="ghost" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden md:block w-64 border-r bg-card min-h-[calc(100vh-4rem)]">
          <NavigationMenu />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Dashboard</h2>
            <p className="text-muted-foreground">Welcome to PCC General Hospital Management System</p>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalPatients}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.todayAppointments}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Admissions</CardTitle>
                <Bed className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeAdmissions}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Bills</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pendingBills}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.todayRevenue.toLocaleString()} FCFA</div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Commonly used features for quick access</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Button onClick={() => navigate("/patients")} className="h-24 flex flex-col gap-2">
                  <Users className="h-6 w-6" />
                  Register New Patient
                </Button>
                <Button onClick={() => navigate("/appointments")} variant="outline" className="h-24 flex flex-col gap-2">
                  <Calendar className="h-6 w-6" />
                  Book Appointment
                </Button>
                <Button onClick={() => navigate("/consultations")} variant="outline" className="h-24 flex flex-col gap-2">
                  <FileText className="h-6 w-6" />
                  Start Consultation
                </Button>
                <Button onClick={() => navigate("/billing")} variant="outline" className="h-24 flex flex-col gap-2">
                  <DollarSign className="h-6 w-6" />
                  Create Bill
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;