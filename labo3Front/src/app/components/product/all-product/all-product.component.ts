import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef, NbDialogService, NbPopoverDirective } from '@nebular/theme';
import { Subscription } from 'rxjs/internal/Subscription';
import { Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.scss','../../../app.component.scss']
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
  pageSize = 3;
  pageSizes = [3, 6, 9, 12];
  totalPages: number;

  constructor(private _productService: ProductService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    public _authService: AuthService) {
    this.handlePageChange(1)
  }

  ngOnInit(): void {
    this.statusConnexion = this._authService.statusBehaviorConnexion.subscribe(
      dataConnexion => {
        this.isConnected = dataConnexion;
      }
    )
  }

  redirect(id: number) {
    this._router.navigate(['product', id]).then();
  }

  initTab(params: any) {
    this._productService.getAllWithPagination(params).subscribe(
      response => {
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
          if (data.content.length == 0) {
            this.initTab(params);
          } else {
            this.products = data.content;
            this.count = data.totalElements;
            this.totalPages = data.totalPages;
          }
        }
      );
    }

  }

  addToBasket(p: Product) {

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

  handlePageChange(event: number): void {
    this.page = event;
    this.loadPageWithProducts();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event;
    this.page = 1;
    this.loadPageWithProducts();
  }

  loadPageWithProducts() {
    const params = this.getRequestParams(this.page, this.pageSize);
    this._activatedRoute.queryParamMap
      .subscribe(
        data => {
          if (data.get('searchByString') == undefined && data.get('searchObject') == undefined || data.get('searchByString') == "") {
            this.initTab(params)
          } else if (data.get('searchByString') != "" && data.get('searchObject') == undefined) {
            this.sortProducts(data.get('searchByString'), params)
          } else {
            this._productService.search(this._productService.searchObject, params).subscribe(data => {
              if (data.content.length == 0) {
                alert("Your advance search get nothing !");
                this._productService.searchObject = null;
                this.initTab(params);
                this._router.navigate(['']).then()
              } else {
                this.products = data.content;
                this.count = data.totalElements;
                this.totalPages = data.totalPages;
              }
            });
          }
        }
      )
      .unsubscribe();
  }

}
