import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { MoreAboutStonesComponent } from './pages/more-about-stones/more-about-stones.component';
import { UserDiscountComponent } from './pages/user-discount/user-discount.component';

import { CatalogueComponent } from './pages/catalogue/catalogue.component';
import { ProductComponent } from './pages/catalogue/product/product.component';
import { ProductDetailsComponent } from './pages/catalogue/product-details/product-details.component';

import { ProfileComponent } from './pages/profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminDiscountComponent } from './admin/admin-discount/admin-discount.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';
import { BasketComponent } from './pages/basket/basket.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { ProfileGuard } from './shared/guards/profile.guard';

const routes: Routes = [
  {path: '', redirectTo:'home', pathMatch:'full'},
  {path: 'home', component: HomeComponent},
  {path: 'discount', component: UserDiscountComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: 'basket', component: BasketComponent},
  {path: 'more', component: MoreAboutStonesComponent},
  {path: 'payment', component: PaymentComponent},
  {path: 'menu/:category/:id', component: ProductDetailsComponent},
  {path: 'catalogue', component: CatalogueComponent, children:[
    {path: '', redirectTo: 'menu/necklace', pathMatch: 'full'},
    {path: 'menu/:category', component: ProductComponent}
  ]},
  {path: 'profile', component: ProfileComponent, canActivate:[ProfileGuard] },
  {path: 'admin', component: AdminComponent, canActivate:[AuthGuard], children:[
     {path: '', redirectTo: 'admin-product', pathMatch:'full'},
     {path: 'admin-category', component: AdminCategoryComponent},
     {path: 'admin-product', component: AdminProductComponent},
     {path: 'admin-order', component: AdminOrderComponent},
     {path: 'admin-discount', component: AdminDiscountComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
