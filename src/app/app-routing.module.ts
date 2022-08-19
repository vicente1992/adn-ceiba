import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityGuard } from '@core/guard/security.guard';
import { HomeComponent } from '@home/home.component';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('@feature/auth/auth.module').then(mod => mod.AuthModule) },
  {
    path: '', component: HomeComponent,
    canActivate: [SecurityGuard],
    children: [
      { path: 'producto', loadChildren: () => import('@producto/producto.module').then(mod => mod.ProductoModule) },
      {
        path: 'customers', loadChildren: () => import('@feature/customers/customers.module')
          .then(mod => mod.CustomersModule)
      },
      {
        path: 'loans', loadChildren: () => import('@feature/loans/loans.module')
          .then(mod => mod.LoansModule)
      },
      { path: '', redirectTo: '/customers', pathMatch: 'full' },
    ],

  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
