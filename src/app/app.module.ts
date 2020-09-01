import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { HomeComponent } from './pages/home/home.component';
import { NecklaceComponent } from './pages/necklace/necklace.component';
import { BraceletComponent } from './pages/bracelet/bracelet.component';
import { EarringComponent } from './pages/earring/earring.component';
import { DiscountComponent } from './pages/discount/discount.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { MoreAboutStonesComponent } from './pages/more-about-stones/more-about-stones.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContactsComponent,
    NecklaceComponent,
    BraceletComponent,
    EarringComponent,
    DiscountComponent,
    PaymentComponent,
    MoreAboutStonesComponent,
    FeedbackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
