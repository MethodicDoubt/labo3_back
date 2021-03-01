import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL: String = "http://localhost:8080/users";
  currentUser: User;
  isConnected: boolean = false;
  statusConnexion: Subject<boolean> = new Subject<boolean>();

  constructor(private _httpClient: HttpClient,
    private _router: Router) { }

  emitStatusConnexion() {
    this.statusConnexion.next(this.isConnected);
  }

  login(surname: String, password: String) {
    let userInfo = {
      surname: surname,
      password: password
    };
    this._httpClient.post<boolean>(this.BASE_URL + '/login', userInfo).subscribe(
      data => {
        if (data) {
          this._httpClient.get<User>(this.BASE_URL + "/" + surname).subscribe(
            data => {
              this.currentUser = data;
              localStorage.setItem('role', this.currentUser.accessLevel)
              this.isConnected = true;
              this.emitStatusConnexion();
            }
          )
        } else {
          alert("Wrong Surname or Password");
        }
      }
    );

  }

  logout() {
    this.currentUser = null;
    this.isConnected = false;
    this.emitStatusConnexion();
    localStorage.clear();
    this._router.navigate(['']);
  }
}
