-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE public.patient_type AS ENUM ('outpatient', 'inpatient');
CREATE TYPE public.insurance_status AS ENUM ('none', 'active', 'expired');
CREATE TYPE public.consultation_status AS ENUM ('pending', 'in_progress', 'completed', 'cancelled');
CREATE TYPE public.admission_status AS ENUM ('admitted', 'discharged', 'deceased', 'referred');
CREATE TYPE public.payment_status AS ENUM ('paid', 'partial', 'pending', 'overdue');
CREATE TYPE public.payment_method AS ENUM ('cash', 'credit', 'insurance', 'deposit');
CREATE TYPE public.staff_role AS ENUM ('admin', 'doctor', 'nurse', 'lab_tech', 'pharmacist', 'cashier', 'receptionist', 'security');
CREATE TYPE public.test_status AS ENUM ('requested', 'paid', 'in_progress', 'completed', 'cancelled');
CREATE TYPE public.prescription_status AS ENUM ('pending', 'dispensed', 'partial');

-- Create profiles table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  role staff_role NOT NULL,
  phone TEXT,
  email TEXT,
  address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create patients table
CREATE TABLE public.patients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_number TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  date_of_birth DATE,
  age INTEGER,
  sex TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  city TEXT,
  country TEXT DEFAULT 'Cameroon',
  blood_group TEXT,
  hiv_status TEXT,
  allergies TEXT[],
  insurance_company TEXT,
  insurance_number TEXT,
  insurance_status insurance_status DEFAULT 'none',
  patient_type patient_type DEFAULT 'outpatient',
  registered_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create vitals table
CREATE TABLE public.vitals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  weight DECIMAL(5,2),
  temperature DECIMAL(4,2),
  blood_pressure TEXT,
  pulse INTEGER,
  respiratory_rate INTEGER,
  recorded_by UUID REFERENCES public.profiles(id),
  recorded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create appointments table
CREATE TABLE public.appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  doctor_id UUID REFERENCES public.profiles(id),
  appointment_date TIMESTAMPTZ NOT NULL,
  reason TEXT,
  status consultation_status DEFAULT 'pending',
  notes TEXT,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create consultations table
CREATE TABLE public.consultations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  doctor_id UUID NOT NULL REFERENCES public.profiles(id),
  appointment_id UUID REFERENCES public.appointments(id),
  chief_complaint TEXT,
  signs_and_symptoms TEXT,
  initial_diagnosis TEXT,
  confirmatory_diagnosis TEXT,
  treatment_plan TEXT,
  follow_up_date DATE,
  status consultation_status DEFAULT 'in_progress',
  consultation_date TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create lab tests table
CREATE TABLE public.lab_tests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  consultation_id UUID REFERENCES public.consultations(id),
  test_name TEXT NOT NULL,
  test_type TEXT NOT NULL,
  requested_by UUID NOT NULL REFERENCES public.profiles(id),
  performed_by UUID REFERENCES public.profiles(id),
  status test_status DEFAULT 'requested',
  results TEXT,
  notes TEXT,
  requested_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create prescriptions table
CREATE TABLE public.prescriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  consultation_id UUID REFERENCES public.consultations(id),
  prescribed_by UUID NOT NULL REFERENCES public.profiles(id),
  status prescription_status DEFAULT 'pending',
  notes TEXT,
  prescribed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create prescription items table
CREATE TABLE public.prescription_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  prescription_id UUID NOT NULL REFERENCES public.prescriptions(id) ON DELETE CASCADE,
  medication_name TEXT NOT NULL,
  dosage TEXT NOT NULL,
  frequency TEXT NOT NULL,
  duration TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  dispensed_quantity INTEGER DEFAULT 0,
  instructions TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create wards table
CREATE TABLE public.wards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  ward_type TEXT,
  total_beds INTEGER NOT NULL,
  available_beds INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create admissions table
CREATE TABLE public.admissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  consultation_id UUID REFERENCES public.consultations(id),
  ward_id UUID REFERENCES public.wards(id),
  bed_number TEXT,
  admission_date TIMESTAMPTZ DEFAULT NOW(),
  discharge_date TIMESTAMPTZ,
  admission_reason TEXT,
  discharge_reason TEXT,
  status admission_status DEFAULT 'admitted',
  admitted_by UUID REFERENCES public.profiles(id),
  discharged_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create billing table
CREATE TABLE public.bills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bill_number TEXT UNIQUE NOT NULL,
  patient_id UUID NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  consultation_id UUID REFERENCES public.consultations(id),
  admission_id UUID REFERENCES public.admissions(id),
  total_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  paid_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  discount DECIMAL(10,2) DEFAULT 0,
  payment_method payment_method,
  payment_status payment_status DEFAULT 'pending',
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create bill items table
CREATE TABLE public.bill_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bill_id UUID NOT NULL REFERENCES public.bills(id) ON DELETE CASCADE,
  item_name TEXT NOT NULL,
  item_type TEXT NOT NULL,
  quantity INTEGER DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create medications table (pharmacy inventory)
CREATE TABLE public.medications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  generic_name TEXT,
  category TEXT,
  unit_price DECIMAL(10,2) NOT NULL,
  quantity_in_stock INTEGER NOT NULL DEFAULT 0,
  minimum_stock_level INTEGER DEFAULT 10,
  expiry_date DATE,
  batch_number TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create pharmacy sales table
CREATE TABLE public.pharmacy_sales (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id UUID REFERENCES public.patients(id),
  prescription_id UUID REFERENCES public.prescriptions(id),
  medication_id UUID NOT NULL REFERENCES public.medications(id),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  payment_method payment_method,
  sold_by UUID REFERENCES public.profiles(id),
  sale_date TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lab_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prescription_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bill_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pharmacy_sales ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Profiles: Users can view all profiles, update own profile
CREATE POLICY "Authenticated users can view all profiles"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Patients: All authenticated users can manage patients
CREATE POLICY "Authenticated users can view patients"
  ON public.patients FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create patients"
  ON public.patients FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update patients"
  ON public.patients FOR UPDATE
  TO authenticated
  USING (true);

-- Similar policies for other tables (all authenticated users can access)
CREATE POLICY "Authenticated users can view vitals"
  ON public.vitals FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can create vitals"
  ON public.vitals FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can view appointments"
  ON public.appointments FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can create appointments"
  ON public.appointments FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update appointments"
  ON public.appointments FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can view consultations"
  ON public.consultations FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can create consultations"
  ON public.consultations FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update consultations"
  ON public.consultations FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can view lab tests"
  ON public.lab_tests FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can create lab tests"
  ON public.lab_tests FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update lab tests"
  ON public.lab_tests FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can view prescriptions"
  ON public.prescriptions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can create prescriptions"
  ON public.prescriptions FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update prescriptions"
  ON public.prescriptions FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can view prescription items"
  ON public.prescription_items FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can create prescription items"
  ON public.prescription_items FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can view wards"
  ON public.wards FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can create wards"
  ON public.wards FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update wards"
  ON public.wards FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can view admissions"
  ON public.admissions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can create admissions"
  ON public.admissions FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update admissions"
  ON public.admissions FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can view bills"
  ON public.bills FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can create bills"
  ON public.bills FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update bills"
  ON public.bills FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can view bill items"
  ON public.bill_items FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can create bill items"
  ON public.bill_items FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can view medications"
  ON public.medications FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can create medications"
  ON public.medications FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update medications"
  ON public.medications FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can view pharmacy sales"
  ON public.pharmacy_sales FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can create pharmacy sales"
  ON public.pharmacy_sales FOR INSERT TO authenticated WITH CHECK (true);

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, role)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', 'New User'),
    new.email,
    COALESCE((new.raw_user_meta_data->>'role')::staff_role, 'receptionist')
  );
  RETURN new;
END;
$$;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Add triggers for updated_at
CREATE TRIGGER update_patients_updated_at BEFORE UPDATE ON public.patients
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_wards_updated_at BEFORE UPDATE ON public.wards
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON public.appointments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_consultations_updated_at BEFORE UPDATE ON public.consultations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_admissions_updated_at BEFORE UPDATE ON public.admissions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_bills_updated_at BEFORE UPDATE ON public.bills
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_medications_updated_at BEFORE UPDATE ON public.medications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();