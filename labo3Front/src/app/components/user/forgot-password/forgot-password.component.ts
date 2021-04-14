import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  formChangePassword: FormGroup;

  constructor(private _formBuilder: FormBuilder,
    private _nbDiagRef: NbDialogRef<ForgotPasswordComponent>) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formChangePassword = this._formBuilder.group({
      surname: ['',Validators.required],
      password: ['',Validators.required],
      passwordVerify: ['',Validators.required]
    })
  }

}
