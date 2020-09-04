import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { MoreAboutStonesComponent } from './pages/more-about-stones/more-about-stones.component';

import { CatalogueComponent } from './pages/catalogue/catalogue.component';
import { ProductComponent } from './pages/catalogue/product/product.component';
import { NecklaceComponent } from './pages/catalogue/necklace/necklace.component';
import { BraceletComponent } from './pages/catalogue/bracelet/bracelet.component';
import { EarringComponent } from './pages/catalogue/earring/earring.component';
import { DiscountComponent } from './pages/catalogue/discount/discount.component';

import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminDiscountComponent } from './admin/admin-discount/admin-discount.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';

const routes: Routes = [
  {path: '', redirectTo:'home', pathMatch:'full'},
  {path: 'home', component: HomeComponent},
  {path: 'payment', component: PaymentComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: 'feedback', component: FeedbackComponent},
  {path: 'more', component: MoreAboutStonesComponent},
  {path: 'catalogue', component: CatalogueComponent, children:[
    {path: '', redirectTo: 'necklace', pathMatch: 'full'},
    {path: 'product', component: ProductComponent},
    {path: 'necklace', component: NecklaceComponent},
    {path: 'bracelet', component: BraceletComponent},
    {path: 'earring', component: EarringComponent},
    {path: 'discount', component: DiscountComponent},
  ]},
  {path: 'admin', component: AdminComponent, children:[
     {path: '', redirectTo: 'admin-category', pathMatch:'full'},
     {path: 'admin-category', component: AdminCategoryComponent},
     {path: 'admin-product', component: AdminProductComponent},
     {path: 'admin-order', component: AdminOrderComponent},
     {path: 'admin-discount', component: AdminDiscountComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
