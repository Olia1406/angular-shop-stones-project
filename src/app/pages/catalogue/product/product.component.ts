import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ProductService } from 'src/app/shared/services/product.service';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product: IProduct;
  @Input() currentName: string;
  products: Array<any> = [];
  // products: Array<IProduct> = [];
  category: string;

  // orderName: string = 'up';
  // orderDirection: boolean = true;
  constructor(private prodService: ProductService,
    private ordersService: OrdersService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private firecloud: AngularFirestore) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const categoryName = this.actRoute.snapshot.paramMap.get('category');
        // this.getProducts(categoryName);
        this.getFireCloudProducts(categoryName);
      }
    });
  }

  ngOnInit(): void {
  }
  // 
  // private getProducts(categoryName: string = 'necklace'): void {
  // this.prodService.getCategoryProduct(categoryName).subscribe(data => {
  // this.products = data;
  // this.category = this.products[0].category.nameUA;
  // });
  // }

  private getFireCloudProducts(categoryName: string = 'necklace'): void {
    this.products = [];
    this.firecloud.collection('products').ref.where('category.nameEN', '==', categoryName).onSnapshot(
      collection => {
        collection.forEach(document => {
          const data = document.data();
          const id = document.id;
          this.products.push({ id, ...data });
        });
        this.category = this.products[0].category.nameUA;
      }
    );
  }

  addToBasket(product: IProduct): void {
    this.ordersService.addBasket(product);
    product.count = 1;
  }
  // це не використовую
  // choosePriceSortType(value) {
  // if (value === this.orderName) {
  // this.orderDirection = !this.orderDirection;
  // }
  // this.orderName = value;
  // }

  sortProdUp(): Array<IProduct> {
    // console.log(this.currentName)
    return this.products.sort((a, b) => a.price - b.price);
  }

  sortProdDown(): Array<IProduct> {
    return this.products.sort((a, b) => b.price - a.price)
  }

  firstPage(): Array<IProduct> {
    // alert('ijfie');
    this.products=this.products.filter(prod => prod.category.nameEN == this.category);
    return this.products.slice(0, 2)
  }

  secondPage(): Array<IProduct> {
    return this.products.slice(3, 6)
  }


}
