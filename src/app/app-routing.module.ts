import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import { HomeComponent } from './pages/home/home.component';
import { NecklaceComponent } from './pages/necklace/necklace.component';
import { BraceletComponent } from './pages/bracelet/bracelet.component';
import { EarringComponent } from './pages/earring/earring.component';
import { DiscountComponent } from './pages/discount/discount.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { MoreAboutStonesComponent } from './pages/more-about-stones/more-about-stones.component';


const routes: Routes = [
  {path: '', redirectTo:'home', pathMatch:'full'},
  {path: 'home', component: HomeComponent},
  {path: 'necklace', component: NecklaceComponent},
  {path: 'bracelet', component: BraceletComponent},
  {path: 'earring', component: EarringComponent},
  {path: 'discount', component: DiscountComponent},
  {path: 'payment', component: PaymentComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: 'feedback', component: FeedbackComponent},
  {path: 'more', component: MoreAboutStonesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
