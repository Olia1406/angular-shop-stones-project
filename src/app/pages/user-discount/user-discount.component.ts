import { Component, OnInit } from '@angular/core';
import { IDiscount } from 'src/app/shared/interfaces/discount.interface';
import { DiscountService } from 'src/app/shared/services/discount.service';

@Component({
  selector: 'app-user-discount',
  templateUrl: './user-discount.component.html',
  styleUrls: ['./user-discount.component.scss']
})
export class UserDiscountComponent implements OnInit {
  discounts: Array<IDiscount> = [];
  constructor(private dService: DiscountService) { }
  ngOnInit(): void {
    this.getUserDiscount();
  }
  getUserDiscount(): void {
    this.dService.getFireCloudDiscount().subscribe(data => {
      this.discounts = data.map(document => {
        const data = document.payload.doc.data() as IDiscount;
        const id = document.payload.doc.id;
        return { id, ...data };
      })
    })
  }
}