import { Category } from "./category.model";
import { Supplier } from "./supplier.model";


export class AdvancedSearch {
    name: String;
    categoriesType: String[];
    minimumPrice: number;
    maximumPrice: number;
    quantity: boolean;
    supplierName: String;
}