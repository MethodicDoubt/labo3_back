import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.scss']
})
export class EditProfilComponent implements OnInit {

  currentUser: User = new User();
  formEditProfil: FormGroup;

  constructor(private _authService: AuthService,
    private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.currentUser = this._authService.currentUser;
    this.initFormWithValue();
  }

  initFormWithValue() {
    this.formEditProfil = this._formBuilder.group({
      lastName: [this.currentUser.firstName, [Validators.required]],
      firstName: [this.currentUser.lastName, [Validators.required]],
      surname: [this.currentUser.surname, [Validators.required]],
      street: [this.currentUser.address.street, [Validators.required]],
      number: [this.currentUser.address.number, [Validators.required]],
      zip: [this.currentUser.address.zip, [Validators.required]],
      city: [this.currentUser.address.city, [Validators.required]],
      country: [this.currentUser.address.country, [Validators.required]]
    })
  }

  onSubmit() {
    
  }

}
