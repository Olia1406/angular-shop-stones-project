import { Component, OnInit, TemplateRef } from '@angular/core';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { Product } from 'src/app/shared/models/product.model';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, config } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {
  categories: Array<ICategory> = [];
  categoryName: string;
  adminProducts: Array<IProduct> = [];
  productID = 1;
  productCategory: ICategory = { id: 1, nameEN: 'necklace', nameUA: 'намиста' };
  productNameEN: string;
  productNameUA: string;
  productDescription: string;
  productLength: string;
  productWidth: string;
  productPrice: number;
  productImage: string;
  productColor: string;
  productZodiac: string;
  productStone: string;

  imageStatus: boolean;
  uploadProgress: Observable<number>;

  modalRef: BsModalRef;


  constructor(private catService: CategoryService,
    private prodService: ProductService,
    private afStorage: AngularFireStorage,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.adminJSONCategories();
    this.getProducts();
  }

  private adminJSONCategories(): void {
    this.catService.getJSONCategory().subscribe(data => {
      this.categories = data;
    });
  }

  private getProducts(): void {
    this.prodService.getJSONProduct().subscribe(data => {
      this.adminProducts = data;
    });
  }

  setCategory(): void {
    this.productCategory = this.categories.filter(cat => cat.nameEN === this.categoryName)[0];
  }

  addProduct(): void {
    const newProd = new Product(this.productID,
      this.productCategory,
      this.productNameEN,
      this.productNameUA,
      this.productDescription,
      this.productLength,
      this.productWidth,
      this.productPrice,
      this.productImage,
      this.productColor,
      this.productZodiac,
      this.productStone);
    delete newProd.id;
    this.prodService.postJSONProduct(newProd).subscribe(() => {
      this.getProducts();
    });
    this.resetForm();
  }

  uploadFile(event): void {
    const file = event.target.files[0];
    const type = file.type.slice(file.type.indexOf('/') + 1);
    const name = file.name.slice(0, file.name.lastIndexOf('.')).toLowerCase();
    const filePath = `images/${name}.${type}`;
    const upload = this.afStorage.upload(filePath, file);
    this.uploadProgress = upload.percentageChanges();
    upload.then(image => {
      this.afStorage.ref(`images/${image.metadata.name}`).getDownloadURL().subscribe(url => {
        this.productImage = url;
        this.imageStatus = true;
      });
    });
  }

  deleteImage(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {class: 'modal-md'});
  }
  confirmImage(): void {
    this.afStorage.storage.refFromURL(this.productImage).delete();
    this.modalRef.hide();
    this.imageStatus = false;
  }
  declineImage(): void {
    this.modalRef.hide();
  }

  private resetForm(): void {
    this.productCategory = this.categories[0];
    this.productNameEN = '';
    this.productNameUA = '';
    this.productDescription = '';
    this.productLength = '';
    this.productWidth = '';
    this.productPrice = null;
    this.productImage = '';
    this.productColor = '';
    this.productZodiac = '';
    this.productStone = '';
    this.imageStatus = false;
  }

}