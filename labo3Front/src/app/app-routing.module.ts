import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllProductComponent } from './components/product/all-product/all-product.component';
import { ProductByIdComponent } from './components/product/product-by-id/product-by-id.component';
import { ProductResolverService } from './utils/product-resolver.service';

const routes: Routes = [
  { path: 'product', component: AllProductComponent },
  { path: 'product/:id', resolve: { resultat: ProductResolverService }, component: ProductByIdComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
