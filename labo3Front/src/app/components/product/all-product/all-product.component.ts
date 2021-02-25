import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.scss']
})
export class AllProductComponent implements OnInit {

  products : Product[];

  constructor(private _productService : ProductService, private _router : Router) { }

  ngOnInit(): void {

    this._productService.getAll().subscribe(data => this.products = data)

  }

  redirect(id : number) {

    this._router.navigate(['product', id]).then();

  }

}
