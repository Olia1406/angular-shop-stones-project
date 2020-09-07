import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { ContactsComponent } from './pages/contacts/contacts.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { HomeComponent } from './pages/home/home.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { MoreAboutStonesComponent } from './pages/more-about-stones/more-about-stones.component';

import { CatalogueComponent } from './pages/catalogue/catalogue.component';
// import { NecklaceComponent } from './pages/catalogue/necklace/necklace.component';
// import { BraceletComponent } from './pages/catalogue/bracelet/bracelet.component';
// import { EarringComponent } from './pages/catalogue/earring/earring.component';
import { DiscountComponent } from './pages/catalogue/discount/discount.component';
import { ProductComponent } from './pages/catalogue/product/product.component';
import { ProductDetailsComponent } from './pages/catalogue/product-details/product-details.component';
import { CounterComponent } from './components/counter/counter.component';
import { BasketComponent } from './pages/basket/basket.component';

import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminDiscountComponent } from './admin/admin-discount/admin-discount.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { SearchDiscountPipe } from './shared/pipes/search-discount.pipe';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContactsComponent,
    PaymentComponent,
    MoreAboutStonesComponent,
    FeedbackComponent,
    CatalogueComponent,
    ProductComponent,
    // NecklaceComponent,
    // BraceletComponent,
    // EarringComponent,
    DiscountComponent,
    AdminComponent,
    AdminCategoryComponent,
    AdminProductComponent,
    AdminDiscountComponent,
    AdminOrderComponent,
    SearchDiscountPipe,
    ProductDetailsComponent,
    CounterComponent,
    BasketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ModalModule.forRoot(),
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
