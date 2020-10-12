import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/product.interface';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firecloud: AngularFirestore) {
  }
  
  getFireCloudProduct(): Observable<DocumentChangeAction<unknown>[]> {
    return this.firecloud.collection('products').snapshotChanges();
  }

  getLastFireCloudProduct(): Observable<DocumentChangeAction<unknown>[]> {
    return this.firecloud.collection('products', ref => ref.orderBy('id', 'desc').limit(13)).snapshotChanges();
  }
  
  getNewFireCloudProduct(): Observable<DocumentChangeAction<unknown>[]> {
    return this.firecloud.collection('products', ref => ref.limit(3)).snapshotChanges();
  }
    
  
  postFireCloudProduct(product: IProduct): Promise<DocumentReference> {
    return this.firecloud.collection('products').add(product);
  }
  
  deleteFireCloudProduct(id: string): Promise<void> {
    return this.firecloud.collection('products').doc(id).delete();
  }
  
  updateFireCloudProduct(product: IProduct): Promise<void> {
    return this.firecloud.collection('products').doc(product.id.toString()).update(product);
  }
  
  getOneFireCloudProduct(id: string): any {
    return this.firecloud.collection('products').doc(id).get();
  }

}


