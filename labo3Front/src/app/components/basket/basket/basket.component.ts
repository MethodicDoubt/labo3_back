import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  mapProductQuantity : Map<Product, number> = new Map<Product, number>();

  uniqueProduct: Product[] = [];

  totalPrice : number = 0;

  quantity: number = 1;

  totalPriceStatus : Subscription;

  constructor(public productService : ProductService, private _router : Router) { 

    

  }

  ngOnInit(): void {

    this.mapProductQuantity = this.productService.basket;

    this.uniqueProduct = this.mapProductQuantity.size > 0 ? Array.from(this.mapProductQuantity.keys()) : [];

    this.totalPriceStatus = this.productService.totalPriceStatus.subscribe(data => this.totalPrice = data);


  }

  removeFromBasket(p : Product) {

    this.productService.basket.delete(p);
    this.uniqueProduct = Array.from(this.mapProductQuantity.keys());

    this.productService.emitBasketLengthStatus();

    this.productService.calculTotalPrice();

  }

  redirect(id : number) {

    this._router.navigate(['product', id]).then();

  }

  redirectToPayment() {

    this._router.navigate(['payment']).then();

  }

  onQuantityLoad(p: Product) {

    this.quantity = this.productService.basket.get(p);

  }

  changeQuantity(p: Product, quantity: number) {


    this.productService.basket.set(p, quantity);

    this.productService.calculTotalPrice();


  }

}
