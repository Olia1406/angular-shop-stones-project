import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ProductService } from 'src/app/shared/services/product.service';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { OrdersService } from 'src/app/shared/services/orders.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: Array<IProduct> = [];
  category: string;

  constructor(private prodService: ProductService,
              private ordersService: OrdersService,
              private actRoute: ActivatedRoute,
              private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const categoryName = this.actRoute.snapshot.paramMap.get('category');
        this.getProducts(categoryName);
      }
    });
  }

  ngOnInit(): void {
  }

  private getProducts(categoryName: string = 'necklace'): void {
    this.prodService.getCategoryProduct(categoryName).subscribe(data => {
      this.products = data;
      // this.category = this.products[0].category.nameUA;
    });
  }
  addToBasket(product: IProduct): void {
    this.ordersService.addBasket(product);
    product.count = 1;
  }

}
