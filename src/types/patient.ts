export interface Patient {
    id: string;
    patient_number: string;
    full_name: string;
    age: number | null;
    sex: string | null;
    phone: string | null;
    insurance_status: string;
    patient_type: string;
    created_at: string;
    // Add other fields as optional if they might be missing in some queries
    email?: string | null;
    address?: string | null;
    city?: string | null;
    blood_group?: string | null;
    insurance_company?: string | null;
    insurance_number?: string | null;
    date_of_birth?: string | null;
}

export interface PatientFormData {
    full_name: string;
    date_of_birth: string;
    age: string;
    sex: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    blood_group: string;
    insurance_company: string;
    insurance_number: string;
    insurance_status: "none" | "active" | "expired";
    patient_type: "outpatient" | "inpatient";
}
