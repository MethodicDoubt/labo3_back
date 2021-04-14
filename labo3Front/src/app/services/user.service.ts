import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private BASE_URL: string = "http://localhost:8080/users";

  constructor(private _httpClient: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this._httpClient.get<User[]>(this.BASE_URL);
  }

  createNewUser(newUser: User): Observable<boolean> {
    return this._httpClient.post<boolean>(this.BASE_URL, newUser);
  }

  updateProfil(editedUser: User, userId: number) {
    throw new Error('Method not implemented.');
  }

}
