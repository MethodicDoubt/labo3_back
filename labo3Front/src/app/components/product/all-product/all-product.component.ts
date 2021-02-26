import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.scss']
})
export class AllProductComponent implements OnInit {

  products: Product[];

  constructor(private _productService: ProductService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) {
    this._activatedRoute.queryParams.subscribe(
      data => {
        this.sortProducts(data['searchByString'])
      }
    )
  }

  ngOnInit(): void {
    this._productService.getAll().subscribe(data => this.products = data)
  }

  redirect(id: number) {
    this._router.navigate(['product', id]).then();
  }

  sortProducts(searchByString: String) {
    if (searchByString = "") {
      this._productService.getAll().subscribe(data => this.products = data)
    } else {
      this._productService.searchByString(searchByString).subscribe(
        data => this.products = data
      );
    }

  }

}
