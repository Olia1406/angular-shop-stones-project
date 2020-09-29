import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { IProduct } from '../../shared/interfaces/product.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Array<IProduct>;
  lastProducts: Array<IProduct>;
  fourProd: Array<IProduct>;
  constructor(private prodService: ProductService) { }

  ngOnInit(): void {
    this.getFireClProducts();
  }

  private getFireClProducts() {
    this.prodService.getLastFireCloudProduct()
      // this.prodService.getFireCloudProduct()
      .subscribe(
        collection => {
          this.products = collection.map(document => {
            const data = document.payload.doc.data() as IProduct;
            const id = document.payload.doc.id;
            return { id, ...data };
          })
          this.lastProducts = this.products;
          this.fourProd = this.lastProducts.slice(0, 4);
        }
      )
  }

  first(): void {
    this.fourProd = this.lastProducts.slice(0, 4)
  }
  second(): void {
    this.fourProd = this.lastProducts.slice(4, 8)
  }
  third(): void {
    this.fourProd = this.lastProducts.slice(8, 12)
  }


}
