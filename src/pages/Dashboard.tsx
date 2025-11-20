import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Calendar,
  Bed,
  DollarSign,
  FileText,
} from "lucide-react";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPatients: 0,
    todayAppointments: 0,
    activeAdmissions: 0,
    pendingBills: 0,
    todayRevenue: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

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

      // Fetch pending bills (using 'billing' table)
      const { count: billsCount } = await supabase
        .from("billing")
        .select("*", { count: "exact", head: true })
        .in("payment_status", ["pending", "partial"]);

      // Fetch today's revenue (using 'billing' table)
      const { data: todayBills } = await supabase
        .from("billing")
        .select("paid_amount")
        .gte("created_at", `${today}T00:00:00`)
        .lt("created_at", `${today}T23:59:59`)
        .eq("payment_status", "paid");

      const revenue = (todayBills as any[])?.reduce((sum, bill) => sum + Number(bill.paid_amount || 0), 0) || 0;

      setStats({
        totalPatients: patientsCount || 0,
        todayAppointments: appointmentsCount || 0,
        activeAdmissions: admissionsCount || 0,
        pendingBills: billsCount || 0,
        todayRevenue: revenue,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-2">Dashboard</h2>
        <p className="text-muted-foreground">Welcome to PCC General Hospital Management System</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
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
    </div>
  );
};

export default Dashboard;