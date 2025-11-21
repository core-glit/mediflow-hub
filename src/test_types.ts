import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

// This is the proper type for inserting into patients table
type PatientInsert = Database["public"]["Tables"]["patients"]["Insert"];

const testPatient: PatientInsert = {
    patient_number: "PAT202311001",
    full_name: "John Doe",
    date_of_birth: "2000-01-01",
    sex: "Male",
    phone: "1234567890",
    address: "123 Main St",
    insurance_company: "Provider",
    insurance_number: "INS123"
};

async function testInsert() {
    // The issue: Supabase client types are inferring 'never' for the insert
    // This happens when there's a type mismatch or the types aren't properly loaded

    // Solution 1: Cast to any (what we did in patientService.ts)
    const { data: data1, error: error1 } = await (supabase.from("patients") as any).insert([testPatient]);

    // Solution 2: Cast to any (same as Solution 1, but more explicit)
    const { data: data2, error: error2 } = await (supabase
        .from("patients") as any)
        .insert([testPatient]);

    // The root cause is likely that the Supabase types were generated incorrectly
    // or there's a version mismatch between @supabase/supabase-js and the types
}
