"use client"

import { Medicine } from "../types/medicine";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Edit, Trash2, AlertTriangle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";

interface MedicineTableProps {
  medicines: Medicine[];
  onEdit: (medicine: Medicine) => void;
  onDelete: (medicineId: string) => void;
}

export function MedicineTable({ medicines, onEdit, onDelete }: MedicineTableProps) {
  const getStockStatus = (medicine: Medicine) => {
    if (medicine.stockQuantity === 0) {
      return { label: "Out of Stock", variant: "destructive" as const };
    } else if (medicine.stockQuantity <= medicine.minStockLevel) {
      return { label: "Low Stock", variant: "secondary" as const };
    } else {
      return { label: "In Stock", variant: "default" as const };
    }
  };

  const isExpiringSoon = (expiryDate: string) => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const today = new Date();
    const thirtyDaysFromNow = new Date(today.getTime() + (30 * 24 * 60 * 60 * 1000));
    return expiry <= thirtyDaysFromNow;
  };

const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Medicine Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Manufacturer</TableHead>
            <TableHead>Dosage</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Expiry Date</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {medicines.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="h-24 text-center text-muted-foreground">
                No medicines found. Add your first medicine to get started.
              </TableCell>
            </TableRow>
          ) : (
            medicines.map((medicine) => {
              const stockStatus = getStockStatus(medicine);
              const expiringSoon = isExpiringSoon(medicine.expiryDate);
              
              return (
                <TableRow key={medicine.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {medicine.name}
                      {expiringSoon && (
                        <AlertTriangle className="h-4 w-4 text-orange-500" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{medicine.category}</TableCell>
                  <TableCell>{medicine.manufacturer}</TableCell>
                  <TableCell>{medicine.dosage || "N/A"}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{medicine.stockQuantity}</span>
                      <span className="text-xs text-muted-foreground">
                        Min: {medicine.minStockLevel}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={stockStatus.variant}>
                      {stockStatus.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className={expiringSoon ? "text-orange-600" : ""}>
                      {formatDate(medicine.expiryDate)}
                    </div>
                  </TableCell>
                  <TableCell>₹{medicine.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(medicine)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Medicine</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete &quot;{medicine.name}&quot;? 
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => onDelete(medicine.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}