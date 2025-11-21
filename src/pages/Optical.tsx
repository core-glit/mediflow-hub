import { useState } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OpticalExamForm } from "@/components/optical/OpticalExamForm";
import { OpticalInventory } from "@/components/optical/OpticalInventory";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

const Optical = () => {
    const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold tracking-tight">Optical Department</h1>
                </div>

                <Tabs defaultValue="exams" className="w-full">
                    <TabsList>
                        <TabsTrigger value="exams">Eye Exams</TabsTrigger>
                        <TabsTrigger value="inventory">Inventory</TabsTrigger>
                    </TabsList>

                    <TabsContent value="exams" className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-1">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Users className="h-5 w-5" />
                                            Patient Selection
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground mb-4">
                                            Select a patient to start an exam.
                                        </p>
                                        {/* Placeholder for patient search/select - for now just an input */}
                                        <div className="space-y-2">
                                            <p className="text-xs text-muted-foreground">Patient ID (Temporary Input)</p>
                                            <input
                                                type="text"
                                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                placeholder="Enter Patient UUID"
                                                onChange={(e) => setSelectedPatientId(e.target.value)}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="md:col-span-2">
                                <OpticalExamForm patientId={selectedPatientId || undefined} />
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="inventory">
                        <OpticalInventory />
                    </TabsContent>
                </Tabs>
            </div>
        </Layout>
    );
};

export default Optical;
