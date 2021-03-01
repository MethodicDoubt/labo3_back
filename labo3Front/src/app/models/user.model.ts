import { Order } from "./order.model";

export class User {
    userId: number;
    lastName: string;
    firstName: string;
    accessLevel: string;
    surname: string;
    password: string;
    address: {
        "street": string;
        "number": number;
        "zip": string;
        "city": string;
        "country": string;
    };
    ordersDto: Order[];
}