import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  fg: FormGroup;

  constructor(private _formBuilder: FormBuilder,
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
