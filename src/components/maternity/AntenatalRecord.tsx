import { useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export const AntenatalRecord = ({ patientId }: { patientId?: string }) => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset } = useForm();

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
                visit_type: "antenatal",
                ...data,
            });

            if (error) throw error;

            toast({
                title: "Success",
                description: "Antenatal record saved successfully",
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
                <CardTitle>Antenatal Visit Record</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Gestational Age (Weeks)</Label>
                            <Input type="number" {...register("gestational_age_weeks")} placeholder="e.g., 24" />
                        </div>
                        <div className="space-y-2">
                            <Label>Weight (kg)</Label>
                            <Input type="number" step="0.1" {...register("weight")} placeholder="e.g., 65.5" />
                        </div>
                        <div className="space-y-2">
                            <Label>Blood Pressure</Label>
                            <Input {...register("blood_pressure")} placeholder="120/80" />
                        </div>
                        <div className="space-y-2">
                            <Label>Fetal Heart Rate (bpm)</Label>
                            <Input type="number" {...register("fetal_heart_rate")} placeholder="e.g., 140" />
                        </div>
                        <div className="space-y-2">
                            <Label>Fundal Height (cm)</Label>
                            <Input type="number" step="0.1" {...register("fundal_height")} placeholder="e.g., 24" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Notes / Observations</Label>
                        <Textarea {...register("notes")} placeholder="Enter clinical notes..." />
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Saving..." : "Save Record"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};
