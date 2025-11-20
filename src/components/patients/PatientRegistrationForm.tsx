import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PatientFormData } from "@/types/patient";

interface PatientRegistrationFormProps {
    formData: PatientFormData;
    setFormData: React.Dispatch<React.SetStateAction<PatientFormData>>;
    onSubmit: (e: React.FormEvent) => void;
    loading: boolean;
}

export const PatientRegistrationForm = ({
    formData,
    setFormData,
    onSubmit,
    loading,
}: PatientRegistrationFormProps) => {
    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="full_name">Full Name *</Label>
                    <Input
                        id="full_name"
                        required
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="date_of_birth">Date of Birth</Label>
                    <Input
                        id="date_of_birth"
                        type="date"
                        value={formData.date_of_birth}
                        onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                        id="age"
                        type="number"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="sex">Sex</Label>
                    <Select value={formData.sex} onValueChange={(value) => setFormData({ ...formData, sex: value })}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select sex" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="blood_group">Blood Group</Label>
                    <Input
                        id="blood_group"
                        value={formData.blood_group}
                        onChange={(e) => setFormData({ ...formData, blood_group: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="insurance_company">Insurance Company</Label>
                    <Input
                        id="insurance_company"
                        value={formData.insurance_company}
                        onChange={(e) => setFormData({ ...formData, insurance_company: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="insurance_number">Insurance Number</Label>
                    <Input
                        id="insurance_number"
                        value={formData.insurance_number}
                        onChange={(e) => setFormData({ ...formData, insurance_number: e.target.value })}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="insurance_status">Insurance Status</Label>
                    <Select
                        value={formData.insurance_status}
                        onValueChange={(value: any) => setFormData({ ...formData, insurance_status: value })}
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="expired">Expired</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Registering..." : "Register Patient"}
            </Button>
        </form>
    );
};
