import { Product } from "./product.model";
import { User } from "./user.model";

export class Order {
    orderId: number;
    reference: String;
    creationDate: String;
    isPaid: boolean;
    payementMethod: String;
    userDto: User;
    productsDto: Product[];
}