import { Component } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { AdvSearchComponent } from './components/advanced-search/adv-search/adv-search.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'labo3Front';

  constructor(private _dialogBox: NbDialogService,
    private _authService: AuthService) {
    this._authService.login("Wizounet", "password");//TODO --> A REMOVE POUR LA PRODUCTION
  }

  advancedSearch() {
    let ref = this._dialogBox.open(AdvSearchComponent, {
      closeOnBackdropClick: true
    })
    ref.onClose.subscribe()
  }

}
