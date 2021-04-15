import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  formChangePassword: FormGroup;

  constructor(private _formBuilder: FormBuilder,
    private _nbDiagRef: NbDialogRef<ForgotPasswordComponent>,
    private _userService: UserService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formChangePassword = this._formBuilder.group({
      surname: ['', Validators.required],
      password: ['', Validators.required],
      passwordVerify: ['', Validators.required]
    })
  }

  cancel() {
    this._nbDiagRef.close();
  }

  onSubmit() {
    let userToChangePassword = new User();
    userToChangePassword.surname = this.formChangePassword.value['surname'];
    userToChangePassword.password = this.formChangePassword.value['password'];
    this._userService.changePassword(userToChangePassword).subscribe(
      next => {
        alert('Your password is changed');
      },
      err => {
        alert('Error : ' + err.error.message);
      },
      () => {
        this._nbDiagRef.close();
      }
    );
  }

}
