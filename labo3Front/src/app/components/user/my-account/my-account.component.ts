import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  currentUser: User = new User();

  constructor(public authService: AuthService,
    private _router: Router,
    private _nbDialogRef: NbDialogService) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
  }

  editProfil() {
    this._router.navigate(['edit-profil']).then();
  }

  editPassword() {
    let ref = this._nbDialogRef.open(ChangePasswordComponent, {
      closeOnBackdropClick: false
    });
    ref.onClose.subscribe();
  }

}
