import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Patient } from "@/types/patient";

interface PatientTableProps {
    patients: Patient[];
    loading: boolean;
}

export const PatientTable = ({ patients, loading }: PatientTableProps) => {
    if (loading) {
        return (
            <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Patient Number</TableHead>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Age</TableHead>
                        <TableHead>Sex</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Insurance</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Registered</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {patients.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                                No patients found
                            </TableCell>
                        </TableRow>
                    ) : (
                        patients.map((patient) => (
                            <TableRow key={patient.id}>
                                <TableCell className="font-medium">{patient.patient_number}</TableCell>
                                <TableCell>{patient.full_name}</TableCell>
                                <TableCell>{patient.age}</TableCell>
                                <TableCell>{patient.sex}</TableCell>
                                <TableCell>{patient.phone}</TableCell>
                                <TableCell>
                                    <span
                                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${patient.insurance_status === "active"
                                                ? "bg-green-50 text-green-700"
                                                : patient.insurance_status === "expired"
                                                    ? "bg-red-50 text-red-700"
                                                    : "bg-gray-50 text-gray-700"
                                            }`}
                                    >
                                        {patient.insurance_status}
                                    </span>
                                </TableCell>
                                <TableCell>{patient.patient_type}</TableCell>
                                <TableCell>{new Date(patient.created_at).toLocaleDateString()}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};
