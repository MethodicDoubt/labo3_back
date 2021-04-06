import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  private BASE_URL: string = "http://localhost:8080/categories";

  constructor(private _httpClient: HttpClient) { }

  getAll(): Observable<Category[]> {

    return this._httpClient.get<Category[]>(this.BASE_URL);

  }

  getAllType(): Observable<String[]> {

    return this._httpClient.get<String[]>(this.BASE_URL + "/type");

  }

  insert(newCategory: Category): Observable<boolean> {
    return this._httpClient.post<boolean>(this.BASE_URL, newCategory);
  }

}
