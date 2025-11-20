import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Plus, Search } from "lucide-react";
import { usePatients } from "@/hooks/usePatients";
import { usePatientForm } from "@/hooks/usePatientForm";
import { PatientTable } from "@/components/patients/PatientTable";
import { PatientRegistrationForm } from "@/components/patients/PatientRegistrationForm";

const Patients = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { patients, loading, fetchPatients } = usePatients();
  const { formData, setFormData, loading: formLoading, handleSubmit } = usePatientForm(() => {
    setIsDialogOpen(false);
    fetchPatients();
  });

  const filteredPatients = patients.filter((patient) =>
    patient.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.patient_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone?.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Patient Management</h1>
            <p className="text-muted-foreground">Register and manage patient records</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Patients</CardTitle>
                <CardDescription>All registered patients</CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search patients..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Register Patient
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Register New Patient</DialogTitle>
                      <DialogDescription>Fill in patient information</DialogDescription>
                    </DialogHeader>
                    <PatientRegistrationForm
                      formData={formData}
                      setFormData={setFormData}
                      onSubmit={handleSubmit}
                      loading={formLoading}
                    />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <PatientTable patients={filteredPatients} loading={loading} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Patients;