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

  constructor(private prodService: ProductService) { }
  products: Array<IProduct>;
  currentName: string;
  filteredProducts:Array<IProduct>;

  ngOnInit(): void {
  }

}
