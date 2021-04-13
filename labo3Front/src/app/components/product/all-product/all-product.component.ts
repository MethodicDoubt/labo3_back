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
    console.log("Constructor");
    this.pageSize = 4;
    this.handlePageChange(1)
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

  initTab(params: any) {
    this._productService.getAllWithPagination(params).subscribe(
      response => {
        console.log(response)
        this.products = response.content;
        this.count = response.totalElements;
        this.totalPages = response.totalPages;
      }
    )
  }

  sortProducts(searchByString: String, params: any) {
    if (searchByString == "") {
      this._productService.getAll().subscribe(
        data => { this.products = data }
      )
    } else {
      this._productService.searchByString(searchByString, params).subscribe(
        data => {
          console.log(data);
          if (data.content.length == 0) {
            this.initTab(params);
          } else {
            this.products = data.content;
            this.count = data.totalElements;
            this.totalPages = data.totalPages;
            console.log(this.products)
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
    console.log("handlePageChange")
    this.page = event;
    this.loadPageWithProducts();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event;
    this.page = 1;
    this.retrieveProducts();

  }

  loadPageWithProducts() {
    console.log("loadPageWithProducts")
    const params = this.getRequestParams(this.page, this.pageSize);
    this._activatedRoute.queryParamMap.subscribe(
      data => {
        if (data.get('searchByString') == undefined && data.get('searchObject') == undefined || data.get('searchByString') == "") {
          console.log('all product')
          this.initTab(params)
        } else if (data.get('searchByString') != "" && data.get('searchObject') == undefined) {
          console.log('search by string')
          this.sortProducts(data.get('searchByString'), params)
        } else {
          console.log('advance search')
          this._productService.search(this._productService.searchObject, params).subscribe(data => {
            console.log(data)
            console.log(data.content.length)
            if (data.content.length == 0) {
              alert("Your advance search get nothing !");
              this.initTab(params);
            } else {
              console.log(data.content.length)
              this.products = data.content;
              this.count = data.totalElements;
              this.totalPages = data.totalPages;
              console.log(this.products)
            }
          });
        }

      }

    )
  }

}
