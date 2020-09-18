import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {
  checkedStatus=false;
// 
  // stoneNames: Array<string> = ["агат", 'аквамарин', 'амазонит', 'аметист', 'бурштин', 'турмалін', 'гранат', 'корал', 'рожевий кварц', 'аквамарин', 'амазонит', 'аметист'];
  // stonecolors: Array<string> = ['фіолетовий', 'коричневий', 'жовтий', 'рожевий', 'зелений', 'чорний', 'синій', 'кораловий', 'оранжевий'];
  // zodiacs: Array<string> = ['козеріг', 'водолій', 'риби', 'овен', 'телець', 'близнюки', 'рак', 'лев', 'діва', 'терези', 'скорпіон', 'стрілець'];

  constructor(private prodService: ProductService) { }
  products: Array<IProduct>;
  currentName: string;
  filteredProducts:Array<IProduct>;

  ngOnInit(): void {
    // this.getFireCloudProducts();
  }

  // private getFireCloudProducts(): void {
    // this.prodService.getFireCloudProduct().subscribe(
      // collection => {
        // this.products = collection.map(document => {
          // const data = document.payload.doc.data() as IProduct;
          // const id = document.payload.doc.id;
          // return { id, ...data };
        // });
      // }
    // );
  // }

  // filterProducts(name: string) {
    // this.checkedStatus=!this.checkedStatus;
    // if (this.checkedStatus == true) {
      // console.log(name);
      // this.currentName = name;
      // this.filteredProducts = this.products.filter(prod => prod.stone.includes(name));
      // console.log(this.filteredProducts);
    // }
    // else{
      // console.log(this.products);
    // }
  // }

// dd(){
  // console.log('erkjg')
// }
}
