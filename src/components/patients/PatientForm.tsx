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
    full_name: z.string().min(2, "Full name must be at least 2 characters"),
    date_of_birth: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid date"),
    sex: z.enum(["Male", "Female", "Other"]),
    phone: z.string().min(9, "Phone number must be at least 9 digits"),
    address: z.string().optional(),
    city: z.string().optional(),
    insurance_company: z.string().optional(),
    insurance_number: z.string().optional(),
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
            full_name: "",
            date_of_birth: "",
            sex: "Male",
            phone: "",
            address: "",
            city: "",
            insurance_company: "",
            insurance_number: "",
        },
    });

    const onSubmit = async (values: PatientFormValues) => {
        try {
            // Generate a simple patient number (in a real app, this might be more complex or DB generated)
            const patientNumber = `PCC-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

            // Calculate age from date of birth
            const age = new Date().getFullYear() - new Date(values.date_of_birth).getFullYear();

            // Insert patient data matching the database schema
            const { error } = await supabase
                .from("patients")
                .insert({
                    patient_number: patientNumber,
                    full_name: values.full_name,
                    date_of_birth: values.date_of_birth,
                    age: age,
                    sex: values.sex,
                    phone: values.phone,
                    address: values.address || null,
                    city: values.city || null,
                    insurance_company: values.insurance_company || null,
                    insurance_number: values.insurance_number || null,
                    insurance_status: values.insurance_company ? 'active' : 'none',
                } as any);

            if (error) throw error;

            toast({
                title: "Patient Registered",
                description: `Successfully registered ${values.full_name}`,
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
                <FormField
                    control={form.control}
                    name="full_name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

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
                        name="sex"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Sex</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select sex" />
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="Street address" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input placeholder="City" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="insurance_company"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Insurance Company (Optional)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Company Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="insurance_number"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Insurance Number (Optional)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Policy Number" {...field} />
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