import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllProductComponent } from './components/product/all-product/all-product.component';
import { ProductByIdComponent } from './components/product/product-by-id/product-by-id.component';

const routes: Routes = [
  { path: '', component: AllProductComponent },
  { path: 'product/:id', component: ProductByIdComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
