import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, Calendar, Clock, Users, CheckCircle } from "lucide-react";
import { AppointmentForm } from "@/components/appointments/AppointmentForm";
import { useToast } from "@/hooks/use-toast";

const Appointments = () => {
    const [appointments, setAppointments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [stats, setStats] = useState({
        total: 0,
        today: 0,
        pending: 0,
        completed: 0,
    });
    const { toast } = useToast();

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from("appointments")
                .select(`
          *,
          patient:patients(id, full_name, patient_number),
          doctor:profiles!appointments_doctor_id_fkey(id, full_name)
        `)
                .order("appointment_date", { ascending: false });

            if (error) throw error;

            setAppointments(data || []);

            // Calculate stats
            const now = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);

            const todayAppointments = (data || []).filter((apt: any) => {
                const aptDate = new Date(apt.appointment_date);
                return aptDate >= today && aptDate < tomorrow;
            });

            setStats({
                total: data?.length || 0,
                today: todayAppointments.length,
                pending: (data || []).filter((apt: any) => apt.status === 'pending').length,
                completed: (data || []).filter((apt: any) => apt.status === 'completed').length,
            });
        } catch (error: any) {
            toast({
                title: "Error fetching appointments",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const filteredAppointments = appointments.filter((appointment) => {
        const matchesSearch =
            appointment.patient?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            appointment.doctor?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            appointment.reason?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === "all" || appointment.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const handleSuccess = () => {
        setIsSheetOpen(false);
        fetchAppointments();
    };

    const getStatusBadge = (status: string) => {
        const variants: Record<string, any> = {
            pending: { variant: "secondary", label: "Pending" },
            in_progress: { variant: "default", label: "In Progress" },
            completed: { variant: "outline", label: "Completed" },
            cancelled: { variant: "destructive", label: "Cancelled" },
        };

        const config = variants[status] || variants.pending;
        return <Badge variant={config.variant}>{config.label}</Badge>;
    };

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return {
            date: date.toLocaleDateString(),
            time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Appointments</h1>
                    <p className="text-muted-foreground">Schedule and manage patient appointments</p>
                </div>
                <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                    <SheetTrigger asChild>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Schedule Appointment
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
                        <SheetHeader className="mb-6">
                            <SheetTitle>Schedule New Appointment</SheetTitle>
                            <SheetDescription>
                                Book an appointment for a patient with a doctor.
                            </SheetDescription>
                        </SheetHeader>
                        <AppointmentForm onSuccess={handleSuccess} />
                    </SheetContent>
                </Sheet>
            </div>

            {/* Statistics Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.total}</div>
                        <p className="text-xs text-muted-foreground">All time</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.today}</div>
                        <p className="text-xs text-muted-foreground">Scheduled for today</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.pending}</div>
                        <p className="text-xs text-muted-foreground">Awaiting consultation</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Completed</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.completed}</div>
                        <p className="text-xs text-muted-foreground">Successfully completed</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <CardTitle>Appointments List</CardTitle>
                            <CardDescription>
                                Total: {filteredAppointments.length} appointment{filteredAppointments.length !== 1 ? 's' : ''}
                            </CardDescription>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <div className="relative w-full sm:w-64">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search appointments..."
                                    className="pl-8"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-full sm:w-[180px]">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="in_progress">In Progress</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date & Time</TableHead>
                                    <TableHead>Patient</TableHead>
                                    <TableHead>Doctor</TableHead>
                                    <TableHead>Reason</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-24 text-center">
                                            Loading...
                                        </TableCell>
                                    </TableRow>
                                ) : filteredAppointments.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-24 text-center">
                                            No appointments found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredAppointments.map((appointment) => {
                                        const { date, time } = formatDateTime(appointment.appointment_date);
                                        return (
                                            <TableRow key={appointment.id} className="cursor-pointer hover:bg-muted/50">
                                                <TableCell>
                                                    <div className="flex flex-col">
                                                        <span className="font-medium">{date}</span>
                                                        <span className="text-sm text-muted-foreground">{time}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col">
                                                        <span className="font-medium">{appointment.patient?.full_name || "N/A"}</span>
                                                        <span className="text-sm text-muted-foreground">
                                                            {appointment.patient?.patient_number || ""}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    Dr. {appointment.doctor?.full_name || "Unassigned"}
                                                </TableCell>
                                                <TableCell className="max-w-xs truncate">
                                                    {appointment.reason || "No reason provided"}
                                                </TableCell>
                                                <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="ghost" size="sm">View</Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Appointments;
