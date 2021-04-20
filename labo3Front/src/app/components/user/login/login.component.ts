import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { AuthService } from 'src/app/services/auth.service';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  fgLogin: FormGroup;
  showPassword: boolean = false;


  constructor(private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _dialogBox: NbDialogService,
    private _nbDiagRef: NbDialogRef<LoginComponent>,
    private _router: Router) { }

  ngOnInit(): void {
    this.initFgLogin();
  }

  initFgLogin() {
    this.fgLogin = this._formBuilder.group({
      surname: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  login() {
    this._authService.login(this.fgLogin.value['surname'], this.fgLogin.value['password']);
    this._nbDiagRef.close();
  }

  forgotPassword() {
    let ref = this._dialogBox.open(ForgotPasswordComponent, {
      closeOnBackdropClick: false
    })
    ref.onClose.subscribe();
  }

  forgotSurname() {
    alert("Work in progress");
  }

  cancel() {
    this._nbDiagRef.close();
  }

  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

}
