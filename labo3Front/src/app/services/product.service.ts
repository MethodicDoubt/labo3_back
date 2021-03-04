import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AdvancedSearch } from '../models/advanced-search.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  //-------------------------------------------------------PROPERTIES

  private BASE_URL = "http://localhost:8080/products";

  public searchObject: AdvancedSearch

  public basket: Product[] = [];

  public totalPrice: number = 0;

  public basketStatus: Subject<number> = new Subject<number>();

  public totalPriceStatus: Subject<number> = new Subject<number>();


  //-------------------------------------------------------CONSTRUCTOR


  constructor(private _httpClient: HttpClient) { }

  //-----------------------------------------------------SERVICES

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

  deleteById(id: number): Observable<boolean> {
    return this._httpClient.delete<boolean>(this.BASE_URL + '/' + id);
  }

  insert(product: Product): Observable<boolean> {
    return this._httpClient.post<boolean>(this.BASE_URL, product);
  }

  //--------------------------------------------------------METHODES

  emitBasketLengthStatus() {

    this.basketStatus.next(this.basket.length);

  }

  emitTotalPriceStatus() {

    this.totalPriceStatus.next(this.totalPrice);

  }

  calculTotalPrice(n: number) {

    this.totalPrice += n;

  }

}
