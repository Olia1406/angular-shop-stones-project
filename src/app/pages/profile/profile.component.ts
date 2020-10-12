import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { IOrder } from 'src/app/shared/interfaces/order.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  email: string;
  firstName: string;
  lastName: string;

  userOrders:Array<IOrder>=[];

  constructor(private authService: AuthService,
    private firecloud: AngularFirestore) { }

  ngOnInit(): void {
    this.getUserData();
    this.getLogUserOrderData();
  }

  private getUserData(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    this.email = user.userEmail;
    this.firstName = user.userFirstName;
    this.lastName = user.userLastName;
  }

  signOut(): void {
    this.authService.SignOut();
  }

  private getLogUserOrderData(): void {
    this.userOrders=[];
    if (this.email!= '') {
      this.firecloud.collection('orders').ref.where('userOrderEmail', '==', this.email)
        .onSnapshot(
          collection => {
            collection.forEach(document => {
              const data = document.data() as IOrder;
              const id = document.id.toString();
              this.userOrders.push({ id, ...data });
            });
          }
        )
    }
  }

//Date formate
readableDate(time) {
  var d = new Date(time);
  let dd = d.getDate();
  let mm = +d.getMonth() +1;
  let yy = d.getFullYear();
  let hh = d.getHours();
  let mmn = d.getMinutes();
  if(mmn>=0 && mmn<10){
  return dd + "/" + mm + "/" + yy + " " + hh + ":0" + mmn;
  }
  else
  return dd + "/" + mm + "/" + yy + " " + hh + ":" + mmn;
}


}
