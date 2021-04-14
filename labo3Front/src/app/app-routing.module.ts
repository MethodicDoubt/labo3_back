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
import { AuthGuardService } from './utils/auth-guard.guard';
import { ProductResolverService } from './utils/product-resolver.service';
import { MyAccountComponent } from './components/user/my-account/my-account.component';
import { PaymentComponent } from './components/basket/payment/payment.component';
import { ConnectGuard } from './utils/connect.guard';
import { AllProductWithPaginationComponent } from './components/product/all-product-with-pagination/all-product-with-pagination.component';
import { EditCategoryComponent } from './components/admin-panel/admin-panel/admin-categories/edit-category/edit-category.component';
import { EditsupplierComponent } from './components/admin-panel/admin-panel/admin-suppliers/editsupplier/editsupplier.component';
import { EditProductComponent } from './components/admin-panel/admin-panel/admin-products/edit-product/edit-product.component';
import { EditProfilComponent } from './components/user/edit-profil/edit-profil.component';
import { ForgotPasswordComponent } from './components/user/forgot-password/forgot-password.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: AllProductComponent },
  { path: 'product/:id', resolve: { resultat: ProductResolverService }, component: ProductByIdComponent },
  { path: 'basket', canActivate: [ConnectGuard], component: BasketComponent },
  { path: 'payment', canActivate: [ConnectGuard], component: PaymentComponent },
  { path: 'pagination', component: AllProductWithPaginationComponent },
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
        path: 'products/:id', component: EditProductComponent
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
  { path: 'my-account', canActivate: [ConnectGuard], component: MyAccountComponent },
  { path: 'edit-profil', canActivate: [ConnectGuard], component: EditProfilComponent },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
