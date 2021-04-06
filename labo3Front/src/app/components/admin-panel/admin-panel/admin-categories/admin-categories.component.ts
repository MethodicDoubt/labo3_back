import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss']
})
export class AdminCategoriesComponent implements OnInit {

  categories: Category[] = [];

  constructor(private _categoryService: CategoryService) { }

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

  }

}


