import { Component, Input, OnInit, Query } from '@angular/core';
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
  products: Array<any> = [];
  // products: Array<IProduct> = [];
  someProducts:Array<any>;
  category: string;
  // moreCount:number=3;
  // addPages: number=3;

  stoneNames: Array<string> = ['всі',"агат", 'аквамарин', 'амазонит', 'аметист', 'бурштин', 'турмалін', 'гранат', 'корал', 'рожевий кварц', 'аквамарин', 'амазонит'].sort();
  stoneColors: Array<string> = ['всі','фіолетовий', 'білий', 'коричневий', 'жовтий', 'рожевий', 'зелений', 'чорний', 'синій', 'кораловий', 'оранжевий'].sort();
  zodiacs: Array<string> = ['всі','козеріг', 'водолій', 'риби', 'овен', 'телець', 'близнюки', 'рак', 'лев', 'діва', 'терези', 'скорпіон', 'стрілець'];

  constructor(private prodService: ProductService,
    private ordersService: OrdersService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private firecloud: AngularFirestore) 
    {
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
    this.firecloud.collection('products').ref.where('category.nameEN', '==', categoryName)
    // .where('stone','==','корал')
      // .limit(this.moreCount)
      // .orderBy('')
      .onSnapshot(
        collection => {
          collection.forEach(document => {
            const data = document.data();
            const id = document.id;
            this.products.push({ id, ...data });
          });
          this.category = this.products[0].category.nameUA;
        }
      );
      this.someProducts = this.products;
  }
  more(){
    this.getFireCloudProducts();
  }

  addToBasket(product: IProduct): void {
    this.ordersService.addBasket(product);
    product.count = 1;
  }
  // ---------------------------sort by price----------------------------
  sortProdUp(): Array<IProduct> {
    return this.someProducts.sort((a, b) => a.price - b.price);
  }

  sortProdDown(): Array<IProduct> {
    return this.someProducts.sort((a, b) => b.price - a.price)
  }
  // --------------------------filters----------------------------------
  stoneStatus: boolean;
  currentStone = 'всі';
  checkedStatus: boolean;
  currentColor = 'всі';
  colorStatus: boolean;
  currentZodiac = 'всі';
  zodiacStatus: boolean;
  // ------------------by stone---------------------------
  filterByStone(stone): void {
    this.stoneStatus = false;
    this.currentStone = stone;
    // this.products = this.products.filter(prod => prod.stone.includes(stone));
    this.filter();
  }
  getAllStones(): void {
    this.stoneStatus = false;
    this.currentStone = 'всі';
    this.filter();
    // this.getFireCloudProducts();
  }
  openStoneList(): void {
    this.stoneStatus = true;
  }
  // -----------------by color---------------------------
  filterByColor(color): void {
    this.colorStatus = false;
    this.currentColor = color;
    this.filter();
    // this.products = this.products.filter(prod => prod.color.includes(color));
  }
  getAllColorsProd(): void {
    this.colorStatus = false;
    this.currentColor = 'всі';
    this.filter();
    // this.getFireCloudProducts();
  }
  openColorList(): void {
    this.colorStatus = true;
  }
  // ------------------by zodiac--------------------------
  filterByZodiac(zodiac): void {
    this.zodiacStatus = false;
    this.currentZodiac = zodiac;
    this.filter();
    // this.products = this.products.filter(prod => prod.zodiac.includes(zodiac) || prod.zodiac.includes('всім'));
  }
  getAllZodiacsProd(): void {
    this.zodiacStatus = false;
    this.currentZodiac = 'всі';
    this.filter();
    // this.getFireCloudProducts();
  }
  openZodiacList(): void {
    this.zodiacStatus = true;
  }

  private filter() {
    // const categoryName = this.actRoute.snapshot.paramMap.get('category');
    // this.getFireCloudProducts(categoryName);
    this.someProducts = this.products;
    // 1
    if (this.currentStone !== 'всі' && this.currentColor === 'всі' && this.currentZodiac === 'всі') {
      console.log(this.currentStone);
      this.someProducts = this.products.filter(prod => prod.stone.includes(this.currentStone));
      // console.log(this.products)
    }
    // 2
    else if (this.currentStone != 'всі' && this.currentColor == 'всі' && this.currentZodiac != 'всі') {
      console.log(this.currentStone);
      console.log(this.currentZodiac);
      this.someProducts = this.products.filter(prod => prod.stone.includes(this.currentStone) && (prod.zodiac.includes(this.currentZodiac) || prod.zodiac.includes('всім')));
    }
    //  3   
    else if (this.currentStone != 'всі' && this.currentColor != 'всі' && this.currentZodiac == 'всі') {
      console.log(this.currentStone);
      console.log(this.currentColor);
      this.someProducts = this.products.filter(prod => prod.stone.includes(this.currentStone) && prod.color.includes(this.currentColor));
    }
    // 4
    else if (this.currentStone != 'всі' && this.currentColor != 'всі' && this.currentZodiac != 'всі') {
      console.log(this.currentStone);
      console.log(this.currentColor);
      console.log(this.currentZodiac);
      this.someProducts = this.products.filter(prod => prod.stone.includes(this.currentStone) && prod.color.includes(this.currentColor) && (prod.zodiac.includes(this.currentZodiac) || prod.zodiac.includes('всім')));
    }
    // 5
    else if (this.currentStone == 'всі' && this.currentColor == 'всі' && this.currentZodiac != 'всі') {
      console.log(this.currentZodiac);
      this.someProducts = this.products.filter(prod => prod.zodiac.includes(this.currentZodiac) || prod.zodiac.includes('всім'));
    }
    // 6
    else if (this.currentStone == 'всі' && this.currentColor != 'всі' && this.currentZodiac != 'всі') {
      console.log(this.currentColor);
      console.log(this.currentZodiac);
      this.someProducts = this.products.filter(prod => prod.color.includes(this.currentColor) && (prod.zodiac.includes(this.currentZodiac) || prod.zodiac.includes('всім')));
    }
    // 7
    else if (this.currentStone == 'всі' && this.currentColor != 'всі' && this.currentZodiac == 'всі') {
      console.log(this.currentColor);
      this.someProducts = this.products.filter(prod => prod.color.includes(this.currentColor));
    }
    // 8
    else if (this.currentStone == 'всі' && this.currentColor == 'всі' && this.currentZodiac == 'всі') {
      console.log(this.currentStone);
      console.log(this.currentColor);
      console.log(this.currentZodiac);
      // this.someProducts = this.products;
      const categoryName = this.actRoute.snapshot.paramMap.get('category');
      this.getFireCloudProducts(categoryName);
    }

  }
  // ------------------------------------------------------
  // startAt: number = 0;
  // endAt: number;
  // prodCount: number = 2;
  // prevPage() {
    // this.products = this.products.slice(, 2)
  // }
  // nextPage() {
    // this.endAt = this.startAt + this.prodCount;
    // console.log(this.startAt);
    // console.log(this.endAt);
    // this.products = this.products.slice(this.startAt, this.endAt)
    // this.startAt = this.startAt + this.prodCount;
  // }


}
