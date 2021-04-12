import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL: String = "http://localhost:8080/";
  currentUser: User;
  isConnected: boolean;
  statusBehaviorConnexion: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isAdmin: boolean;
  statusBehaviorAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  statusAdmin: Subject<boolean> = new Subject<boolean>();

  constructor(private _httpClient: HttpClient,
    private _router: Router) { }

  emitStatusConnexion() {
    this.statusBehaviorConnexion.next(this.isConnected);
  }
  emitStatusAdmin() {
    this.statusBehaviorAdmin.next(this.isAdmin);
  }

  login(surname: String, password: String) {
    let userInfo = {
      surname: surname,
      password: password
    };
    this._httpClient.post(this.BASE_URL + 'login', userInfo, { observe: 'response' }).subscribe(
      data => {
        if (data.headers) {          
          // get token and put in the localStorage
          let token = data.headers.get('Authorization');
          token = token.replace('Bearer ', '');
          localStorage.setItem('token', token);
          // get currentUser
          this._httpClient.get<User>(this.BASE_URL + "users/" + surname).subscribe(
            user => {
              this.currentUser = user;
              localStorage.setItem('role', this.currentUser.accessLevel);
              localStorage.setItem('isConnected', "true");
              this.isConnected = true;
              this.currentUser.accessLevel == "ADMINISTRATOR" ? this.isAdmin = true : '';
              this.emitStatusConnexion();
              this.emitStatusAdmin();
            }
          );
        } else {
          alert("T NUL ! MAUVE AIS MAUX DE PASSE !")
        }

      }
    );
  }

  logout() {
    // console.log("logout")
    this.currentUser = null;
    this.isConnected = false;
    this.isAdmin = false;
    this.emitStatusConnexion();
    this.emitStatusAdmin();
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('isConnected');
    this._router.navigate(['']);
  }
}
