import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AdvancedSearch } from '../models/advanced-search.model';
import { Product } from '../models/product.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  //-------------------------------------------------------PROPERTIES

  private BASE_URL = "http://localhost:8080/products";

  public searchObject: AdvancedSearch

  public basket: Map<Product, number> = new Map<Product, number>()

  public totalProduct: number;

  public totalPrice: number = 0;

  public basketStatus: Subject<number> = new Subject<number>();

  public totalPriceStatus: Subject<number> = new Subject<number>();


  //-------------------------------------------------------CONSTRUCTOR


  constructor(private _httpClient: HttpClient,
    public authService: AuthService) { }

  //-----------------------------------------------------SERVICES

  getAll(): Observable<Product[]> {
    return this._httpClient.get<Product[]>(this.BASE_URL);
  }

  getAllWithPagination(params: any): Observable<any> {

    return this._httpClient.get<any>(this.BASE_URL, { params });

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
    return this._httpClient.post<boolean>(this.BASE_URL, { product: product, user: this.authService.currentUser });
  }

  patch(productToPatch: Object, id: number): Observable<boolean> {
    // console.log(productToPatch)
    return this._httpClient.patch<boolean>(this.BASE_URL + "/" + id, productToPatch);

  }

  update(productToUpdate: Product, productId: number): Observable<boolean> {
    return this._httpClient.put<boolean>(this.BASE_URL + '/' + productId, { product: productToUpdate, user: this.authService.currentUser });
  }

  //--------------------------------------------------------METHODES

  emitBasketLengthStatus() {

    let elementNumber: number;

    if(this.basket.size > 0) {

      elementNumber = Array.from(this.basket.values()).reduce((x, y) => x + y)

    } else {

      elementNumber = 0;

    }

    console.log(elementNumber)

    this.basketStatus.next(

      elementNumber

    );

  }

  emitTotalPriceStatus() {

    this.totalPriceStatus.next(this.totalPrice);

  }

  calculTotalPrice() {

    if (this.totalPrice > 0) {

      this.totalPrice = 0;

    }

    if(this.basket.size > 0) {

      this.basket.forEach((value, key) => {

        this.totalPrice += key.purchasePrice * value;

      })

      this.emitTotalPriceStatus();

    } else {

      this.totalPrice = 0;

    }

  }

}
