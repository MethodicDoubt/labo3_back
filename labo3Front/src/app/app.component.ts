import { Component } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { AdvSearchComponent } from './components/advanced-search/adv-search/adv-search.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'labo3Front';

  constructor(private _dialogBox : NbDialogService) {


    
  }

  advancedSearch() {

    let ref = this._dialogBox.open(AdvSearchComponent, {
      closeOnBackdropClick : true
    })

    ref.onClose.subscribe((data) => {

    })
  } 
  
}
