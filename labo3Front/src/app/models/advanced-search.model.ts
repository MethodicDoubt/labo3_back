import { Category } from "./category.model";
import { Supplier } from "./supplier.model";


export class AdvancedSearch {
    name: String;
    categories: String[];
    minimumPrice: number;
    maximumPrice: number;
    quantity: boolean;
    supplier: String;
}