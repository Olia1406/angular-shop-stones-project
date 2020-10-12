import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/product.interface';
import { Subject, Observable } from 'rxjs';
import { IOrder } from '../interfaces/order.interface';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  basket: Subject<any> = new Subject<any>();
  constructor(private firecloud: AngularFirestore) {
  }

  addBasket(product: IProduct): void {
    let localProducts: Array<IProduct> = [];
    if (localStorage.getItem('myOrder')) {
      localProducts = JSON.parse(localStorage.getItem('myOrder'));
      if (localProducts.some(prod => prod.id === product.id)) {
        const index = localProducts.findIndex(prod => prod.id === product.id);
        localProducts[index].count += product.count;
      }
      else {
        localProducts.push(product);
      }
    }
    else {
      localProducts.push(product);
    }
    localStorage.setItem('myOrder', JSON.stringify(localProducts));
    this.basket.next('Додано в кошик')
  }


  getFireCloudOrder(): Observable<DocumentChangeAction<unknown>[]> {
    return this.firecloud.collection('orders', ref => ref.orderBy('dateOrder', 'desc')).snapshotChanges();
  }
  postFireCloudOrder(order: IOrder): Promise<DocumentReference> {
    return this.firecloud.collection('orders').add(order);
  }
  updateFireCloudOrder(order: IOrder): Promise<void> {
    return this.firecloud.collection('orders').doc(order.id.toString()).update(order);
  }
  deleteFireCloudOrder(order: IOrder): Promise<void> {
    return this.firecloud.collection('orders').doc(order.id.toString()).delete();
  }


}
