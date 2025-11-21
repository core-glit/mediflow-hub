import { useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export const OpticalExamForm = ({ patientId }: { patientId?: string }) => {
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
            const { error } = await (supabase.from("optical_records") as any).insert({
                patient_id: patientId,
                doctor_id: (await supabase.auth.getUser()).data.user?.id,
                ...data,
            });

            if (error) throw error;

            toast({
                title: "Success",
                description: "Optical exam recorded successfully",
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
                <CardTitle>New Optical Exam</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <h3 className="font-semibold">Visual Acuity (Distance)</h3>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <Label>OD (Right)</Label>
                                    <Input {...register("visual_acuity_od_distance")} placeholder="20/20" />
                                </div>
                                <div>
                                    <Label>OS (Left)</Label>
                                    <Input {...register("visual_acuity_os_distance")} placeholder="20/20" />
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-semibold">Visual Acuity (Near)</h3>
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <Label>OD (Right)</Label>
                                    <Input {...register("visual_acuity_od_near")} placeholder="J1" />
                                </div>
                                <div>
                                    <Label>OS (Left)</Label>
                                    <Input {...register("visual_acuity_os_near")} placeholder="J1" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h3 className="font-semibold">Prescription</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Right Eye (OD)</Label>
                                <div className="grid grid-cols-4 gap-2">
                                    <Input {...register("prescription_od_sphere")} placeholder="Sph" />
                                    <Input {...register("prescription_od_cylinder")} placeholder="Cyl" />
                                    <Input {...register("prescription_od_axis")} placeholder="Axis" />
                                    <Input {...register("prescription_od_add")} placeholder="Add" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Left Eye (OS)</Label>
                                <div className="grid grid-cols-4 gap-2">
                                    <Input {...register("prescription_os_sphere")} placeholder="Sph" />
                                    <Input {...register("prescription_os_cylinder")} placeholder="Cyl" />
                                    <Input {...register("prescription_os_axis")} placeholder="Axis" />
                                    <Input {...register("prescription_os_add")} placeholder="Add" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>PD (Pupillary Distance)</Label>
                            <Input {...register("pd_distance")} placeholder="mm" />
                        </div>
                        <div className="space-y-2">
                            <Label>Next Visit Date</Label>
                            <Input type="date" {...register("next_visit_date")} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Notes</Label>
                        <Textarea {...register("notes")} placeholder="Clinical notes..." />
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Saving..." : "Save Record"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};
