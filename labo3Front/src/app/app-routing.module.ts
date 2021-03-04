import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasketComponent } from './components/basket/basket/basket.component';
import { AdminCategoriesComponent } from './components/admin-panel/admin-panel/admin-categories/admin-categories.component';
import { AdminOrdersComponent } from './components/admin-panel/admin-panel/admin-orders/admin-orders.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel/admin-panel.component';
import { AdminProductsComponent } from './components/admin-panel/admin-panel/admin-products/admin-products.component';
import { AdminSuppliersComponent } from './components/admin-panel/admin-panel/admin-suppliers/admin-suppliers.component';
import { AdminUsersComponent } from './components/admin-panel/admin-panel/admin-users/admin-users.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found/page-not-found.component';
import { AllProductComponent } from './components/product/all-product/all-product.component';
import { ProductByIdComponent } from './components/product/product-by-id/product-by-id.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ProductResolverService } from './utils/product-resolver.service';
import { PaymentComponent } from './components/basket/payment/payment.component';

const routes: Routes = [
  { path: 'home', component: AllProductComponent },
  { path: 'product/:id', resolve: { resultat: ProductResolverService }, component: ProductByIdComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'payment', component: PaymentComponent},
  {
    path: 'admin', canActivate: [AuthGuardService], component: AdminPanelComponent, children: [
      {
        path: 'categories', component: AdminCategoriesComponent
      },
      {
        path: 'orders', component: AdminOrdersComponent
      },
      {
        path: 'products', component: AdminProductsComponent
      },
      {
        path: 'suppliers', component: AdminSuppliersComponent
      },
      {
        path: 'users', component: AdminUsersComponent
      }
    ]
  },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
