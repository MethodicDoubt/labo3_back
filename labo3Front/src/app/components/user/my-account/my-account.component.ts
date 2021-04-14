import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

  currentUser: User = new User();

  constructor(public authService: AuthService,
    private _router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUser;
  }

  editProfil() {
    this._router.navigate(['edit-profil']).then();
  }

}
