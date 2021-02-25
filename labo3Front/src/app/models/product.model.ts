import { Category } from "./category.model";
import { Order } from "./order.model";
import { Supplier } from "./supplier.model";

export class Product {
    productId: number;
    name: String;
    description: String;
    categoriesDto: Category[];
    entryDate: String;
    updateDate: String;
    experiationDate: String;
    purchasePrice: number;
    quantity: number;
    supplierDto: Supplier[];
    ordersDto: Order[];
}