import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { AddCategoryComponent } from './add-category/add-category.component';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss']
})
export class AdminCategoriesComponent implements OnInit {

  categories: Category[] = [];

  constructor(private _categoryService: CategoryService,
    private _dialogBox: NbDialogService) { }

  ngOnInit(): void {
    this.initCategories()
  }

  initCategories() {
    this._categoryService.getAll().subscribe(
      allCategories => {
        this.categories = allCategories
      }
    )
  }

  clickAdd() {
    let ref = this._dialogBox.open(
      AddCategoryComponent
    );
    ref.onClose.subscribe(() => this.initCategories());
  }

}


