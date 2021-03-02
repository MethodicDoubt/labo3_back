import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbSidebarModule, NbMenuModule, NbButtonModule, NbIconModule, NbInputModule, NbListModule, NbCardModule, NbDialogModule, NbPopoverModule, NbSelectModule, NbCheckboxModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AllProductComponent } from './components/product/all-product/all-product.component';
import { ProductByIdComponent } from './components/product/product-by-id/product-by-id.component';
import { NavComponent } from './components/navigation-bar/nav/nav.component';
import { SearchBarComponent } from './components/search-bar/search-bar/search-bar.component';
import { AdvSearchComponent } from './components/advanced-search/adv-search/adv-search.component';
import { CreateUserComponent } from './components/user/create-user/create-user.component';
import { LoginComponent } from './components/user/login/login.component';
import { AuthManagerComponent } from './components/user/auth-manager/auth-manager.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel/admin-panel.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found/page-not-found.component';
import { AdminProductsComponent } from './components/admin-panel/admin-panel/admin-products/admin-products.component';
import { AdminCategoriesComponent } from './components/admin-panel/admin-panel/admin-categories/admin-categories.component';
import { AdminOrdersComponent } from './components/admin-panel/admin-panel/admin-orders/admin-orders.component';
import { AdminUsersComponent } from './components/admin-panel/admin-panel/admin-products/admin-users/admin-users.component';
import { AdminSuppliersComponent } from './components/admin-panel/admin-panel/admin-suppliers/admin-suppliers.component';

@NgModule({
  declarations: [
    AppComponent,
    AllProductComponent,
    ProductByIdComponent,
    AllProductComponent,
    NavComponent,
    SearchBarComponent,
    AdvSearchComponent,
    CreateUserComponent,
    LoginComponent,
    AuthManagerComponent,
    AdminPanelComponent,
    PageNotFoundComponent,
    AdminProductsComponent,
    AdminCategoriesComponent,
    AdminOrdersComponent,
    AdminUsersComponent,
    AdminSuppliersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbButtonModule,
    NbIconModule,
    NbInputModule,
    NbListModule,
    NbCardModule,
    ReactiveFormsModule,
    NbDialogModule.forRoot(),
    HttpClientModule,
    FormsModule,
    NbPopoverModule,
    NbSelectModule,
    NbCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
