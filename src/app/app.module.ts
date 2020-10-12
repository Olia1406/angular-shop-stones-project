import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { ContactsComponent } from './pages/contacts/contacts.component';
import { HomeComponent } from './pages/home/home.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { MoreAboutStonesComponent } from './pages/more-about-stones/more-about-stones.component';
import { UserDiscountComponent } from './pages/user-discount/user-discount.component';

import { CatalogueComponent } from './pages/catalogue/catalogue.component';
import { ProductComponent } from './pages/catalogue/product/product.component';
import { ProductDetailsComponent } from './pages/catalogue/product-details/product-details.component';
import { CounterComponent } from './components/counter/counter.component';
import { BasketComponent } from './pages/basket/basket.component';

import { ProfileComponent } from './pages/profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminDiscountComponent } from './admin/admin-discount/admin-discount.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';

import { ModalModule } from 'ngx-bootstrap/modal';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment.prod';

import { NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';
import { loaderConfig } from './preloader-config';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { SearchProductPipe } from './shared/pipes/search-product.pipe';

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule} from 'ngx-toastr';
import { NgMagnizoomModule } from 'ng-magnizoom';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContactsComponent,
    PaymentComponent,
    MoreAboutStonesComponent,
    CatalogueComponent,
    ProductComponent,
    AdminComponent,
    AdminCategoryComponent,
    AdminProductComponent,
    AdminDiscountComponent,
    AdminOrderComponent,
    ProductDetailsComponent,
    CounterComponent,
    BasketComponent,
    ProfileComponent,
    CarouselComponent,
    UserDiscountComponent,
    SearchProductPipe
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
    AngularFireStorageModule,
    NgxUiLoaderModule.forRoot(loaderConfig),
    NgxUiLoaderRouterModule,
    CarouselModule.forRoot(),
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(
      {
        timeOut: 5000,
        progressBar: true
      }
    ),
    NgMagnizoomModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
