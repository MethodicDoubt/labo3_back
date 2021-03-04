import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-by-id',
  templateUrl: './product-by-id.component.html',
  styleUrls: ['./product-by-id.component.scss']
})
export class ProductByIdComponent implements OnInit {

  product: Product;
  isConnected: boolean;
  statusConnexion: Subscription;

  constructor(private _productService: ProductService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    public _authService: AuthService) { }

  ngOnInit(): void {
    this.statusConnexion = this._authService.statusConnexion.subscribe(
      dataConnexion => this.isConnected = dataConnexion
    )
    this.produtById();
  }

  produtById() {
    this.product = this._activatedRoute.snapshot.data['resultat']
    console.log(this.product);
  }

  redirectToHome() {
    this._router.navigate(["product"]).then();
  }

  addToBasket(p: Product) {

    this._productService.basket.push(p);
    this._productService.emitBasketLengthStatus();

    this._productService.calculTotalPrice(p.purchasePrice);
    this._productService.emitTotalPriceStatus();

  }

}
