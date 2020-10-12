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
  category: string;

  stoneNames: Array<string> = ['всі', 'авантюрин', 'агат', 'аквамарин', 'амазоніт', 'аметист', 'бірюза', 'бурштин', 'биче око',
    'варисцит','волове око', 'гематит', 'гірський кришталь', 'гранат', 'жадеїт', 'змієвик', 'кахолонг', 'кварц', 'корал', 'котяче око', 'лабрадор',
    'лава вулканічна', 'лазурит', 'ларімар', 'малахіт', 'місячний камінь', 'нефрит', 'обсидіан', 'онікс', 'опал', 'перламутр', 'перли', 'пірит',
    'раухтопаз', 'родоніт', 'рожевий кварц', 'рубін', 'рутиловий кварц', 'сапфір', 'сардрнікс', 'сердолік', 'смарагд', 'содаліт', 'соколине око',
    'тигрове око', 'турмалін', 'флюорит', 'халцедон', 'хризоколла', 'хризопраз', 'циркон', 'цитрин', 'цоізіт', 'чароїт', 'шпінель', 'шунгіт', 'яшма',
    'янтар'];
  stoneColors: Array<string> = ['всі','бежевий','білий','бірюзовий','бордовий','голубий','жовтий','зелений','коричневий','оранжевий','прозорий','рожевий','синій','сірий','таракотовий','фіолетовий','червоний','чорний'];
  zodiacs: Array<string> = ['всі', 'козеріг', 'водолій', 'риби', 'овен', 'телець', 'близнюки', 'рак', 'лев', 'діва', 'терези', 'скорпіон', 'стрілець'];
  categoryName: string;
  paginationStatus: boolean = true;

  // --------------------
  //Save first document in snapshot of items received
  firstInResponse: any = [];

  //Save last document in snapshot of items received
  lastInResponse: any = [];

  //Keep the array of first document of previous pages
  prev_strt_at: any = [];

  //Maintain the count of clicks on Next Prev button
  pagination_clicked_count = 0;

  //Disable next and prev buttons
  disable_next: boolean = false;
  disable_prev: boolean = false;

  currentStone = 'всі';
  currentColor = 'всі';
  currentZodiac = 'всі';
  // ------------------------------------------

  constructor(private prodService: ProductService,
    private ordersService: OrdersService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private firecloud: AngularFirestore) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.categoryName = this.actRoute.snapshot.paramMap.get('category');
        // this.getProducts(categoryName);
        this.currentStone = 'всі';
        this.currentColor = 'всі';
        this.currentZodiac = 'всі';
        this.getFireCloudProducts(this.categoryName);

      }
    });
  }

  ngOnInit(): void {
  }

  private getFireCloudProducts(categoryName: string = 'necklace'): void {
    this.currentStone = 'всі';
    this.currentColor = 'всі';
    this.currentZodiac = 'всі';
    this.firecloud.collection('products', ref => ref.where('category.nameEN', '==', categoryName).limit(12))
      .snapshotChanges()
      .subscribe(response => {
        if (!response.length) {
          console.log("No Data Available");
          return false;
        }
        this.firstInResponse = response[0].payload.doc;
        this.lastInResponse = response[response.length - 1].payload.doc;
        this.products = [];
        for (let item of response) {
          this.products.push(item.payload.doc.data());
        }
        //Initialize values
        this.prev_strt_at = [];
        this.pagination_clicked_count = 0;
        if (response.length < 12) {
          this.disable_next = true;
        }
        else {
          this.disable_next = false;
        }
        this.disable_prev = false;
        //Push first item to use for Previous action
        this.push_prev_startAt(this.firstInResponse);
      }, error => {
      });
  }

  //Show previous set 
  prevPage() {
    this.currentStone = 'всі';
    this.currentColor = 'всі';
    this.currentZodiac = 'всі';
    this.disable_prev = true;
    this.firecloud.collection('products', ref => ref
      .where('category.nameEN', '==', this.categoryName)
      .startAt(this.get_prev_startAt())
      .endBefore(this.firstInResponse)
      .limit(12)
    ).get()
      .subscribe(response => {
        this.firstInResponse = response.docs[0];
        this.lastInResponse = response.docs[response.docs.length - 1];
        this.products = [];
        for (let item of response.docs) {
          this.products.push(item.data());
        }
        //Maintaing page no.
        this.pagination_clicked_count--;

        //Pop not required value in array
        this.pop_prev_startAt(this.firstInResponse);

        //Enable buttons again
        this.disable_prev = false;
        this.disable_next = false;
      }, error => {
        this.disable_prev = false;
      });


  }

  nextPage() {
    this.currentStone = 'всі';
    this.currentColor = 'всі';
    this.currentZodiac = 'всі';
    this.disable_next = true;
    this.firecloud.collection('products', ref => ref
      .where('category.nameEN', '==', this.categoryName)
      .limit(12)
      .startAfter(this.lastInResponse)
    ).get()
      .subscribe(response => {
        this.firstInResponse = response.docs[0];

        this.lastInResponse = response.docs[response.docs.length - 1];
        this.products = [];
        for (let item of response.docs) {
          this.products.push(item.data());
        }

        this.pagination_clicked_count++;

        this.push_prev_startAt(this.firstInResponse);
        if (this.products.length < 12) {
          this.disable_next = true;
        }
        else { this.disable_next = false; }
      }, error => {
        this.disable_next = false;
      });
  }
  //Add document
  push_prev_startAt(prev_first_doc) {
    this.prev_strt_at.push(prev_first_doc);
  }

  //Remove not required document 
  pop_prev_startAt(prev_first_doc) {
    this.prev_strt_at.forEach(element => {
      if (prev_first_doc.data().id == element.data().id) {
        element = null;
      }
    });
  }

  //Return the Doc rem where previous page will startAt
  get_prev_startAt() {
    if (this.prev_strt_at.length > (this.pagination_clicked_count + 1))
      this.prev_strt_at.splice(this.prev_strt_at.length - 2, this.prev_strt_at.length - 1);
    return this.prev_strt_at[this.pagination_clicked_count - 1];
  }


  // =====================================================================
  addToBasket(product: IProduct): void {
    this.ordersService.addBasket(product);
    product.count = 1;
  }
  // ---------------------------sort by price----------------------------
  sortProdUp(): Array<IProduct> {
    return this.products.sort((a, b) => a.price - b.price);
  }

  sortProdDown(): Array<IProduct> {
    return this.products.sort((a, b) => b.price - a.price)
  }
  // --------------------------filters----------------------------------
  // ------------------by stone---------------------------

  filterByStone(stone): void {
    this.paginationStatus = false;
    this.currentStone = stone;
    this.currentColor = 'всі';
    this.currentZodiac = 'всі';
    if (this.currentStone == 'всі') {
      this.getFireCloudProducts(this.categoryName);
      this.paginationStatus = true;
    }
    else {
      this.products = [];
      this.firecloud.collection('products', ref => ref.where('category.nameEN', '==', this.categoryName).where('stone', 'array-contains', stone))
        .snapshotChanges()
        .subscribe(response => {
          if (!response.length) {
            console.log("No Data Available");
            return false;
          }
          this.products = [];
          for (let item of response) {
            this.products.push(item.payload.doc.data());
          }
        }, error => {
        });
    }
  }

  // -----------------by color---------------------------
  filterByColor(color): void {
    this.paginationStatus = false;
    this.currentStone = 'всі';
    this.currentZodiac = 'всі';
    this.currentColor = color;
    if (this.currentColor == 'всі') {
      this.paginationStatus = true;
      this.getFireCloudProducts(this.categoryName);
    }
    else {
      this.products = [];
      this.firecloud.collection('products', ref => ref.where('category.nameEN', '==', this.categoryName).where('color', 'array-contains', color))
        .snapshotChanges()
        .subscribe(response => {
          if (!response.length) {
            console.log("No Data Available");
            return false;
          }
          this.products = [];
          for (let item of response) {
            this.products.push(item.payload.doc.data());
          }
        }, error => {
        });
    }
  }

  // ------------------by zodiac--------------------------
  filterByZodiac(zodiac): void {
    this.paginationStatus = false;
    this.currentZodiac = zodiac;
    this.currentStone = 'всі';
    this.currentColor = 'всі';
    if (this.currentZodiac == 'всі') {
      this.paginationStatus = true;
      this.getFireCloudProducts(this.categoryName);
    }
    else {
      this.products = [];
      this.firecloud.collection('products', ref => ref.where('category.nameEN', '==', this.categoryName).where('zodiac', 'array-contains', zodiac))
        .snapshotChanges()
        .subscribe(response => {
          if (!response.length) {
            console.log("No Data Available");
            return false;
          }
          this.products = [];
          for (let item of response) {
            this.products.push(item.payload.doc.data());
          }
        }, error => {
        });
    }
  }










}
