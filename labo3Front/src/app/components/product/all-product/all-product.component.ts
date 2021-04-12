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

  currentProduct?: Product;
  currentIndex = -1;

  page = 1;
  count = 0;
  pageSize = 4;
  pageSizes = [4, 8, 12];
  totalPages : number;

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
            // console.log(data)
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

    this.retrieveProducts();

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

  getRequestParams(page: number, pageSize: number): any {
    // tslint:disable-next-line:prefer-const
    let params: any = {};

    if (page) {

      params["page"] = page - 1;

    }

    if (pageSize) {

      params["size"] = pageSize;

    }

    return params;

  }

  retrieveProducts(): void {

    const params = this.getRequestParams(this.page, this.pageSize);

    this._productService.getAllWithPagination(params)
    .subscribe(

      response => {

        this.products = response.content;
        this.count = response.totalElements;
        this.totalPages = response.totalPages;

      },
      error => {
        console.log(error);
      });
  }

  handlePageChange(event: number): void {

    this.page = event;

    this.retrieveProducts();

  }

  handlePageSizeChange(event: any): void {

    this.pageSize = event;
    this.page = 1;
    this.retrieveProducts();

  }

}
