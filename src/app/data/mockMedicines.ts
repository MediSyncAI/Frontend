import { Medicine } from "../types/medicine";

export const mockMedicines: Medicine[] = [
  {
    id: "1",
    name: "Amoxicillin",
    category: "Antibiotics",
    manufacturer: "Pfizer",
    dosage: "500mg",
    stockQuantity: 150,
    minStockLevel: 50,
    expiryDate: "2025-06-15",
    price: 125.00,
    description: "Broad-spectrum antibiotic for bacterial infections"
  },
  {
    id: "2",
    name: "Ibuprofen",
    category: "Pain Relief",
    manufacturer: "Johnson & Johnson",
    dosage: "400mg",
    stockQuantity: 8,
    minStockLevel: 25,
    expiryDate: "2025-03-20",
    price: 85.50,
    description: "Non-steroidal anti-inflammatory drug"
  },
  {
    id: "3",
    name: "Lisinopril",
    category: "Cardiovascular",
    manufacturer: "Merck",
    dosage: "10mg",
    stockQuantity: 75,
    minStockLevel: 30,
    expiryDate: "2025-12-01",
    price: 152.75,
    description: "ACE inhibitor for hypertension"
  },
  {
    id: "4",
    name: "Albuterol Inhaler",
    category: "Respiratory",
    manufacturer: "GlaxoSmithKline",
    dosage: "90mcg",
    stockQuantity: 0,
    minStockLevel: 15,
    expiryDate: "2025-08-10",
    price: 450.00,
    description: "Bronchodilator for asthma and COPD"
  },
  {
    id: "5",
    name: "Metformin",
    category: "Other",
    manufacturer: "Teva",
    dosage: "1000mg",
    stockQuantity: 120,
    minStockLevel: 40,
    expiryDate: "2025-11-30",
    price: 102.50,
    description: "Diabetes medication"
  },
  {
    id: "6",
    name: "Omeprazole",
    category: "Gastrointestinal",
    manufacturer: "AstraZeneca",
    dosage: "20mg",
    stockQuantity: 22,
    minStockLevel: 25,
    expiryDate: "2025-04-18",
    price: 189.00,
    description: "Proton pump inhibitor for acid reflux"
  },
  {
    id: "7",
    name: "Aspirin",
    category: "Pain Relief",
    manufacturer: "Bayer",
    dosage: "325mg",
    stockQuantity: 200,
    minStockLevel: 75,
    expiryDate: "2026-01-15",
    price: 55.00,
    description: "Pain reliever and blood thinner"
  },
  {
    id: "8",
    name: "Cephalexin",
    category: "Antibiotics",
    manufacturer: "Teva",
    dosage: "250mg",
    stockQuantity: 15,
    minStockLevel: 30,
    expiryDate: "2025-09-22",
    price: 147.50,
    description: "Cephalosporin antibiotic"
  },
  {
    id: "9",
    name: "Epinephrine Auto-Injector",
    category: "Emergency",
    manufacturer: "Mylan",
    dosage: "0.3mg",
    stockQuantity: 5,
    minStockLevel: 10,
    expiryDate: "2025-07-30",
    price: 950.00,
    description: "Emergency treatment for severe allergic reactions"
  },
  {
    id: "10",
    name: "Vitamin D3",
    category: "Vitamins & Supplements",
    manufacturer: "Nature Made",
    dosage: "1000 IU",
    stockQuantity: 85,
    minStockLevel: 20,
    expiryDate: "2026-02-28",
    price: 129.90,
    description: "Vitamin D supplement"
  }
];