import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  fgLogin: FormGroup;


  constructor(private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _nbDiagRef: NbDialogRef<LoginComponent>) { }

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

}
