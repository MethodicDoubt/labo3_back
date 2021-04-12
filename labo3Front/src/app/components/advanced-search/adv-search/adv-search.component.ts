import { InstantiateExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { AdvancedSearch } from 'src/app/models/advanced-search.model';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-adv-search',
  templateUrl: './adv-search.component.html',
  styleUrls: ['./adv-search.component.scss']
})
export class AdvSearchComponent implements OnInit {

  fg: FormGroup;

  date = new Date();

  categories: String[];

  minimumPrice: number = 0;
  maximumPrice: number = 0;

  constructor(
    private _builder: FormBuilder,
    private _productService: ProductService,
    private _categoryService: CategoryService,
    private _router: Router,
    private _nbDiagRef: NbDialogRef<AdvancedSearch>
  ) { }

  ngOnInit(): void {
    this.initForm();
    this._categoryService.getAllType().subscribe(data => this.categories = data);
  }

  private initForm() {
    this.fg = this._builder.group({
      name: [''],
      categories: [null],
      minimumPrice: [0],
      maximumPrice: [1000],
      quantity: [false, Validators.required],
      supplier: ['']
    })
  }

  onSubmit() {
    let searchObject = this.transformFgIntoAdvSrch();

    this._router.navigate(['/home'], {
      queryParams: {
        searchObject: searchObject.name == "" ? this.date.getMilliseconds() : searchObject.name
      }
    });

    this._nbDiagRef.close();
  }

  transformFgIntoAdvSrch(): AdvancedSearch {

    let searchObject = new AdvancedSearch();

    searchObject.name = this.fg.get('name').value;
    searchObject.categoriesType = this.fg.get('categories').value != null ? this.fg.get('categories').value : null;
    searchObject.minimumPrice = this.fg.get('minimumPrice').value;
    searchObject.maximumPrice = this.fg.get('maximumPrice').value;
    searchObject.quantity = this.fg.get('quantity').value;
    searchObject.supplierName = this.fg.get('supplier').value != "" ? this.fg.get('supplier').value : null;

    this._productService.searchObject = searchObject;

    return searchObject;
  }

  sliderMinChange(event: Event) {

    this.minimumPrice = event.target["value"];

  }

  sliderMaxChange(event: Event) {

    this.maximumPrice = event.target["value"];

  }

}
