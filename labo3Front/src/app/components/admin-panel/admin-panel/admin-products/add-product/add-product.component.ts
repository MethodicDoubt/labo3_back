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
    private _nBDiagRef: NbDialogRef<AddProductComponent>,
    private _categoryService: CategoryService,
    private _supplierService: SupplierService) { }

  ngOnInit(): void {
    this.initFg();
    this._categoryService.getAll().subscribe(
      data => this.categories = data
    )
    this._supplierService.getAll().subscribe(
      data => this.suppliers = data
    )
  }

  initFg() {
    this.fgAddProduct = this._formBuilder.group({
      name: ['', [Validators.required]],
      description: [''],
      categories: ['', [Validators.required]],
      expirationDate: [''],
      purchasePrice: [0, [Validators.required]],
      quantity: [0, [Validators.required]],
      productImage: ['', [Validators.required]],
      supplier: ['', [Validators.required]]
    })
  }

  onSubmit() {
    let newProduct = this.transformingProduct();
    this._productService.insert(newProduct).subscribe(
      data => {
        data ? alert("Product create") : alert("Problem, try again");
        this._nBDiagRef.close();
      }
    );
  }

  transformingProduct() {
    let newProduct = new Product();
    newProduct.categories = [];
    newProduct.name = this.fgAddProduct.value['name'];
    newProduct.description = this.fgAddProduct.value['description'];
    newProduct.productImage = this.fgAddProduct.value['productImage'];
    newProduct.purchasePrice = this.fgAddProduct.value['purchasePrice'];
    newProduct.quantity = this.fgAddProduct.value['quantity'];
    this.fgAddProduct.value['expirationDate'] == "" ? null : newProduct.expirationDate = this.fgAddProduct.value['expirationDate'];
    newProduct.supplier = this.suppliers.find(supp => supp.supplierId == this.fgAddProduct.value['supplier']);
    this.fgAddProduct.value['categories'].forEach(element => {
      newProduct.categories.push(
        this.categories.find(
          cat => cat.categoryId == element
        )
      )
    });
    return newProduct;
  }
}
