export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          department: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          department?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          department?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      patients: {
        Row: {
          id: string
          patient_number: string
          full_name: string
          date_of_birth: string | null
          age: number | null
          sex: string | null
          phone: string | null
          email: string | null
          address: string | null
          city: string | null
          country: string | null
          blood_group: string | null
          hiv_status: string | null
          allergies: string[] | null
          insurance_company: string | null
          insurance_number: string | null
          insurance_status: string | null
          patient_type: string | null
          registered_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          patient_number: string
          full_name: string
          date_of_birth?: string | null
          age?: number | null
          sex?: string | null
          phone?: string | null
          email?: string | null
          address?: string | null
          city?: string | null
          country?: string | null
          blood_group?: string | null
          hiv_status?: string | null
          allergies?: string[] | null
          insurance_company?: string | null
          insurance_number?: string | null
          insurance_status?: string | null
          patient_type?: string | null
          registered_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          patient_number?: string
          full_name?: string
          date_of_birth?: string | null
          age?: number | null
          sex?: string | null
          phone?: string | null
          email?: string | null
          address?: string | null
          city?: string | null
          country?: string | null
          blood_group?: string | null
          hiv_status?: string | null
          allergies?: string[] | null
          insurance_company?: string | null
          insurance_number?: string | null
          insurance_status?: string | null
          patient_type?: string | null
          registered_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      medical_records: {
        Row: {
          id: string
          patient_id: string
          blood_group: string | null
          allergies: string[] | null
          chronic_conditions: string[] | null
          hiv_status: string | null
          past_surgeries: string | null
          family_history: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          blood_group?: string | null
          allergies?: string[] | null
          chronic_conditions?: string[] | null
          hiv_status?: string | null
          past_surgeries?: string | null
          family_history?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          patient_id?: string
          blood_group?: string | null
          allergies?: string[] | null
          chronic_conditions?: string[] | null
          hiv_status?: string | null
          past_surgeries?: string | null
          family_history?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      vitals: {
        Row: {
          id: string
          patient_id: string
          recorded_by: string | null
          temperature: number | null
          blood_pressure_systolic: number | null
          blood_pressure_diastolic: number | null
          pulse_rate: number | null
          respiratory_rate: number | null
          weight: number | null
          height: number | null
          bmi: number | null
          oxygen_saturation: number | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          recorded_by?: string | null
          temperature?: number | null
          blood_pressure_systolic?: number | null
          blood_pressure_diastolic?: number | null
          pulse_rate?: number | null
          respiratory_rate?: number | null
          weight?: number | null
          height?: number | null
          bmi?: number | null
          oxygen_saturation?: number | null
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          patient_id?: string
          recorded_by?: string | null
          temperature?: number | null
          blood_pressure_systolic?: number | null
          blood_pressure_diastolic?: number | null
          pulse_rate?: number | null
          respiratory_rate?: number | null
          weight?: number | null
          height?: number | null
          bmi?: number | null
          oxygen_saturation?: number | null
          notes?: string | null
          created_at?: string
        }
      }
      appointments: {
        Row: {
          id: string
          patient_id: string
          doctor_id: string | null
          appointment_date: string
          status: Database["public"]["Enums"]["appointment_status"] | null
          type: Database["public"]["Enums"]["appointment_type"] | null
          reason: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          doctor_id?: string | null
          appointment_date: string
          status?: Database["public"]["Enums"]["appointment_status"] | null
          type?: Database["public"]["Enums"]["appointment_type"] | null
          reason?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          patient_id?: string
          doctor_id?: string | null
          appointment_date?: string
          status?: Database["public"]["Enums"]["appointment_status"] | null
          type?: Database["public"]["Enums"]["appointment_type"] | null
          reason?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      consultations: {
        Row: {
          id: string
          appointment_id: string | null
          patient_id: string
          doctor_id: string
          chief_complaint: string | null
          signs_and_symptoms: string | null
          physical_examination: string | null
          diagnosis_initial: string | null
          diagnosis_confirmatory: string | null
          treatment_plan: string | null
          doctor_notes: string | null
          follow_up_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          appointment_id?: string | null
          patient_id: string
          doctor_id: string
          chief_complaint?: string | null
          signs_and_symptoms?: string | null
          physical_examination?: string | null
          diagnosis_initial?: string | null
          diagnosis_confirmatory?: string | null
          treatment_plan?: string | null
          doctor_notes?: string | null
          follow_up_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          appointment_id?: string | null
          patient_id?: string
          doctor_id?: string
          chief_complaint?: string | null
          signs_and_symptoms?: string | null
          physical_examination?: string | null
          diagnosis_initial?: string | null
          diagnosis_confirmatory?: string | null
          treatment_plan?: string | null
          doctor_notes?: string | null
          follow_up_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      billing: {
        Row: {
          id: string
          patient_id: string
          invoice_number: string
          items: Json
          total_amount: number
          paid_amount: number | null
          balance_amount: number | null
          payment_status: Database["public"]["Enums"]["payment_status"] | null
          payment_method: Database["public"]["Enums"]["payment_method"] | null
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          invoice_number: string
          items: Json
          total_amount: number
          paid_amount?: number | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          patient_id?: string
          invoice_number?: string
          items?: Json
          total_amount?: number
          paid_amount?: number | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      lab_requests: {
        Row: {
          id: string
          consultation_id: string | null
          patient_id: string
          doctor_id: string
          test_type: string
          test_category: string | null
          status: Database["public"]["Enums"]["lab_status"] | null
          bill_id: string | null
          results_data: Json | null
          result_notes: string | null
          image_urls: string[] | null
          performed_by: string | null
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          consultation_id?: string | null
          patient_id: string
          doctor_id: string
          test_type: string
          test_category?: string | null
          status?: Database["public"]["Enums"]["lab_status"] | null
          bill_id?: string | null
          results_data?: Json | null
          result_notes?: string | null
          image_urls?: string[] | null
          performed_by?: string | null
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          consultation_id?: string | null
          patient_id?: string
          doctor_id?: string
          test_type?: string
          test_category?: string | null
          status?: Database["public"]["Enums"]["lab_status"] | null
          bill_id?: string | null
          results_data?: Json | null
          result_notes?: string | null
          image_urls?: string[] | null
          performed_by?: string | null
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      pharmacy_inventory: {
        Row: {
          id: string
          drug_name: string
          generic_name: string | null
          category: string | null
          strength: string | null
          form: string | null
          stock_level: number | null
          reorder_level: number | null
          unit_price: number
          expiry_date: string | null
          batch_number: string | null
          supplier: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          drug_name: string
          generic_name?: string | null
          category?: string | null
          strength?: string | null
          form?: string | null
          stock_level?: number | null
          reorder_level?: number | null
          unit_price: number
          expiry_date?: string | null
          batch_number?: string | null
          supplier?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          drug_name?: string
          generic_name?: string | null
          category?: string | null
          strength?: string | null
          form?: string | null
          stock_level?: number | null
          reorder_level?: number | null
          unit_price?: number
          expiry_date?: string | null
          batch_number?: string | null
          supplier?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      prescriptions: {
        Row: {
          id: string
          consultation_id: string | null
          patient_id: string
          doctor_id: string
          medications: Json
          notes: string | null
          status: string | null
          created_at: string
        }
        Insert: {
          id?: string
          consultation_id?: string | null
          patient_id: string
          doctor_id: string
          medications: Json
          notes?: string | null
          status?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          consultation_id?: string | null
          patient_id?: string
          doctor_id?: string
          medications?: Json
          notes?: string | null
          status?: string | null
          created_at?: string
        }
      }
      pharmacy_sales: {
        Row: {
          id: string
          prescription_id: string | null
          patient_id: string | null
          bill_id: string | null
          items_dispensed: Json
          dispensed_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          prescription_id?: string | null
          patient_id?: string | null
          bill_id?: string | null
          items_dispensed: Json
          dispensed_by?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          prescription_id?: string | null
          patient_id?: string | null
          bill_id?: string | null
          items_dispensed?: Json
          dispensed_by?: string | null
          created_at?: string
        }
      }
      wards: {
        Row: {
          id: string
          name: string
          type: Database["public"]["Enums"]["ward_type"] | null
          capacity: number
          gender_restriction: string | null
          floor_number: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          type?: Database["public"]["Enums"]["ward_type"] | null
          capacity: number
          gender_restriction?: string | null
          floor_number?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: Database["public"]["Enums"]["ward_type"] | null
          capacity?: number
          gender_restriction?: string | null
          floor_number?: string | null
          created_at?: string
        }
      }
      beds: {
        Row: {
          id: string
          ward_id: string
          bed_number: string
          is_occupied: boolean | null
          current_admission_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          ward_id: string
          bed_number: string
          is_occupied?: boolean | null
          current_admission_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          ward_id?: string
          bed_number?: string
          is_occupied?: boolean | null
          current_admission_id?: string | null
          created_at?: string
        }
      }
      admissions: {
        Row: {
          id: string
          patient_id: string
          doctor_id: string
          ward_id: string
          bed_id: string
          admission_date: string
          discharge_date: string | null
          status: Database["public"]["Enums"]["admission_status"] | null
          diagnosis_at_admission: string | null
          discharge_summary: string | null
          discharge_reason: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          doctor_id: string
          ward_id: string
          bed_id: string
          admission_date?: string
          discharge_date?: string | null
          status?: Database["public"]["Enums"]["admission_status"] | null
          diagnosis_at_admission?: string | null
          discharge_summary?: string | null
          discharge_reason?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          patient_id?: string
          doctor_id?: string
          ward_id?: string
          bed_id?: string
          admission_date?: string
          discharge_date?: string | null
          status?: Database["public"]["Enums"]["admission_status"] | null
          diagnosis_at_admission?: string | null
          discharge_summary?: string | null
          discharge_reason?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Enums: {
      user_role: 'admin' | 'doctor' | 'nurse' | 'cashier' | 'pharmacist' | 'lab_tech' | 'receptionist' | 'security'
      appointment_status: 'scheduled' | 'checked_in' | 'in_progress' | 'completed' | 'cancelled' | 'missed'
      appointment_type: 'consultation' | 'follow_up' | 'checkup' | 'emergency'
      payment_status: 'pending' | 'partial' | 'paid' | 'debt' | 'waived'
      payment_method: 'cash' | 'insurance' | 'mobile_money' | 'card'
      lab_status: 'pending_payment' | 'paid' | 'sample_collected' | 'processing' | 'completed' | 'cancelled'
      ward_type: 'general' | 'maternity' | 'pediatric' | 'surgical' | 'icu' | 'private'
      admission_status: 'admitted' | 'discharged' | 'transferred' | 'deceased'
    }
  }
}
