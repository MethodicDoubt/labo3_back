import { Category } from "./category.model";
import { Supplier } from "./supplier.model";


export class AdvancedSearch {
    name: String;
    categoriesDto: Category[];
    minimumPrice: number;
    maximumPrice: number;
    quantity: boolean;
    supplierDto: Supplier;
}