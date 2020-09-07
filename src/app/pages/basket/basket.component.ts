import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { OrdersService } from 'src/app/shared/services/orders.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
 orders: Array<IProduct> = [];
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
    this.ordersService.basket.next('віфвіф');
  }

  deleteProduct(product: IProduct): void {
    if (confirm('Are you sure')){
      const index = this.orders.findIndex(prod => prod.id === product.id);
      this.orders.splice(index, 1);
      this.updateBasket();
    }
  }

}
