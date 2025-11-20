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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const patientSchema = z.object({
    first_name: z.string().min(2, "First name must be at least 2 characters"),
    last_name: z.string().min(2, "Last name must be at least 2 characters"),
    date_of_birth: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid date"),
    gender: z.enum(["Male", "Female", "Other"]),
    phone: z.string().min(9, "Phone number must be at least 9 digits"),
    address: z.string().optional(),
    insurance_provider: z.string().optional(),
    insurance_id: z.string().optional(),
    emergency_contact_name: z.string().optional(),
    emergency_contact_phone: z.string().optional(),
});

type PatientFormValues = z.infer<typeof patientSchema>;

interface PatientFormProps {
    onSuccess?: () => void;
}

export function PatientForm({ onSuccess }: PatientFormProps) {
    const { toast } = useToast();
    const form = useForm<PatientFormValues>({
        resolver: zodResolver(patientSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            date_of_birth: "",
            gender: "Male",
            phone: "",
            address: "",
            insurance_provider: "",
            insurance_id: "",
            emergency_contact_name: "",
            emergency_contact_phone: "",
        },
    });

    const onSubmit = async (values: PatientFormValues) => {
        try {
            // Generate a simple patient ID (in a real app, this might be more complex or DB generated)
            const patientId = `PCC-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

            // Insert patient data - excluding emergency contact fields that don't exist in DB yet
            const { error } = await supabase
                .from("patients")
                .insert({
                    patient_id: patientId,
                    first_name: values.first_name,
                    last_name: values.last_name,
                    date_of_birth: values.date_of_birth,
                    gender: values.gender,
                    phone: values.phone,
                    address: values.address || null,
                    insurance_provider: values.insurance_provider || null,
                    insurance_id: values.insurance_id || null,
                } as any);

            if (error) throw error;

            toast({
                title: "Patient Registered",
                description: `Successfully registered ${values.first_name} ${values.last_name}`,
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

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="first_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="last_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="date_of_birth"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Date of Birth</FormLabel>
                                <FormControl>
                                    <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Gender</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Male">Male</SelectItem>
                                        <SelectItem value="Female">Female</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                <Input placeholder="+237..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Input placeholder="City, Street..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="insurance_provider"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Insurance Provider (Optional)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Provider Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="insurance_id"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Insurance ID (Optional)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Policy Number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="emergency_contact_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Emergency Contact Name (Optional)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="emergency_contact_phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Emergency Contact Phone (Optional)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Phone" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button type="submit" className="w-full">Register Patient</Button>
            </form>
        </Form>
    );
}