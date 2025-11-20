import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

const appointmentSchema = z.object({
    patient_id: z.string().min(1, "Please select a patient"),
    doctor_id: z.string().min(1, "Please select a doctor"),
    appointment_date: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid date"),
    appointment_time: z.string().min(1, "Please enter a time"),
    reason: z.string().min(5, "Reason must be at least 5 characters"),
    notes: z.string().optional(),
});

type AppointmentFormValues = z.infer<typeof appointmentSchema>;

interface AppointmentFormProps {
    onSuccess?: () => void;
}

export function AppointmentForm({ onSuccess }: AppointmentFormProps) {
    const { toast } = useToast();
    const [patients, setPatients] = useState<any[]>([]);
    const [doctors, setDoctors] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const form = useForm<AppointmentFormValues>({
        resolver: zodResolver(appointmentSchema),
        defaultValues: {
            patient_id: "",
            doctor_id: "",
            appointment_date: "",
            appointment_time: "",
            reason: "",
            notes: "",
        },
    });

    useEffect(() => {
        fetchPatientsAndDoctors();
    }, []);

    const fetchPatientsAndDoctors = async () => {
        try {
            setLoading(true);

            // Fetch patients
            const { data: patientsData, error: patientsError } = await supabase
                .from("patients")
                .select("id, full_name, patient_number")
                .order("full_name");

            if (patientsError) throw patientsError;

            // Fetch doctors (profiles with role='doctor')
            const { data: doctorsData, error: doctorsError } = await supabase
                .from("profiles")
                .select("id, full_name")
                .eq("role", "doctor")
                .order("full_name");

            if (doctorsError) throw doctorsError;

            setPatients(patientsData || []);
            setDoctors(doctorsData || []);
        } catch (error: any) {
            toast({
                title: "Error loading data",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = async (values: AppointmentFormValues) => {
        try {
            // Combine date and time into a single timestamp
            const appointmentDateTime = new Date(`${values.appointment_date}T${values.appointment_time}`);

            // Get current user
            const { data: { user } } = await supabase.auth.getUser();

            const { error } = await supabase
                .from("appointments")
                .insert({
                    patient_id: values.patient_id,
                    doctor_id: values.doctor_id,
                    appointment_date: appointmentDateTime.toISOString(),
                    reason: values.reason,
                    notes: values.notes || null,
                    status: 'pending',
                    created_by: user?.id,
                } as any);

            if (error) throw error;

            toast({
                title: "Appointment Scheduled",
                description: "The appointment has been successfully scheduled.",
            });

            form.reset();
            if (onSuccess) onSuccess();
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        }
    };

    if (loading) {
        return <div className="text-center py-4">Loading...</div>;
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="patient_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Patient</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a patient" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {patients.map((patient) => (
                                        <SelectItem key={patient.id} value={patient.id}>
                                            {patient.full_name} ({patient.patient_number})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="doctor_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Doctor</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a doctor" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {doctors.map((doctor) => (
                                        <SelectItem key={doctor.id} value={doctor.id}>
                                            Dr. {doctor.full_name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="appointment_date"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Date</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="appointment_time"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Time</FormLabel>
                                <FormControl>
                                    <Input type="time" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="reason"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Reason for Visit</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Describe the reason for this appointment..."
                                    className="resize-none"
                                    rows={3}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Additional Notes (Optional)</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Any additional information..."
                                    className="resize-none"
                                    rows={2}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full">Schedule Appointment</Button>
            </form>
        </Form>
    );
}
