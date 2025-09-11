
"use client"
import { useState } from "react";
import { Medicine, MedicineFormData } from "../types/medicine";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

interface MedicineEditDialogProps {
  medicine?: Medicine;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: MedicineFormData, medicineId?: string) => void;
}

const categories = [
  "Antibiotics",
  "Pain Relief",
  "Cardiovascular",
  "Respiratory",
  "Gastrointestinal",
  "Neurological",
  "Dermatological",
  "Vitamins & Supplements",
  "Emergency",
  "Other"
];

export function MedicineEditDialog({ 
  medicine, 
  open, 
  onOpenChange, 
  onSave 
}: MedicineEditDialogProps) {
  const [formData, setFormData] = useState<MedicineFormData>({
    name: medicine?.name || "",
    category: medicine?.category || "",
    manufacturer: medicine?.manufacturer || "",
    dosage: medicine?.dosage || "",
    stockQuantity: medicine?.stockQuantity || 0,
    minStockLevel: medicine?.minStockLevel || 10,
    expiryDate: medicine?.expiryDate || "",
    price: medicine?.price || 0,
    description: medicine?.description || "",
  });

  const handleSave = () => {
    if (!formData.name || !formData.category || !formData.manufacturer) {
      alert("Please fill in all required fields");
      return;
    }
    
    onSave(formData, medicine?.id);
    onOpenChange(false);
  };

  const isLowStock = formData.stockQuantity <= formData.minStockLevel;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {medicine ? "Edit Medicine" : "Add New Medicine"}
          </DialogTitle>
          <DialogDescription>
            {medicine 
              ? "Update the medicine information and stock levels." 
              : "Add a new medicine to the hospital inventory."
            }
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Medicine Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter medicine name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="manufacturer">Manufacturer *</Label>
              <Input
                id="manufacturer"
                value={formData.manufacturer}
                onChange={(e) => setFormData(prev => ({ ...prev, manufacturer: e.target.value }))}
                placeholder="Enter manufacturer"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dosage">Dosage</Label>
              <Input
                id="dosage"
                value={formData.dosage}
                onChange={(e) => setFormData(prev => ({ ...prev, dosage: e.target.value }))}
                placeholder="e.g., 500mg, 10ml"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="stockQuantity">
                Current Stock
                {isLowStock && <span className="text-destructive ml-1">(Low!)</span>}
              </Label>
              <Input
                id="stockQuantity"
                type="number"
                min="0"
                value={formData.stockQuantity}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  stockQuantity: parseInt(e.target.value) || 0 
                }))}
                className={isLowStock ? "border-destructive" : ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minStockLevel">Min Stock Level</Label>
              <Input
                id="minStockLevel"
                type="number"
                min="0"
                value={formData.minStockLevel}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  minStockLevel: parseInt(e.target.value) || 0 
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price (₹)</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  price: parseFloat(e.target.value) || 0 
                }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="expiryDate">Expiry Date</Label>
            <Input
              id="expiryDate"
              type="date"
              value={formData.expiryDate}
              onChange={(e) => setFormData(prev => ({ ...prev, expiryDate: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Additional notes about the medicine..."
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {medicine ? "Update Medicine" : "Add Medicine"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}