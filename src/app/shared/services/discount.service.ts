import { Injectable } from '@angular/core';
import { IDiscount } from '../interfaces/discount.interface';
import { Observable } from 'rxjs';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  private url: string;
  constructor(
    private firecloud: AngularFirestore) {
  }
  
  getFireCloudDiscount(): Observable<DocumentChangeAction<unknown>[]> {
    return this.firecloud.collection('discounts').snapshotChanges();
  }
  postFireCloudDiscount(discount: IDiscount): Promise<DocumentReference> {
    return this.firecloud.collection('discounts').add(discount);
  }
  updateFireCloudDiscount(discount: IDiscount): Promise<void> {
    return this.firecloud.collection('discounts').doc(discount.id.toString()).update(discount);
  }
  deleteFireCloudDiscount(discount: IDiscount): Promise<void> {
    return this.firecloud.collection('discounts').doc(discount.id.toString()).delete();
  }

}