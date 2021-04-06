import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

  users: User[] = [];

  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    this.initUsers();
  }

  initUsers() {
    this._userService.getAllUsers().subscribe(
      users => {
        this.users = users;
      }
    )
  }

  clickEdit() {
    alert("We are preparing this feature ! Stay tuned !");
  }

  changeActive(userId: number, isActive: boolean) {
    if (confirm("Do you want to change active ?")) {
      this._userService.userToPatch({ 'isActive': !isActive }, userId).subscribe(
        next => this.initUsers()
      )
    }
  }

}
