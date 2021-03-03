import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { Supplier } from 'src/app/models/supplier.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  fgAddProduct: FormGroup;
  categories: Category[];
  suppliers: Supplier[];

  constructor(private _formBuilder: FormBuilder,
    private _productService: ProductService,
    private nbDiagRef: NbDialogRef<AddProductComponent>,
    private _categoryService: CategoryService,
    private _supplierService: SupplierService) { }

  ngOnInit(): void {
    this.initFg();
    this._categoryService.getAllType().subscribe(
      data => this.categoriesType = data
    )
    this._supplierService.getAllCompanyName().subscribe(
      data => this.companyName = data
    )
  }

  initFg() {
    this.fgAddProduct = this._formBuilder.group({
      name: ['', [Validators.required]],
      description: [''],
      categories: ['', [Validators.required]],
      experiationDate: [''],
      purchasePrice: [0, [Validators.required]],
      quantity: [0, [Validators.required]],
      productImage: ['', [Validators.required]],
      supplier: ['', [Validators.required]]
    })
  }

  onSubmit() {
    let newProduct = this.transformingProduct();

    console.log(newProduct);
  }

  transformingProduct() {
    let newProduct = new Product();
    console.log(this.fgAddProduct.value);
    newProduct.name = this.fgAddProduct.value['name'];
    newProduct.description = this.fgAddProduct.value['description'];
    newProduct.productImage = this.fgAddProduct.value['productImage'];
    newProduct.quantity = this.fgAddProduct.value['quantity'];


    return newProduct;
  }
}
