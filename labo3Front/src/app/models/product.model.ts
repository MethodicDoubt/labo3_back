import { Category } from "./category.model";

export class Product {
    id: number;
    name: String;
    description: String;
    categoriesDto: Category[];
    entryDate: String;
    updateDate: String;
    experiationDate: String;
    purchasePrice: number;
    quantity: number;
    // supplierDto:Supplier[];
    // ordersDto: Order[];
}