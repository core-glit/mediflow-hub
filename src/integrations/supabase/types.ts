export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      admissions: {
        Row: {
          admission_date: string | null
          admission_reason: string | null
          admitted_by: string | null
          bed_number: string | null
          consultation_id: string | null
          created_at: string | null
          discharge_date: string | null
          discharge_reason: string | null
          discharged_by: string | null
          id: string
          patient_id: string
          status: Database["public"]["Enums"]["admission_status"] | null
          updated_at: string | null
          ward_id: string | null
        }
        Insert: {
          admission_date?: string | null
          admission_reason?: string | null
          admitted_by?: string | null
          bed_number?: string | null
          consultation_id?: string | null
          created_at?: string | null
          discharge_date?: string | null
          discharge_reason?: string | null
          discharged_by?: string | null
          id?: string
          patient_id: string
          status?: Database["public"]["Enums"]["admission_status"] | null
          updated_at?: string | null
          ward_id?: string | null
        }
        Update: {
          admission_date?: string | null
          admission_reason?: string | null
          admitted_by?: string | null
          bed_number?: string | null
          consultation_id?: string | null
          created_at?: string | null
          discharge_date?: string | null
          discharge_reason?: string | null
          discharged_by?: string | null
          id?: string
          patient_id?: string
          status?: Database["public"]["Enums"]["admission_status"] | null
          updated_at?: string | null
          ward_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admissions_admitted_by_fkey"
            columns: ["admitted_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admissions_consultation_id_fkey"
            columns: ["consultation_id"]
            isOneToOne: false
            referencedRelation: "consultations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admissions_discharged_by_fkey"
            columns: ["discharged_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admissions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admissions_ward_id_fkey"
            columns: ["ward_id"]
            isOneToOne: false
            referencedRelation: "wards"
            referencedColumns: ["id"]
          },
        ]
      }
      appointments: {
        Row: {
          appointment_date: string
          created_at: string | null
          created_by: string | null
          doctor_id: string | null
          id: string
          notes: string | null
          patient_id: string
          reason: string | null
          status: Database["public"]["Enums"]["consultation_status"] | null
          updated_at: string | null
        }
        Insert: {
          appointment_date: string
          created_at?: string | null
          created_by?: string | null
          doctor_id?: string | null
          id?: string
          notes?: string | null
          patient_id: string
          reason?: string | null
          status?: Database["public"]["Enums"]["consultation_status"] | null
          updated_at?: string | null
        }
        Update: {
          appointment_date?: string
          created_at?: string | null
          created_by?: string | null
          doctor_id?: string | null
          id?: string
          notes?: string | null
          patient_id?: string
          reason?: string | null
          status?: Database["public"]["Enums"]["consultation_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appointments_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      bill_items: {
        Row: {
          bill_id: string
          created_at: string | null
          id: string
          item_name: string
          item_type: string
          quantity: number | null
          total_price: number
          unit_price: number
        }
        Insert: {
          bill_id: string
          created_at?: string | null
          id?: string
          item_name: string
          item_type: string
          quantity?: number | null
          total_price: number
          unit_price: number
        }
        Update: {
          bill_id?: string
          created_at?: string | null
          id?: string
          item_name?: string
          item_type?: string
          quantity?: number | null
          total_price?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "bill_items_bill_id_fkey"
            columns: ["bill_id"]
            isOneToOne: false
            referencedRelation: "bills"
            referencedColumns: ["id"]
          },
        ]
      }
      bills: {
        Row: {
          admission_id: string | null
          bill_number: string
          consultation_id: string | null
          created_at: string | null
          created_by: string | null
          discount: number | null
          id: string
          paid_amount: number
          patient_id: string
          payment_method: Database["public"]["Enums"]["payment_method"] | null
          payment_status: Database["public"]["Enums"]["payment_status"] | null
          total_amount: number
          updated_at: string | null
        }
        Insert: {
          admission_id?: string | null
          bill_number: string
          consultation_id?: string | null
          created_at?: string | null
          created_by?: string | null
          discount?: number | null
          id?: string
          paid_amount?: number
          patient_id: string
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          total_amount?: number
          updated_at?: string | null
        }
        Update: {
          admission_id?: string | null
          bill_number?: string
          consultation_id?: string | null
          created_at?: string | null
          created_by?: string | null
          discount?: number | null
          id?: string
          paid_amount?: number
          patient_id?: string
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          total_amount?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bills_admission_id_fkey"
            columns: ["admission_id"]
            isOneToOne: false
            referencedRelation: "admissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bills_consultation_id_fkey"
            columns: ["consultation_id"]
            isOneToOne: false
            referencedRelation: "consultations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bills_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bills_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      consultations: {
        Row: {
          appointment_id: string | null
          chief_complaint: string | null
          confirmatory_diagnosis: string | null
          consultation_date: string | null
          created_at: string | null
          doctor_id: string
          follow_up_date: string | null
          id: string
          initial_diagnosis: string | null
          patient_id: string
          signs_and_symptoms: string | null
          status: Database["public"]["Enums"]["consultation_status"] | null
          treatment_plan: string | null
          updated_at: string | null
        }
        Insert: {
          appointment_id?: string | null
          chief_complaint?: string | null
          confirmatory_diagnosis?: string | null
          consultation_date?: string | null
          created_at?: string | null
          doctor_id: string
          follow_up_date?: string | null
          id?: string
          initial_diagnosis?: string | null
          patient_id: string
          signs_and_symptoms?: string | null
          status?: Database["public"]["Enums"]["consultation_status"] | null
          treatment_plan?: string | null
          updated_at?: string | null
        }
        Update: {
          appointment_id?: string | null
          chief_complaint?: string | null
          confirmatory_diagnosis?: string | null
          consultation_date?: string | null
          created_at?: string | null
          doctor_id?: string
          follow_up_date?: string | null
          id?: string
          initial_diagnosis?: string | null
          patient_id?: string
          signs_and_symptoms?: string | null
          status?: Database["public"]["Enums"]["consultation_status"] | null
          treatment_plan?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "consultations_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consultations_doctor_id_fkey"
            columns: ["doctor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consultations_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      lab_tests: {
        Row: {
          completed_at: string | null
          consultation_id: string | null
          created_at: string | null
          id: string
          notes: string | null
          patient_id: string
          performed_by: string | null
          requested_at: string | null
          requested_by: string
          results: string | null
          status: Database["public"]["Enums"]["test_status"] | null
          test_name: string
          test_type: string
        }
        Insert: {
          completed_at?: string | null
          consultation_id?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          patient_id: string
          performed_by?: string | null
          requested_at?: string | null
          requested_by: string
          results?: string | null
          status?: Database["public"]["Enums"]["test_status"] | null
          test_name: string
          test_type: string
        }
        Update: {
          completed_at?: string | null
          consultation_id?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          patient_id?: string
          performed_by?: string | null
          requested_at?: string | null
          requested_by?: string
          results?: string | null
          status?: Database["public"]["Enums"]["test_status"] | null
          test_name?: string
          test_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "lab_tests_consultation_id_fkey"
            columns: ["consultation_id"]
            isOneToOne: false
            referencedRelation: "consultations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lab_tests_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lab_tests_performed_by_fkey"
            columns: ["performed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lab_tests_requested_by_fkey"
            columns: ["requested_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      medications: {
        Row: {
          batch_number: string | null
          category: string | null
          created_at: string | null
          expiry_date: string | null
          generic_name: string | null
          id: string
          minimum_stock_level: number | null
          name: string
          quantity_in_stock: number
          unit_price: number
          updated_at: string | null
        }
        Insert: {
          batch_number?: string | null
          category?: string | null
          created_at?: string | null
          expiry_date?: string | null
          generic_name?: string | null
          id?: string
          minimum_stock_level?: number | null
          name: string
          quantity_in_stock?: number
          unit_price: number
          updated_at?: string | null
        }
        Update: {
          batch_number?: string | null
          category?: string | null
          created_at?: string | null
          expiry_date?: string | null
          generic_name?: string | null
          id?: string
          minimum_stock_level?: number | null
          name?: string
          quantity_in_stock?: number
          unit_price?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      patients: {
        Row: {
          address: string | null
          age: number | null
          allergies: string[] | null
          blood_group: string | null
          city: string | null
          country: string | null
          created_at: string | null
          date_of_birth: string | null
          email: string | null
          full_name: string
          hiv_status: string | null
          id: string
          insurance_company: string | null
          insurance_number: string | null
          insurance_status:
            | Database["public"]["Enums"]["insurance_status"]
            | null
          patient_number: string
          patient_type: Database["public"]["Enums"]["patient_type"] | null
          phone: string | null
          registered_by: string | null
          sex: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          age?: number | null
          allergies?: string[] | null
          blood_group?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          full_name: string
          hiv_status?: string | null
          id?: string
          insurance_company?: string | null
          insurance_number?: string | null
          insurance_status?:
            | Database["public"]["Enums"]["insurance_status"]
            | null
          patient_number: string
          patient_type?: Database["public"]["Enums"]["patient_type"] | null
          phone?: string | null
          registered_by?: string | null
          sex?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          age?: number | null
          allergies?: string[] | null
          blood_group?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          full_name?: string
          hiv_status?: string | null
          id?: string
          insurance_company?: string | null
          insurance_number?: string | null
          insurance_status?:
            | Database["public"]["Enums"]["insurance_status"]
            | null
          patient_number?: string
          patient_type?: Database["public"]["Enums"]["patient_type"] | null
          phone?: string | null
          registered_by?: string | null
          sex?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patients_registered_by_fkey"
            columns: ["registered_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pharmacy_sales: {
        Row: {
          created_at: string | null
          id: string
          medication_id: string
          patient_id: string | null
          payment_method: Database["public"]["Enums"]["payment_method"] | null
          prescription_id: string | null
          quantity: number
          sale_date: string | null
          sold_by: string | null
          total_price: number
          unit_price: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          medication_id: string
          patient_id?: string | null
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          prescription_id?: string | null
          quantity: number
          sale_date?: string | null
          sold_by?: string | null
          total_price: number
          unit_price: number
        }
        Update: {
          created_at?: string | null
          id?: string
          medication_id?: string
          patient_id?: string | null
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          prescription_id?: string | null
          quantity?: number
          sale_date?: string | null
          sold_by?: string | null
          total_price?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "pharmacy_sales_medication_id_fkey"
            columns: ["medication_id"]
            isOneToOne: false
            referencedRelation: "medications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pharmacy_sales_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pharmacy_sales_prescription_id_fkey"
            columns: ["prescription_id"]
            isOneToOne: false
            referencedRelation: "prescriptions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pharmacy_sales_sold_by_fkey"
            columns: ["sold_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      prescription_items: {
        Row: {
          created_at: string | null
          dispensed_quantity: number | null
          dosage: string
          duration: string
          frequency: string
          id: string
          instructions: string | null
          medication_name: string
          prescription_id: string
          quantity: number
        }
        Insert: {
          created_at?: string | null
          dispensed_quantity?: number | null
          dosage: string
          duration: string
          frequency: string
          id?: string
          instructions?: string | null
          medication_name: string
          prescription_id: string
          quantity: number
        }
        Update: {
          created_at?: string | null
          dispensed_quantity?: number | null
          dosage?: string
          duration?: string
          frequency?: string
          id?: string
          instructions?: string | null
          medication_name?: string
          prescription_id?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "prescription_items_prescription_id_fkey"
            columns: ["prescription_id"]
            isOneToOne: false
            referencedRelation: "prescriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      prescriptions: {
        Row: {
          consultation_id: string | null
          created_at: string | null
          id: string
          notes: string | null
          patient_id: string
          prescribed_at: string | null
          prescribed_by: string
          status: Database["public"]["Enums"]["prescription_status"] | null
        }
        Insert: {
          consultation_id?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          patient_id: string
          prescribed_at?: string | null
          prescribed_by: string
          status?: Database["public"]["Enums"]["prescription_status"] | null
        }
        Update: {
          consultation_id?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          patient_id?: string
          prescribed_at?: string | null
          prescribed_by?: string
          status?: Database["public"]["Enums"]["prescription_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "prescriptions_consultation_id_fkey"
            columns: ["consultation_id"]
            isOneToOne: false
            referencedRelation: "consultations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prescriptions_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prescriptions_prescribed_by_fkey"
            columns: ["prescribed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          created_at: string | null
          email: string | null
          full_name: string
          id: string
          phone: string | null
          role: Database["public"]["Enums"]["staff_role"]
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          full_name: string
          id: string
          phone?: string | null
          role: Database["public"]["Enums"]["staff_role"]
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string
          id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["staff_role"]
          updated_at?: string | null
        }
        Relationships: []
      }
      vitals: {
        Row: {
          blood_pressure: string | null
          id: string
          patient_id: string
          pulse: number | null
          recorded_at: string | null
          recorded_by: string | null
          respiratory_rate: number | null
          temperature: number | null
          weight: number | null
        }
        Insert: {
          blood_pressure?: string | null
          id?: string
          patient_id: string
          pulse?: number | null
          recorded_at?: string | null
          recorded_by?: string | null
          respiratory_rate?: number | null
          temperature?: number | null
          weight?: number | null
        }
        Update: {
          blood_pressure?: string | null
          id?: string
          patient_id?: string
          pulse?: number | null
          recorded_at?: string | null
          recorded_by?: string | null
          respiratory_rate?: number | null
          temperature?: number | null
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "vitals_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vitals_recorded_by_fkey"
            columns: ["recorded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      wards: {
        Row: {
          available_beds: number
          created_at: string | null
          id: string
          name: string
          total_beds: number
          updated_at: string | null
          ward_type: string | null
        }
        Insert: {
          available_beds: number
          created_at?: string | null
          id?: string
          name: string
          total_beds: number
          updated_at?: string | null
          ward_type?: string | null
        }
        Update: {
          available_beds?: number
          created_at?: string | null
          id?: string
          name?: string
          total_beds?: number
          updated_at?: string | null
          ward_type?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      admission_status: "admitted" | "discharged" | "deceased" | "referred"
      consultation_status: "pending" | "in_progress" | "completed" | "cancelled"
      insurance_status: "none" | "active" | "expired"
      patient_type: "outpatient" | "inpatient"
      payment_method: "cash" | "credit" | "insurance" | "deposit"
      payment_status: "paid" | "partial" | "pending" | "overdue"
      prescription_status: "pending" | "dispensed" | "partial"
      staff_role:
        | "admin"
        | "doctor"
        | "nurse"
        | "lab_tech"
        | "pharmacist"
        | "cashier"
        | "receptionist"
        | "security"
      test_status:
        | "requested"
        | "paid"
        | "in_progress"
        | "completed"
        | "cancelled"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      admission_status: ["admitted", "discharged", "deceased", "referred"],
      consultation_status: ["pending", "in_progress", "completed", "cancelled"],
      insurance_status: ["none", "active", "expired"],
      patient_type: ["outpatient", "inpatient"],
      payment_method: ["cash", "credit", "insurance", "deposit"],
      payment_status: ["paid", "partial", "pending", "overdue"],
      prescription_status: ["pending", "dispensed", "partial"],
      staff_role: [
        "admin",
        "doctor",
        "nurse",
        "lab_tech",
        "pharmacist",
        "cashier",
        "receptionist",
        "security",
      ],
      test_status: [
        "requested",
        "paid",
        "in_progress",
        "completed",
        "cancelled",
      ],
    },
  },
} as const
