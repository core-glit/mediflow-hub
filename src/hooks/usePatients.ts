import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { patientService } from "@/services/patientService";
import { Patient } from "@/types/patient";

export const usePatients = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    const fetchPatients = async () => {
        try {
            const data = await patientService.getPatients();
            setPatients(data);
        } catch (error: any) {
            toast({
                title: "Error fetching patients",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const checkAuthAndFetch = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                fetchPatients();
            }
        };
        checkAuthAndFetch();
    }, []);

    return { patients, loading, fetchPatients };
};
