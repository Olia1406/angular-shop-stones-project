import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/shared/services/auth.service';
import { IProduct } from '../../shared/interfaces/product.interface';
import { OrdersService } from '../../shared/services/orders.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  totalPrice = 0;
  private basket: Array<IProduct> = [];

  modalRef: BsModalRef;
  switch: boolean;
  loginStatus: boolean;
  loginUrl: string;
  loginName: string;

  userEmail: string;
  userPassword: string;
  firstName: string;
  lastName: string;

  constructor(private ordersService: OrdersService,
    private modalService: BsModalService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.checkBasket();
    this.getLocalProducts();
    this.updateCheckLogin();
    this.checkLogin();
  }

  private checkBasket(): void {
    this.ordersService.basket.subscribe(() => {
      this.getLocalProducts();
    });
  }

  private getLocalProducts(): void {
    if (localStorage.getItem('myOrder')) {
      this.basket = JSON.parse(localStorage.getItem('myOrder'));
      this.totalPrice = this.basket.reduce((total, prod) => {
        return total + (prod.price * prod.count);
      }, 0);
    }
    else {
      this.totalPrice = 0;
    }
  }

  loginModal(template: TemplateRef<any>): void {
    // if(localStorage.getItem('user')!=null){
    this.modalRef = this.modalService.show(template, { class: 'modal-dialog-centered' });
    // }
    // else loginUser()
  }

  switchForm(): void {
    this.switch = !this.switch;
  }

  loginUser(): void {
    this.authService.login(this.userEmail, this.userPassword);
    this.resetForm();
    this.modalRef.hide();
  }
  registerUser(): void {
    this.authService.signUp(this.userEmail, this.userPassword, this.firstName, this.lastName);
    this.resetForm();
    this.switch = !this.switch;
    this.modalRef.hide();

  }
  private resetForm(): void {
    this.userEmail = '';
    this.userPassword = '';
    this.firstName = '';
    this.lastName = '';
  }

  private updateCheckLogin(): void {
    this.authService.userStatusChanges.subscribe(
      () => {
        this.checkLogin();
      }
    );
  }

  private checkLogin(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    const admin = JSON.parse(localStorage.getItem('admin'));
    if (admin != null && admin.role === 'admin' && admin.access) {
      this.loginStatus = true;
      this.loginName = 'адмін';
      this.loginUrl = 'admin';
    }
    else if (user != null && user.role === 'user') {
      this.loginStatus = true;
      this.loginName = 'кабінет';
      this.loginUrl = 'profile';
    }
    else {
      this.loginStatus = false;
      this.loginName = '';
      this.loginUrl = '';
    }
  }




}
