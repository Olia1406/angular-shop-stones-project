import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { NgForm } from '@angular/forms';
import { Order } from '../../shared/models/order.model';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
 orders: Array<IProduct> = [];
 orderID=1;
 userName: string;
 userPhone: string;
 userCity: string;
 userComments:string='';
 deliveryType ='нова пошта';
 deliveryDepartment:string;
 paymentType='на карту';
 totalPrice = 0;
  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.getBasket();
  }

  private getBasket(): void {
    if (localStorage.getItem('myOrder')){
      this.orders = JSON.parse(localStorage.getItem('myOrder'));
      this.getTotal();
    }
  }

  private getTotal(): void {
    this.totalPrice = this.orders.reduce((total, prod) => total + (prod.price * prod.count), 0);
  }

  detectChangeCount(status: boolean): void {
    if (status){
      this.updateBasket();
    }
  }
  private updateBasket(): void {
    localStorage.setItem('myOrder', JSON.stringify(this.orders));
    this.getTotal();
    this.ordersService.basket.next('оновлено');
  }

  deleteProduct(product: IProduct): void {
    if (confirm('Are you sure')){
      const index = this.orders.findIndex(prod => prod.id === product.id);
      this.orders.splice(index, 1);
      this.updateBasket();
    }
  }

  getDelivery(delivery){
    this.deliveryType = delivery;
  }

  getPayment(payment){
    this.paymentType = payment;
  }

  addOrder(): void {
    const order = new Order(this.orderID,
                            this.userName,
                            this.userPhone,
                            this.userComments,
                            this.deliveryType,
                            this.userCity,
                            this.deliveryDepartment,
                            this.paymentType,
                            this.totalPrice,
                            this.orders,
                            new Date());
    delete order.id;
    // this.ordersService.addOrder(order).subscribe(
      // () => {
        // this.resetOrder();
      // }
    // );
    this.ordersService.postFireCloudOrder({...order})
    .then(() => this.resetOrder())
    .catch(err => console.log(err));
  }

  resetOrder(): void{
    localStorage.removeItem('myOrder');
    this.orders = [];
    this.ordersService.basket.next('Замовлення оформлено');
  }


}
