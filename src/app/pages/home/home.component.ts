import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { IProduct } from '../../shared/interfaces/product.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

products:Array<IProduct>;
  constructor(private prodService: ProductService) { }

  ngOnInit(): void {
    this.getFireClProducts();
  }

  private getFireClProducts(){
    this.prodService.getFireCloudProduct()
    .subscribe(
      collection => {
        this.products = collection.map(document => {
          const data = document.payload.doc.data() as IProduct;
          const id = document.payload.doc.id;
          return { id, ...data };
        }).splice(-4, 4);
      }
    )
  }

}
