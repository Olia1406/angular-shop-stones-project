import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url: string;
  constructor(private firecloud: AngularFirestore) {
  }

getFireCloudCategory(): Observable<DocumentChangeAction<unknown>[]> {
  return this.firecloud.collection('categories').snapshotChanges();
}
postFireCloudCategory(category: ICategory): Promise<DocumentReference>{
  return this.firecloud.collection('categories').add(category);
}
deleteFireCloudCategory(id: string): Promise<void> {
  return this.firecloud.collection('categories').doc(id).delete();
}


}
