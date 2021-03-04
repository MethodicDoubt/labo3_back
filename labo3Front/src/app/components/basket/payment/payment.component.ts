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
    public productService : ProductService, 
    private _OrderService : OrderService, 
    private _authService : AuthService, 
    private _router : Router
    ) { }

  ngOnInit(): void {
  }

  transformIntoOrder(n : number) {

    let newOrder : Order = new Order();

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

    newOrder.products = this.productService.basket;
    newOrder.isPaid = true;
    newOrder.user = this._authService.currentUser;

    this.isPaid(newOrder);

  }

  isPaid(newOrder : Order) {

    this._OrderService.createNewOrder(newOrder).subscribe();

    //---------------------------------------------------------------TEST

    newOrder.products.forEach(p => console.log(p))

    let map = new Map<number, number>();

    let lesId : number[] = [];

    newOrder.products.forEach(p => { lesId.push(p.productId) })

    console.log("Les ids des produits "+ lesId )

    let uniqueId = lesId.filter((x, i, a) => a.indexOf(x) == i);

    console.log("Les ids uniques des produits "+uniqueId)

    let count : number[] = [];

    lesId.forEach(
      p => { //4
        let count = 0;
        newOrder.products.forEach(element => {
          if (element.productId == p) { // idproduit == 4
            count++;
          }
        });
        map.set(p,count);
      }
    )

    console.log(map);

    //----------------------------------------------------------------FIN TEST
    
    map.forEach((k,v) => {

      console.log("Nombre d'item = " + k)
      console.log("L'id de l'item = " + v)

      let product = new Product();

      product = newOrder.products.find(p => p.productId == v);

      console.log(product);

      let object = {

        "quantity": product.quantity - k

      }

      this.productService.patch(object, v).subscribe();

    });

    this._router.navigate(['home']).then;

  }

}
