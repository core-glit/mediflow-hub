import { supabase } from "@/integrations/supabase/client";
import { Patient, PatientFormData } from "@/types/patient";

export const patientService = {
    async getPatients() {
        const { data, error } = await supabase
            .from("patients")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) throw error;
        return data as Patient[];
    },

    async createPatient(patientData: PatientFormData, userId: string) {
        const { error } = await supabase.from("patients").insert([
            {
                patient_number: generatePatientNumber(),
                full_name: patientData.full_name,
                date_of_birth: patientData.date_of_birth || null,
                age: patientData.age ? parseInt(patientData.age) : null,
                sex: patientData.sex || null,
                phone: patientData.phone || null,
                email: patientData.email || null,
                address: patientData.address || null,
                city: patientData.city || null,
                blood_group: patientData.blood_group || null,
                insurance_company: patientData.insurance_company || null,
                insurance_number: patientData.insurance_number || null,
                insurance_status: patientData.insurance_status,
                patient_type: patientData.patient_type,
                registered_by: userId,
            },
        ]);

        if (error) throw error;
    },
};

const generatePatientNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
    return `PAT${year}${month}${random}`;
};
