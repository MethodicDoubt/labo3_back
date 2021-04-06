import { Component, OnInit } from '@angular/core';
import { NbDialogModule, NbDialogService } from '@nebular/theme';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { AddProductComponent } from './add-product/add-product.component';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {

  products: Product[] = [];

  constructor(private _productService: ProductService,
    private _dialogBox: NbDialogService) { }

  ngOnInit(): void {
    this.initProducts();

  }

  private initProducts() {
    this._productService.getAll().subscribe(
      data => {
        this.products = data
      }
    );
  }

  clickAdd() {
    let ref = this._dialogBox.open(
      AddProductComponent
    );
    ref.onClose.subscribe(() => this.initProducts());

  }

  clickEdit() {
    alert("We are preparing this feature ! Stay tuned !");
  }

  changeActive(idProduct: number, isActive: boolean) {
    if (confirm("Do you want to change active ? ")) {
      this._productService.patch({ "isActive": !isActive }, idProduct).subscribe(
        next => {
          this._productService.getAll().subscribe(
            allProducts => this.products = allProducts
          );
        }
      );
    }
  }

}
