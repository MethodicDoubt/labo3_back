import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from '../models/supplier.model';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {


  private BASE_URL: string = "http://localhost:8080/suppliers";

  constructor(private _httpClient: HttpClient) { }

  getAll(): Observable<Supplier[]> {
    return this._httpClient.get<Supplier[]>(this.BASE_URL);
  }


  getAllCompanyName(): Observable<string[]> {
    return this._httpClient.get<string[]>(this.BASE_URL + "/companyName");
  }

  insert(newSupplier: Supplier): Observable<boolean> {
    return this._httpClient.post<boolean>(this.BASE_URL, newSupplier);
  }
}
