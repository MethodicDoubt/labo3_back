import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbPopoverDirective } from '@nebular/theme';
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

  @ViewChildren(NbPopoverDirective) popovers: QueryList<NbPopoverDirective>;

  product: Product;
  isConnected: boolean;
  statusConnexion: Subscription;
  quantity = 0;

  constructor(private _productService: ProductService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    public _authService: AuthService) { }

  ngOnInit(): void {
    this.statusConnexion = this._authService.statusBehaviorConnexion.subscribe(
      dataConnexion => this.isConnected = dataConnexion
    )
    this.produtById();
  }

  produtById() {
    this.product = this._activatedRoute.snapshot.data['resultat']
    // console.log(this.product);
  }

  redirectToHome() {
    this._router.navigate(["product"]).then();
  }

  addToBasket(p: Product) {

    if (this.quantity > 0 && this.quantity <= p.quantity) {

      this._productService.basket.set(p, this.quantity);

      this._productService.emitBasketLengthStatus();

      this._productService.calculTotalPrice();

      this.quantity = 0;

      this.popovers.forEach(pop => {
        pop.hide();
      });

    }

  }

}
