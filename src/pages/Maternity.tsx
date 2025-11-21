import { useState } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AntenatalRecord } from "@/components/maternity/AntenatalRecord";
import { DeliveryRecord } from "@/components/maternity/DeliveryRecord";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Baby, Users } from "lucide-react";

const Maternity = () => {
    const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold tracking-tight">Maternity Ward</h1>
                </div>

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
                                    Select a patient to view or add records.
                                </p>
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
                        <Tabs defaultValue="antenatal" className="w-full">
                            <TabsList>
                                <TabsTrigger value="antenatal">Antenatal Care</TabsTrigger>
                                <TabsTrigger value="delivery">Delivery</TabsTrigger>
                            </TabsList>

                            <TabsContent value="antenatal">
                                <AntenatalRecord patientId={selectedPatientId || undefined} />
                            </TabsContent>

                            <TabsContent value="delivery">
                                <DeliveryRecord patientId={selectedPatientId || undefined} />
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Maternity;
