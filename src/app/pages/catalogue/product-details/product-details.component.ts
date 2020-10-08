import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ProductService } from 'src/app/shared/services/product.service';
import { ActivatedRoute, Router, Event, NavigationEnd  } from '@angular/router';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: any;
  constructor(private prodService: ProductService,
              private ordersService: OrdersService,
              private actRoute: ActivatedRoute,
              private router: Router,
              private firecloud: AngularFirestore) { 
                // this.router.events.subscribe((event: Event) => {
                  // if (event instanceof NavigationEnd) {
                      // this.getViewProduct();
                  // }
                // });
              }

  ngOnInit(): void {
    this.getViewProduct();
  }

  // private getViewProduct(): void {
    // const id = +this.actRoute.snapshot.paramMap.get('id');
    // this.prodService.getOneProduct(id).subscribe(data => {
      // this.product = data;
    // });
  // }

  private getViewProduct(): void {
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.firecloud.collection('products').doc(id).get().subscribe(
      document => {
        const data = document.data();
        const dataID = document.id;
        this.product = { dataID, ...data };
      }
    );
  }

  addToBasket(product: IProduct): void {
    this.ordersService.addBasket(product);
    product.count = 1;
  }
  
}
