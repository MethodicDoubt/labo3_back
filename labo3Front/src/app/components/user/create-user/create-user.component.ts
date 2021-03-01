import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  newUser: User = new User();
  fgCreateUser: FormGroup

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initFgCreateUser()
  }

  initFgCreateUser() {
    this.fgCreateUser = this._formBuilder.group({
      lastname: ['', [Validators.required]],
      firstname: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      password: ['', [Validators.required]],
      address: this._formBuilder.group({
        street: ['', [Validators.required]],
        zip: ['', [Validators.required]],
        number: [0, [Validators.required]],
        city: ['', [Validators.required]],
        country: ['', [Validators.required]]
      })
    })
  }

  onSubmit() {
    this.newUser.firstName = this.fgCreateUser.value['firstname'];
    this.newUser.lastName = this.fgCreateUser.value['lastname'];
    this.newUser.password = this.fgCreateUser.value['password'];
    this.newUser.surname = this.fgCreateUser.value['surname'];
    this.newUser.address = this.fgCreateUser.value['address'];

    
  }



}
