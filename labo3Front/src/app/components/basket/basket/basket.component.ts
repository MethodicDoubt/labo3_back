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

  products : Product[];

  totalPrice : number = 0;

  totalPriceStatus : Subscription;

  constructor(public productService : ProductService, private _router : Router) { 

    

  }

  ngOnInit(): void {

    this.products = this.productService.basket;

    this.totalPriceStatus = this.productService.totalPriceStatus.subscribe(data => this.totalPrice = data);

  }

  removeFromBasket(i : number, p : Product) {

    this.productService.basket.splice(i, 1);

    this.productService.emitBasketLengthStatus();

    this.productService.calculTotalPrice(-(p.purchasePrice));
    this.productService.emitTotalPriceStatus();

  }

  redirect(id : number) {

    this._router.navigate(['product', id]).then();

  }

}
