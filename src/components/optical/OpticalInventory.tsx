import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

export const OpticalInventory = () => {
    const [inventory, setInventory] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchInventory();
    }, []);

    const fetchInventory = async () => {
        try {
            const { data, error } = await supabase
                .from("optical_inventory")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            setInventory(data || []);
        } catch (error) {
            console.error("Error fetching inventory:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Inventory Management</CardTitle>
                <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                </Button>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Item Name</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Brand</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead>Price</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center">Loading...</TableCell>
                                </TableRow>
                            ) : inventory.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center">No items found</TableCell>
                                </TableRow>
                            ) : (
                                inventory.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.item_name}</TableCell>
                                        <TableCell className="capitalize">{item.item_type}</TableCell>
                                        <TableCell>{item.brand}</TableCell>
                                        <TableCell>{item.stock_quantity}</TableCell>
                                        <TableCell>${item.unit_price}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
};
