import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbSidebarModule, NbMenuModule, NbButtonModule, NbIconModule, NbInputModule, NbListModule, NbCardModule, NbDialogModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AllProductComponent } from './components/product/all-product/all-product.component';
import { ProductByIdComponent } from './components/product/product-by-id/product-by-id.component';
import { NavComponent } from './components/navigation-bar/nav/nav.component';
import { SearchBarComponent } from './components/search-bar/search-bar/search-bar.component';
import { AdvSearchComponent } from './components/advanced-search/adv-search/adv-search.component';

@NgModule({
  declarations: [
    AppComponent,
    AllProductComponent,
    ProductByIdComponent,
    AllProductComponent,
    NavComponent,
    SearchBarComponent
    AdvSearchComponent
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
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
