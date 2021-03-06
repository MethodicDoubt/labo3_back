import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from 'src/app/services/auth.service';
import { CreateUserComponent } from '../create-user/create-user.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-auth-manager',
  templateUrl: './auth-manager.component.html',
  styleUrls: ['./auth-manager.component.scss']
})
export class AuthManagerComponent implements OnInit {

  isConnected: boolean;
  statusConnexion: Subscription;
  isAdmin: boolean;
  statusAdmin: Subscription;

  constructor(private _authService: AuthService,
    private _dialogBox: NbDialogService,
    private _router: Router) { }

  ngOnInit(): void {
    this.statusConnexion = this._authService.statusBehaviorConnexion.subscribe(
      dataConnexion => this.isConnected = dataConnexion
    )
    this.statusAdmin = this._authService.statusBehaviorAdmin.subscribe(
      dataAdmin => this.isAdmin = dataAdmin
    )
    localStorage.getItem('role') == null ? this.isConnected = false : this.isConnected = true;
  }

  popupLogin() {
    let ref = this._dialogBox.open(
      LoginComponent
    );
    ref.onClose.subscribe();
  }

  popupLogout() {
    this._authService.logout();
  }

  popupCreate() {
    let ref = this._dialogBox.open(
      CreateUserComponent
    );
    ref.onClose.subscribe();
  }

  redirectToPanelAdmin() {
    this._router.navigate(['admin']).then();
  }

  goToMyAccount() {
    this._router.navigate(['my-account']).then();
  }

}
