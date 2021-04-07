import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { Supplier } from 'src/app/models/supplier.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  fgAddProduct: FormGroup;
  categories: Category[];
  suppliers: Supplier[];
  product: Product = new Product();

  constructor(private _formBuilder: FormBuilder,
    private _productService: ProductService,
    private _categoryService: CategoryService,
    private _supplierService: SupplierService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router) { }

  ngOnInit(): void {
    this.initFg();
    this.initCategorySupplier();
    this.initProduct();
  }


  initFg() {
    this.fgAddProduct = this._formBuilder.group({
      name: ['', [Validators.required]],
      description: [''],
      categories: [[''], [Validators.required]],
      expirationDate: [''],
      purchasePrice: [0, [Validators.required]],
      quantity: [0, [Validators.required]],
      productImage: ['', [Validators.required]],
      supplier: ['', [Validators.required]]
    })
  }

  initCategorySupplier() {
    this._categoryService.getAll().subscribe(
      data => this.categories = data
    )
    this._supplierService.getAll().subscribe(
      data => this.suppliers = data
    )
  }

  initProduct() {
    this._activatedRoute.params.subscribe(
      data => {
        this._productService.getById(data['id']).subscribe(
          productById => {
            this.product = productById
            this.initFormWithValue()
          }
        );
      }
    );
  }

  initFormWithValue() {
    let idCategories: string[] = [];
    this.product.categoriesDto.forEach(e => idCategories.push(e.categoryId.toString()));
    this.fgAddProduct = this._formBuilder.group({
      name: [this.product.name, [Validators.required]],
      description: [this.product.description],
      categories: [idCategories, [Validators.required]],
      expirationDate: [this.product.expirationDate],
      purchasePrice: [this.product.purchasePrice, [Validators.required]],
      quantity: [this.product.quantity, [Validators.required]],
      productImage: [this.product.productImage, [Validators.required]],
      supplier: [this.product.supplierDto.supplierId.toString(), [Validators.required]]
    })
  }

  onSubmit() {
    let productToUpdate = this.transformingProduct();
    this._productService.update(productToUpdate, this.product.productId).subscribe(
      next => {
        this._router.navigate(['admin', 'products'])
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
