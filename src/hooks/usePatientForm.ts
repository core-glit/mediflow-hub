import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { patientService } from "@/services/patientService";
import { PatientFormData } from "@/types/patient";

const initialFormData: PatientFormData = {
    full_name: "",
    date_of_birth: "",
    age: "",
    sex: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    blood_group: "",
    insurance_company: "",
    insurance_number: "",
    insurance_status: "none",
    patient_type: "outpatient",
};

export const usePatientForm = (onSuccess: () => void) => {
    const [formData, setFormData] = useState<PatientFormData>(initialFormData);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("No user found");

            await patientService.createPatient(formData, user.id);

            toast({
                title: "Patient registered successfully!",
            });

            setFormData(initialFormData);
            onSuccess();
        } catch (error: any) {
            toast({
                title: "Error registering patient",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return { formData, setFormData, loading, handleSubmit };
};
