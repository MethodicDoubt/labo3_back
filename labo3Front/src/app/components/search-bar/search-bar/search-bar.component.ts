import { LowerCasePipe } from '@angular/common';
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { AllProductComponent } from '../../product/all-product/all-product.component';
import { ProductByIdComponent } from '../../product/product-by-id/product-by-id.component';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  fg: FormGroup;

  constructor(private _formBuilder: FormBuilder,
    private _productService: ProductService,
    private _router: Router) { }

  ngOnInit(): void {
    this.initFg();
  }

  onSubmit() {
    this._router.navigate(['/home'], { queryParams: { searchByString: this.fg.value['name']} })
    this.initFg();
  }

  initFg() {
    this.fg = this._formBuilder.group({
      name: ['', Validators.required]
    })
  }

}
