import { Category } from "./category.model";
import { Order } from "./order.model";
import { Supplier } from "./supplier.model";


export class Product {
    productId: number;
    name: String;
    description: String;
    categoriesDto: Category[];
    categories: Category[];
    entryDate: String;
    updateDate: String;
    expirationDate: String;
    purchasePrice: number;
    quantity: number;
    productImage: String;
    supplierDto: Supplier;
    supplier: Supplier;
    ordersDto: Order[];
    orders: Order[];
}
