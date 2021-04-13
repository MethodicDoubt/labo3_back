import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order.model';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor(
    public productService: ProductService,
    private _OrderService: OrderService,
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  transformIntoOrder(n: number) {

    let newOrder: Order = new Order();
    newOrder.products = [];

    switch (n) {
      case 1:

        newOrder.payementMethod = "PAYPAL"

        break;

      case 2:

        newOrder.payementMethod = "CREDIT_CARD"

        break;

      case 3:

        newOrder.payementMethod = "DEBIT_CARD"

        break;

      default:
        break;
    }

    this.productService.basket.forEach((value, key) => {

      for (let index = 0; index < value; index++) {

        newOrder.products.push(key);

      }

    });

    newOrder.isPaid = true;

    newOrder.user = this._authService.currentUser;

    this.isPaid(newOrder);

  }

  isPaid(newOrder: Order) {

    this._OrderService.createNewOrder(newOrder).subscribe(
      next => {
        this.productService.basket.forEach(
          (value, key) => {
            let object = {
              "quantity": key.quantity - value
            }
            this.productService.patch(object, key.productId).subscribe(
              next => {
                this._OrderService.initBasket();
                this._router.navigate(['home']).then()
              }
            );
          }
        );
      }
    );
  }
}
