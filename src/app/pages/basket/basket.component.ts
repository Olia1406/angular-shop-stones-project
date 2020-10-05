import { Component, OnInit, TemplateRef } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { NgForm } from '@angular/forms';
import { Order } from '../../shared/models/order.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IOrder } from '../../shared/interfaces/order.interface';
import { AngularFirestore } from '@angular/fire/firestore';
// import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';


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
  // previousOrder: IOrder;
  currentProd: IProduct;
  modalRef: BsModalRef;

  constructor(private ordersService: OrdersService,
    private modalService: BsModalService,
    private firecloud: AngularFirestore,
    // private router: Router
    ) {}

  ngOnInit(): void {
    this.getBasket();
    this.getLogUser();
    // this.getLogUserOrderData();
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
    // this.ordersService.addOrder(order).subscribe(
    // () => {
    // this.resetOrder();
    // }
    // );
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


  // дістаю дані по станньому замовленню юзера, якщо він залогований,
  // щоб відобразити в полях форми
  // private getLogUserOrderData(): void {
    // this.userOrders=[];
    // if (this.userOrdEm != '') {
      // this.firecloud.collection('orders').ref.where('userOrderEmail', '==', this.userOrdEm)
        // .onSnapshot(
          // collection => {
            // collection.forEach(document => {
              // const data = document.data() as IOrder;
              // const id = document.id;
              // this.userOrders.push({ id, ...data });
              // this.previousOrder = this.userOrders.slice(-1)[0];
              // this.userCity = this.previousOrder.userCity;
              // this.deliveryDepartment = this.previousOrder.deliveryDepartment;
              // this.userName = this.previousOrder.userName;
              // this.userPhone = this.previousOrder.userPhone;
            // });
          // }
        // )
    // }
  // }




}



// }
