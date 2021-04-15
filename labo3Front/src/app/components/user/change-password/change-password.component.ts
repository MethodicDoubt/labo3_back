import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbDialogRef } from '@nebular/theme';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  formChangePassword: FormGroup;

  constructor(private _formBuilder: FormBuilder,
    private _nbDiagRef: NbDialogRef<ForgotPasswordComponent>,
    private _userService: UserService,
    private _authService: AuthService,
    private _router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formChangePassword = this._formBuilder.group({
      oldPassword: ['', Validators.required],
      password: ['', Validators.required],
      passwordVerify: ['', Validators.required]
    })
  }

  onSubmit() {
    let userToChangePassword = new User();
    userToChangePassword.surname = this._authService.currentUser.surname;
    userToChangePassword.password = this.formChangePassword.get('oldPassword').value;
    this._authService.verifyPassword(userToChangePassword).subscribe(
      next => {
        userToChangePassword.password = this.formChangePassword.get('password').value;
        this._userService.changePassword(userToChangePassword).subscribe(
          next => {
            alert('Your password is changed');
          },
          err => {
            alert('Error : ' + err.error.message);
          },
          () => {
            this._authService.logout();
            this._router.navigate(['/home']);
            this.cancel();
          }
        );
      },
      err => {
        alert('Error : ' + err.error.message);
        this._authService.logout();
        this._router.navigate(['/home']);
        this.cancel();
      }
    )

  }

  cancel() {
    this._nbDiagRef.close();
  }

}
