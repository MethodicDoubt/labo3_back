import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  formCategory: FormGroup;
  category: Category = new Category();

  constructor(private _formBuilder: FormBuilder,
    private _categoryService: CategoryService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.initFormEmpty();
    this.initCategory();
  }

  initCategory() {
    // this._categoryService.getById()
    this._activatedRoute.params.subscribe(
      params => {
        this._categoryService.getAll().subscribe(
          categories => {
            this.category = categories[params['id'] - 1];
            this.initFormWithValue();
          }
        );
      }
    );
  }

  initFormEmpty() {
    this.formCategory = this._formBuilder.group({
      type: ['', Validators.required]
    })
  }

  initFormWithValue() {
    this.formCategory = this._formBuilder.group({
      type: [this.category.type, Validators.required]
    })
  }

  onSubmit() {
    let categoryUpdated = new Category();
    categoryUpdated.categoryId = this.category.categoryId;
    categoryUpdated.type = this.formCategory.value['type'];
    console.log(categoryUpdated)
    this._categoryService.update(categoryUpdated).subscribe(
      next => {
        this._router.navigate(['admin', 'categories'])
      }
    );

  }
}
