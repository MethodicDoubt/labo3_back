import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private BASE_URL = "http://localhost:8080"

  constructor(private _httpClient : HttpClient) { }

  getAll(): Observable<Product[]> {

    return this._httpClient.get<Product[]>(this.BASE_URL);

  }

}
