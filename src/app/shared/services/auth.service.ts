import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: any;
  userStatusChanges: Subject<string> = new Subject<string>();

  constructor(private afAuth: AngularFireAuth,
    private afFirestore: AngularFirestore,
    private router: Router,
    private toastr: ToastrService
    ) { }


  login(email: string, password: string): void {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(user => {
        this.afFirestore.collection('users').ref.where('id', '==', user.user.uid).onSnapshot(
          snap => {
            snap.forEach(userRef => {
              this.currentUser = userRef.data();
              if (this.currentUser.role === 'admin' && this.currentUser.access) {
                localStorage.setItem('admin', JSON.stringify(this.currentUser));
                this.router.navigateByUrl('/admin');
                this.userStatusChanges.next('admin');
              }
              else if (this.currentUser.role === 'user') {
                localStorage.setItem('user', JSON.stringify(this.currentUser));
                this.router.navigateByUrl('/profile');
                this.userStatusChanges.next('profile');
              }
            });
          }
        );
      })
      .catch(err => {console.log(err);
        this.toastr.error(`Не вдалось увійти:${err}`)
                    //  alert('Не вдалось увійти,спершу зареєструйтесь або вкажіть вірні емейл та пароль')
                    });
  }

  SignOut(): void {
    this.afAuth.signOut().then(() => {
      localStorage.removeItem('admin');
      localStorage.removeItem('user');
      this.router.navigateByUrl('home');
      this.userStatusChanges.next('logout');
    });
  }

  signUp(email: string, password: string, firstName: string, lastName: string, city: string, tel: string): any {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(userResponse => {
        const user = {
          id: userResponse.user.uid,
          userEmail: userResponse.user.email,
          userFirstName: firstName,
          userLastName: lastName,
          role: 'user',
          userCity: city,
          userTel: tel
        };
        this.afFirestore.collection('users').add(user)
          .then(() => {
            this.toastr.success('Реєстрація пройшла успішно!');
            // alert('Good register');
          })
          .catch(err => {console.log(err);
                        //  alert(`Не вдалось зареєструватись: ${err}`)
                        this.toastr.error(`Не вдалось зареєструватись:${err}`)
                        });
      })
      .catch(err => {console.log(err);
        this.toastr.error(`${err}`)
        // alert(`Не вдалось зареєструватись: ${err}`)
      });
  }



}
