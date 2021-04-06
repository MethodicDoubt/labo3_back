import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.scss']
})
export class AllProductComponent implements OnInit {

  products: Product[];
  isConnected: boolean;
  statusConnexion: Subscription;

  constructor(private _productService: ProductService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    public _authService: AuthService) {

    // console.log("Constructor");



    this._activatedRoute.queryParamMap.subscribe(

      data => {
        if (data.get('searchByString') == undefined && data.get('searchObject') == undefined || data.get('searchByString') == "") {

          this.initTab()

        } else if (data.get('searchByString') != "" && data.get('searchObject') == undefined) {

          this.sortProducts(data.get('searchByString'))

        } else {
          this._productService.search(this._productService.searchObject).subscribe(data => {
            console.log(data)
            if (data.length == 0) {
              alert("Your advance search get nothing !");
              this.initTab();
            } else
              this.products = data
          });
        }

      }

    )

  }

  ngOnInit(): void {
    // console.log("OnInit")
    this.statusConnexion = this._authService.statusBehaviorConnexion.subscribe(
      dataConnexion => {
        this.isConnected = dataConnexion;
      }
    )
  }

  redirect(id: number) {
    this._router.navigate(['product', id]).then();
  }

  initTab() {
    this._productService.getAll().subscribe(data => this.products = data)
  }

  sortProducts(searchByString: String) {
    if (searchByString == "") {
      this._productService.getAll().subscribe(
        data => { this.products = data }
      )
    } else {
      this._productService.searchByString(searchByString).subscribe(
        data => {
          if (data.length == 0) {
            this.initTab();
          } else {
            this.products = data
          }
        }
      );
    }

  }

  addToBasket(p: Product) {

    this._productService.basket.push(p);
    this._productService.emitBasketLengthStatus();

    this._productService.calculTotalPrice(p.purchasePrice);
    this._productService.emitTotalPriceStatus();

  }

}
