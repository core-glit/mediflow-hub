import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Activity } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/10">
      <div className="text-center max-w-2xl px-4">
        <div className="mb-6 flex justify-center">
          <div className="p-4 rounded-full bg-primary/10">
            <Activity className="h-16 w-16 text-primary" />
          </div>
        </div>
        <h1 className="mb-4 text-5xl font-bold tracking-tight">Hospital Management System</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          Presbyterian Church in Cameroon - General Hospital
        </p>
        <p className="mb-8 text-muted-foreground">
          Comprehensive healthcare management solution for patient registration, consultations, 
          laboratory services, pharmacy, billing, and more.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" onClick={() => navigate("/auth")}>
            Login to System
          </Button>
          <Button size="lg" variant="outline" onClick={() => navigate("/auth")}>
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
