
"use client"
import { Medicine } from "../types/medicine";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Search, Filter, X } from "lucide-react";

interface MedicineFiltersProps {
  medicines: Medicine[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  categoryFilter: string;
  onCategoryFilterChange: (value: string) => void;
  stockFilter: string;
  onStockFilterChange: (value: string) => void;
  onClearFilters: () => void;
}

export function MedicineFilters({
  medicines,
  searchTerm,
  onSearchChange,
  categoryFilter,
  onCategoryFilterChange,
  stockFilter,
  onStockFilterChange,
  onClearFilters,
}: MedicineFiltersProps) {
  const categories = Array.from(
    new Set(medicines.map(medicine => medicine.category))
  ).sort();

  const getFilteredCounts = () => {
    const total = medicines.length;
    const lowStock = medicines.filter(m => m.stockQuantity > 0 && m.stockQuantity <= m.minStockLevel).length;
    const outOfStock = medicines.filter(m => m.stockQuantity === 0).length;
    const inStock = medicines.filter(m => m.stockQuantity > m.minStockLevel).length;
    
    return { total, lowStock, outOfStock, inStock };
  };

  const counts = getFilteredCounts();
  const hasActiveFilters = searchTerm || categoryFilter || stockFilter;

  return (
    <div className="space-y-4">
      {/* Search and Main Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search medicines by name, manufacturer, or category..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={categoryFilter || "all-categories"} onValueChange={(value) => onCategoryFilterChange(value === "all-categories" ? "" : value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-categories">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={stockFilter || "all-stock"} onValueChange={(value) => onStockFilterChange(value === "all-stock" ? "" : value)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All Stock" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-stock">All Stock</SelectItem>
              <SelectItem value="in-stock">In Stock</SelectItem>
              <SelectItem value="low-stock">Low Stock</SelectItem>
              <SelectItem value="out-of-stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={onClearFilters}
              className="px-3"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Stock Status Summary */}
      <div className="flex flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Quick filters:</span>
        </div>
        
        <Badge 
          variant="outline" 
          className="cursor-pointer hover:bg-accent"
          onClick={() => onStockFilterChange("")}
        >
          Total: {counts.total}
        </Badge>
        
        <Badge 
          variant="default" 
          className="cursor-pointer hover:bg-primary/80"
          onClick={() => onStockFilterChange("in-stock")}
        >
          In Stock: {counts.inStock}
        </Badge>
        
        <Badge 
          variant="secondary" 
          className="cursor-pointer hover:bg-secondary/80"
          onClick={() => onStockFilterChange("low-stock")}
        >
          Low Stock: {counts.lowStock}
        </Badge>
        
        <Badge 
          variant="destructive" 
          className="cursor-pointer hover:bg-destructive/80"
          onClick={() => onStockFilterChange("out-of-stock")}
        >
          Out of Stock: {counts.outOfStock}
        </Badge>
      </div>
    </div>
  );
}