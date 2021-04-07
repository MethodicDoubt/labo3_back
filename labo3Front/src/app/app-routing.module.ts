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
import { MyAccountComponent } from './components/user/my-account/my-account.component';
import { PaymentComponent } from './components/basket/payment/payment.component';
import { ConnectGuardGuard } from './services/connect-guard.guard';
import { EditCategoryComponent } from './components/admin-panel/admin-panel/admin-categories/edit-category/edit-category.component';
import { EditsupplierComponent } from './components/admin-panel/admin-panel/admin-suppliers/editsupplier/editsupplier.component';

const routes: Routes = [
  { path: '', component: AllProductComponent },
  { path: 'home', component: AllProductComponent },
  { path: 'product/:id', resolve: { resultat: ProductResolverService }, component: ProductByIdComponent },
  { path: 'basket', canActivate: [ConnectGuardGuard], component: BasketComponent },
  { path: 'payment', canActivate: [ConnectGuardGuard], component: PaymentComponent },
  {
    path: 'admin', canActivate: [AuthGuardService], component: AdminPanelComponent, children: [
      {
        path: 'categories', component: AdminCategoriesComponent
      },
      {
        path: 'categories/:id', component: EditCategoryComponent
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
        path: 'suppliers/:id', component: EditsupplierComponent
      },
      {
        path: 'users', component: AdminUsersComponent
      }
    ]
  },
  { path: 'my-account', canActivate: [ConnectGuardGuard], component: MyAccountComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
