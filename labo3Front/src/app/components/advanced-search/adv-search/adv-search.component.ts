import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdvancedSearch } from 'src/app/models/advanced-search.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-adv-search',
  templateUrl: './adv-search.component.html',
  styleUrls: ['./adv-search.component.scss']
})
export class AdvSearchComponent implements OnInit {

  fg : FormGroup;

  minimumPrice : number = 0;
  maximumPrice : number = 0;

  constructor(private _builder : FormBuilder, private _productService : ProductService) { }

  ngOnInit(): void {

    this.initForm();

  }

  private initForm() {
    this.fg = this._builder.group({
      name : [''],
      categoriesDto : [''],
      minimumPrice : [''],
      maximumPrice : [''],
      quantity : ['', Validators.required],
      supplierDto : ['']
    })
  }

  onSubmit() {

    this._productService.search(this.transformFgIntoAdvSrch());

  }

  transformFgIntoAdvSrch() : AdvancedSearch {

    let searchObject = new AdvancedSearch();

    searchObject.name = this.fg.get('name').value;
    searchObject.categoriesDto = searchObject.categoriesDto != null ? this.fg.get('categoriesDto').value : null;
    searchObject.minimumPrice = this.fg.get('minimumPrice').value;
    searchObject.maximumPrice = this.fg.get('maximumPrice').value;
    searchObject.quantity = this.fg.get('quantity').value;
    searchObject.supplierDto = searchObject.supplierDto != null ? this.fg.get('supplierDto').value : null;

    return searchObject;

  }

  sliderMinChange(event: Event) {

    this.minimumPrice = event.target["value"];

  }

  sliderMaxChange(event: Event) {

    this.maximumPrice = event.target["value"];

  }

}
