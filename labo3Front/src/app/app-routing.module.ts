import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPanelComponent } from './components/admin-panel/admin-panel/admin-panel.component';
import { AllProductComponent } from './components/product/all-product/all-product.component';
import { ProductByIdComponent } from './components/product/product-by-id/product-by-id.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ProductResolverService } from './utils/product-resolver.service';

const routes: Routes = [
  { path: 'home', component: AllProductComponent },
  { path: 'product/:id', resolve: { resultat: ProductResolverService }, component: ProductByIdComponent },
  { path: 'admin', canActivate: [AuthGuardService], component: AdminPanelComponent },
  {},
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
