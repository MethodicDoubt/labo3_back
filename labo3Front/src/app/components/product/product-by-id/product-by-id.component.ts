import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-by-id',
  templateUrl: './product-by-id.component.html',
  styleUrls: ['./product-by-id.component.scss']
})
export class ProductByIdComponent implements OnInit {

  product: Product;

  constructor(private _productService: ProductService,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.gamerById();
  }

  gamerById() {
    this.product = this._activatedRoute.snapshot.data['resultat']
    console.log(this.product);
  }

}
