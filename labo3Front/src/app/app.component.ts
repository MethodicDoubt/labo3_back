import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { AdvSearchComponent } from './components/advanced-search/adv-search/adv-search.component';
import { AuthService } from './services/auth.service';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'labo3Front';

  productNumber: number;
  basketStatus: Subscription;

  constructor(private _dialogBox: NbDialogService,
    private _authService: AuthService,
    private _productService: ProductService,
    private _router: Router) {
    this._authService.login("Wizounet", "password");//TODO --> A REMOVE POUR LA PRODUCTION
    this.basketStatus = this._productService.basketStatus.subscribe(data => this.productNumber = data);
  }

  advancedSearch() {
    let ref = this._dialogBox.open(AdvSearchComponent, {
      closeOnBackdropClick: true
    })
    ref.onClose.subscribe()


  }

  redirect() {
    this._router.navigate(['basket']).then();
  }

}
