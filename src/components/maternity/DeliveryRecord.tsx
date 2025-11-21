import { useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export const DeliveryRecord = ({ patientId }: { patientId?: string }) => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, setValue, reset } = useForm();

    const onSubmit = async (data: any) => {
        if (!patientId) {
            toast({
                title: "Error",
                description: "No patient selected",
                variant: "destructive",
            });
            return;
        }

        setLoading(true);
        try {
            const { error } = await (supabase.from("maternity_records") as any).insert({
                patient_id: patientId,
                doctor_id: (await supabase.auth.getUser()).data.user?.id,
                visit_type: "delivery",
                ...data,
            });

            if (error) throw error;

            toast({
                title: "Success",
                description: "Delivery record saved successfully",
            });
            reset();
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Delivery Record</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Delivery Date & Time</Label>
                            <Input type="datetime-local" {...register("delivery_date")} />
                        </div>
                        <div className="space-y-2">
                            <Label>Delivery Method</Label>
                            <Select onValueChange={(val) => setValue("delivery_method", val)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select method" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="vaginal">Vaginal Delivery</SelectItem>
                                    <SelectItem value="c_section">C-Section</SelectItem>
                                    <SelectItem value="assisted">Assisted Delivery</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Baby Weight (kg)</Label>
                            <Input type="number" step="0.01" {...register("baby_weight")} placeholder="e.g., 3.5" />
                        </div>
                        <div className="space-y-2">
                            <Label>Baby Gender</Label>
                            <Select onValueChange={(val) => setValue("baby_gender", val)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Birth Outcome</Label>
                            <Input {...register("birth_outcome")} placeholder="e.g., Live Birth" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Delivery Notes</Label>
                        <Textarea {...register("notes")} placeholder="Complications, procedures, etc." />
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Saving..." : "Save Delivery Record"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};
