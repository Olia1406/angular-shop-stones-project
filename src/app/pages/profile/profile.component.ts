// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.component.html',
//   styleUrls: ['./profile.component.scss']
// })
// export class ProfileComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
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

  // userOrdEm:string;
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

  // getLogUser(): void {
    // if (localStorage.getItem('user')) {
      // const user = JSON.parse(localStorage.getItem('user'));
      // this.userOrdEm = user.userEmail;
    // }
  // }

  private getLogUserOrderData(): void {
    this.userOrders=[];
    if (this.email!= '') {
      this.firecloud.collection('orders').ref.where('userOrderEmail', '==', this.email).orderBy('dateOrder', 'desc')
      // .orderBy('dateOrder.seconds')
        .onSnapshot(
          collection => {
            collection.forEach(document => {
              const data = document.data() as IOrder;
              const id = document.id;
              this.userOrders.push({ id, ...data });
            });
          }
        )
    }
    console.log(this.userOrders);
    console.log(new Date().getTime());
  }

//Date formate
readableDate(time) {
  var d = new Date(time);
  let dd = d.getDate();
  let mm = +d.getMonth() +1;
  let yy = d.getFullYear();
  let hh = d.getHours();
  let mmn = d.getMinutes();
  return dd + "/" + mm + "/" + yy + " " + hh + ":" + mmn;
}


}
