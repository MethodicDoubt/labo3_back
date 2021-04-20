import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  formCategory: FormGroup;

  constructor(private _formBuilder: FormBuilder,
    private _categoryService: CategoryService,
    private _nbDiagRef: NbDialogRef<AddCategoryComponent>) { }

  ngOnInit(): void {
    this.initFormCategory();
  }

  initFormCategory() {
    this.formCategory = this._formBuilder.group({
      type: ['', Validators.required]
    })
  }

  onSubmit() {
    let newCategory = new Category();
    newCategory.type = this.formCategory.get('type').value;
    this._categoryService.insert(newCategory).subscribe(
      next => {
        next ? alert("Category created") : alert("An error has occured");
        this._nbDiagRef.close();
      }
    )
  }


}
