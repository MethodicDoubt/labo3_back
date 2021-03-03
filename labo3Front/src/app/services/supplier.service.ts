import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private BASE_URL = "http://localhost:8080/suppliers";

  constructor(private _httpClient: HttpClient) { }


  getAllCompanyName():Observable<string[]>{
    return this._httpClient.get<string[]>(this.BASE_URL + "/companyName");
  }
}
