import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-all-product-with-pagination',
  templateUrl: './all-product-with-pagination.component.html',
  styleUrls: ['./all-product-with-pagination.component.scss']
})
export class AllProductWithPaginationComponent implements OnInit {

  products: Product[] = [];
  currentProduct?: Product;
  currentIndex = -1;

  page = 1;
  count = 0;
  pageSize = 2;
  pageSizes = [4, 8, 12];
  totalPages : number;

  constructor(

    private _productService: ProductService

  ) { }

  ngOnInit(): void {

    this.retrieveProducts();

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
