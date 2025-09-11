"use client"
import { useState, useMemo } from "react";
import { Medicine, MedicineFormData } from "../types/medicine";
import { MedicineTable } from "./MedicineTable";
import { MedicineEditDialog } from "./MedicineEditDialog";
import { MedicineFilters } from "./MedicineFilters";
import { mockMedicines } from "../data/mockMedicines";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Plus, Package, AlertTriangle, TrendingDown } from "lucide-react";
import { toast } from "sonner";
import Header from "../Header";

export default function App() {
  const [medicines, setMedicines] = useState<Medicine[]>(mockMedicines);
  const [editingMedicine, setEditingMedicine] = useState<Medicine | undefined>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [stockFilter, setStockFilter] = useState("");

  // Filter medicines based on search and filters
  const filteredMedicines = useMemo(() => {
    return medicines.filter((medicine) => {
      const matchesSearch = !searchTerm || 
        medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medicine.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medicine.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = !categoryFilter || medicine.category === categoryFilter;

      const matchesStock = !stockFilter || 
        (stockFilter === "in-stock" && medicine.stockQuantity > medicine.minStockLevel) ||
        (stockFilter === "low-stock" && medicine.stockQuantity > 0 && medicine.stockQuantity <= medicine.minStockLevel) ||
        (stockFilter === "out-of-stock" && medicine.stockQuantity === 0);

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [medicines, searchTerm, categoryFilter, stockFilter]);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = medicines.length;
    const outOfStock = medicines.filter(m => m.stockQuantity === 0).length;
    const lowStock = medicines.filter(m => m.stockQuantity > 0 && m.stockQuantity <= m.minStockLevel).length;
    const expiringSoon = medicines.filter(m => {
      if (!m.expiryDate) return false;
      const expiry = new Date(m.expiryDate);
      const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
      return expiry <= thirtyDaysFromNow;
    }).length;

    return { total, outOfStock, lowStock, expiringSoon };
  }, [medicines]);

  const handleAddMedicine = () => {
    setEditingMedicine(undefined);
    setIsDialogOpen(true);
  };

  const handleEditMedicine = (medicine: Medicine) => {
    setEditingMedicine(medicine);
    setIsDialogOpen(true);
  };

  const handleSaveMedicine = (data: MedicineFormData, medicineId?: string) => {
    if (medicineId) {
      // Update existing medicine
      setMedicines(prev => prev.map(m => 
        m.id === medicineId 
          ? { ...m, ...data }
          : m
      ));
      toast.success("Medicine updated successfully");
    } else {
      // Add new medicine
      const newMedicine: Medicine = {
        ...data,
        id: Date.now().toString(),
      };
      setMedicines(prev => [...prev, newMedicine]);
      toast.success("Medicine added successfully");
    }
  };

  const handleDeleteMedicine = (medicineId: string) => {
    const medicine = medicines.find(m => m.id === medicineId);
    setMedicines(prev => prev.filter(m => m.id !== medicineId));
    toast.success(`${medicine?.name} deleted successfully`);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("");
    setStockFilter("");
  };

  return (
    <>
    <Header/>
    <div className="min-h-screen   bg-background">
      <div className="container mx-auto px-30 py-10 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl text-blue-500 font-bold">Hospital Medicine Inventory</h1>
            <p className="text-muted-foreground">
              Manage and track all medicines in the hospital pharmacy
            </p>
          </div>
          <Button onClick={handleAddMedicine} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Medicine
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Medicines</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">
                Active inventory items
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
              <TrendingDown className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.lowStock}</div>
              <p className="text-xs text-muted-foreground">
                Items below minimum level
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{stats.outOfStock}</div>
              <p className="text-xs text-muted-foreground">
                Items requiring immediate restock
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.expiringSoon}</div>
              <p className="text-xs text-muted-foreground">
                Expiring within 30 days
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filter & Search</CardTitle>
            <CardDescription>
              Filter medicines by category, stock status, or search by name
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MedicineFilters
              medicines={medicines}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              categoryFilter={categoryFilter}
              onCategoryFilterChange={setCategoryFilter}
              stockFilter={stockFilter}
              onStockFilterChange={setStockFilter}
              onClearFilters={handleClearFilters}
            />
          </CardContent>
        </Card>

        {/* Medicine Table */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Medicine Inventory</CardTitle>
                <CardDescription>
                  Showing {filteredMedicines.length} of {stats.total} medicines
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <MedicineTable
              medicines={filteredMedicines}
              onEdit={handleEditMedicine}
              onDelete={handleDeleteMedicine}
            />
          </CardContent>
        </Card>

        {/* Edit/Add Dialog */}
        <MedicineEditDialog
          medicine={editingMedicine}
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSave={handleSaveMedicine}
        />
      </div>
    </div>
    </>
  );
}