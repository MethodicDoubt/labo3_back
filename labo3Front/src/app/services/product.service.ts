import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdvancedSearch } from '../models/advanced-search.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private BASE_URL = "http://localhost:8080/products";

  public searchObject: AdvancedSearch

  constructor(private _httpClient: HttpClient) { }

  getAll(): Observable<Product[]> {
    return this._httpClient.get<Product[]>(this.BASE_URL);
  }

  getById(id: number): Observable<Product> {
    return this._httpClient.get<Product>(this.BASE_URL + "/" + id);
  }

  searchByString(name: String): Observable<Product[]> {
    let json = { "name": name };
    return this._httpClient.post<Product[]>(this.BASE_URL + "/search", json);
  }

  search(advSearch: AdvancedSearch): Observable<Product[]> {
    return this._httpClient.post<Product[]>(this.BASE_URL + "/advsearch", advSearch);
  }

}
