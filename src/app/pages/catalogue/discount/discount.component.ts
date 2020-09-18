import { Component, OnInit } from '@angular/core';
import { IDiscount } from '../../../shared/interfaces/discount.interface';
import { DiscountService } from '../../../shared/services/discount.service';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit {
  discounts: Array<IDiscount> = [];
  // imageUrl ='../../../../assets/images/nefryt.jpg';

  constructor(private dService: DiscountService) { }

  ngOnInit(): void {
    this.getUserDiscount();
  }

  getUserDiscount(): void {
    // this.dService.getJSONDiscount().subscribe(data => {
    // this.discounts = data;
    // });
    this.dService.getFireCloudDiscount().subscribe(data => {
      this.discounts = data.map(document => {
        const data = document.payload.doc.data() as IDiscount;
        const id = document.payload.doc.id;
        return { id, ...data };
      })
    })
  }

}
