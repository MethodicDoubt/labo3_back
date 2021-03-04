import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { Product } from '../models/product.model';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private BASE_URL = "http://localhost:8080/orders";

  constructor(private _authService: AuthService, public productService: ProductService, private _httpClient: HttpClient) { }

  createNewOrder(order: Order): Observable<boolean> {

    console.log(order);
    this.productService.basket = [];
    this.productService.totalPrice = 0;
    this.productService.emitBasketLengthStatus();
    this.productService.emitTotalPriceStatus();

    return this._httpClient.post<boolean>(this.BASE_URL, order);

  }

}