import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbPopoverDirective } from '@nebular/theme';
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

  @ViewChildren(NbPopoverDirective) popovers: QueryList<NbPopoverDirective>;

  products: Product[];

  quantity: number = 1;

  isConnected: boolean;
  statusConnexion: Subscription;

  currentProduct?: Product;
  currentIndex = -1;

  page = 1;
  count = 0;
  pageSize = 4;
  pageSizes = [4, 8, 12];
  totalPages: number;

  constructor(private _productService: ProductService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    public _authService: AuthService) {
    // console.log("Constructor");
    this.loadPageWithProducts();
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
    const params = this.getRequestParams(this.page, this.pageSize);
    this._productService.getAllWithPagination(params).subscribe(
      response => {
        console.log(response)
        this.products = response.content;
        this.count = response.totalElements;
        this.totalPages = response.totalPages;
      }
    )
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

    // console.log(this.quantity);

    if (this.quantity > 0 && this.quantity <= p.quantity) {

      this._productService.basket.set(p, this.quantity);

      this._productService.emitBasketLengthStatus();

      this._productService.calculTotalPrice();

      this.quantity = 1;

      this.popovers.forEach(pop => {
        pop.hide();
      });

    }

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

    this.loadPageWithProducts();

  }

  handlePageSizeChange(event: any): void {

    this.pageSize = event;
    this.page = 1;
    this.retrieveProducts();

  }

  loadPageWithProducts() {
    this._activatedRoute.queryParamMap.subscribe(

      data => {
        if (data.get('searchByString') == undefined && data.get('searchObject') == undefined || data.get('searchByString') == "") {
          this.initTab()
        } else if (data.get('searchByString') != "" && data.get('searchObject') == undefined) {
          this.sortProducts(data.get('searchByString'))
        } else {
          const params = this.getRequestParams(this.page, this.pageSize);
          this._productService.search(this._productService.searchObject, params).subscribe(data => {
            // console.log(data.content)
            if (data.content.length == 0) {
              alert("Your advance search get nothing !");
              this.initTab();
            } else {
              // console.log(data)
              this.products = data.content;
              this.count = data.totalElements;
              this.totalPages = data.totalPages;
            }
          });
        }

      }

    )
  }

}
