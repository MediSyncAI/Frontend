export interface Medicine {
  id: string;
  name: string;
  category: string;
  manufacturer: string;
  dosage: string;
  stockQuantity: number;
  minStockLevel: number;
  expiryDate: string;
  price: number;
  description?: string;
}

export interface MedicineFormData {
  name: string;
  category: string;
  manufacturer: string;
  dosage: string;
  stockQuantity: number;
  minStockLevel: number;
  expiryDate: string;
  price: number;
  description?: string;
}