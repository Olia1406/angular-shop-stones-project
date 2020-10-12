import { Component, OnInit, TemplateRef } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { NgForm } from '@angular/forms';
import { Order } from '../../shared/models/order.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IOrder } from '../../shared/interfaces/order.interface';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  orders: Array<IProduct> = [];
  orderID = 1;
  userName: string;
  userPhone: string;
  userCity: string;
  userComments: string = '';
  deliveryType = 'нова пошта';
  deliveryDepartment: string;
  paymentType = 'на карту';
  totalPrice = 0;
  status = 'в обробці';
  userOrdEm = '';

  userOrders: Array<IOrder> = [];
  currentProd: IProduct;
  modalRef: BsModalRef;

  constructor(private ordersService: OrdersService,
    private modalService: BsModalService,
    private firecloud: AngularFirestore,
    ) {}

  ngOnInit(): void {
    this.getBasket();
    this.getLogUser();
  }

  private getBasket(): void {
    if (localStorage.getItem('myOrder')) {
      this.orders = JSON.parse(localStorage.getItem('myOrder'));
      this.getTotal();
    }
  }

  private getTotal(): void {
    this.totalPrice = this.orders.reduce((total, prod) => total + (prod.price * prod.count), 0);
  }

  detectChangeCount(status: boolean): void {
    if (status) {
      this.updateBasket();
    }
  }
  private updateBasket(): void {
    localStorage.setItem('myOrder', JSON.stringify(this.orders));
    this.getTotal();
    this.ordersService.basket.next('оновлено');
  }


  getDelivery(delivery) {
    this.deliveryType = delivery;
  }

  getPayment(payment) {
    this.paymentType = payment;
  }


  addOrder(): void {
    const order = new Order(
      this.orderID,
      this.userName,
      this.userPhone,
      this.userComments,
      this.deliveryType,
      this.userCity,
      this.deliveryDepartment,
      this.paymentType,
      this.totalPrice,
      this.orders,
      new Date().getTime(),
      this.status,
      this.userOrdEm
    );
    delete order.id;
    this.ordersService.postFireCloudOrder({ ...order })
      .then(() => this.resetOrder())
      .catch(err => console.log(err));
  }

  resetOrder(): void {
    localStorage.removeItem('myOrder');
    this.orders = [];
    this.ordersService.basket.next('Замовлення оформлено');
  }

  deleteProduct(product: IProduct, template: TemplateRef<any>): void {
    this.openModal(template);
    this.currentProd = product;
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  decline(): void {
    this.modalRef.hide();
  }

  confirmDeleteProduct(product: IProduct): void {
    this.modalRef.hide();
    product = this.currentProd;
    const index = this.orders.findIndex(prod => prod.id === product.id);
    this.orders.splice(index, 1);
    this.updateBasket();
  }
  // --------------------------------------------------

  getLogUser(): void {
    if (localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'));
      this.userCity = user.userCity;
      this.userName = user.userFirstName;
      this.userPhone = user.userTel;
      this.userOrdEm = user.userEmail;
      
    }
  }




}


