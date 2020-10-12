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
  productID:any;
  productCategory: ICategory = { id: 1, nameEN: 'necklace', nameUA: 'намиста' };
  productNameEN: string;
  productNameUA: string;
  productDescription: string;
  productLength: string;
  productWidth: string;
  productPrice: number;
  productImage: string = 'https://firebasestorage.googleapis.com/v0/b/my-project-d612f.appspot.com/o/images%2F-.jpg_220x220.jpeg?alt=media&token=f76c638b-53d5-45ae-b180-78214604ff60';
  productColor: string;
  productZodiac: string;
  productStone: string;

  currProduct: IProduct;
  editStatus: boolean;
  imageStatus: boolean;
  uploadProgress: Observable<number>;

  modalRef: BsModalRef;
  modalRefconfig = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  searchParam: string;
  constructor(private catService: CategoryService,
    private prodService: ProductService,
    private afStorage: AngularFireStorage,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.adminFireCloudCategories();
    this.adminFireCloudProducts();
  }

  private adminFireCloudCategories(): void {
    this.catService.getFireCloudCategory().subscribe(
      collection => {
        this.categories = collection.map(document => {
          const data = document.payload.doc.data() as ICategory;
          const id = document.payload.doc.id;
          return { id, ...data };
        });
      }
    );
  } 

  private adminFireCloudProducts(): void {
    this.prodService.getFireCloudProduct().subscribe(
      collection => {
        this.adminProducts = collection.map(document => {
          const id = document.payload.doc.id;
          const data = document.payload.doc.data() as IProduct;
          return { id, ...data };
        });
      }
    );
  } 

  addProdBtn(template: TemplateRef<any>): void {
    this.openModal(template);
    this.editStatus = false;
  }
  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, this.modalRefconfig);
  }
  closeModalCross() {
    this.modalRef.hide();
    this.resetForm();
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
      this.productColor.split(','),
      this.productZodiac.split(','),
      this.productStone.split(','));
    if (this.editStatus == true) {
      this.prodService.updateFireCloudProduct({ ...newProd })
      .then(message => console.log(message))
      .catch(err => console.log(err));
      this.editStatus = false;
    }
    else {
      delete newProd.id;
      this.prodService.postFireCloudProduct({ ...newProd })
      .then(message => console.log(message))
      .catch(err => console.log(err));
    }
    this.modalRef.hide();
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
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }
  confirmImage(): void {
    this.afStorage.storage.refFromURL(this.productImage).delete();
    this.modalRef.hide();
    this.imageStatus = false;
  }
  decline(): void {
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

  deleteProduct(product: IProduct, template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
    this.currProduct = product;
  }
  
  confirmDeleteProduct(product: IProduct): void {
    product = this.currProduct;
    this.prodService.deleteFireCloudProduct(product.id.toString())
    .then(data => console.log(data))
    .catch(error => console.log(error))
    this.modalRef.hide();
  }

  editProduct(template: TemplateRef<any>,prod: IProduct): void {
    this.modalRef = this.modalService.show(template, this.modalRefconfig);
    this.editStatus = true;
    this.productID = prod.id;
    this.productCategory = this.categories.filter(cat => cat.nameEN === prod.category.nameEN)[0];
    this.categoryName = prod.category.nameEN;
    this.productNameEN = prod.nameEN;
    this.productNameUA = prod.nameUA;
    this.productDescription = prod.description;
    this.productLength = prod.length;
    this.productWidth = prod.width;
    this.productPrice = prod.price;
    this.productImage = prod.image;
    this.productColor = prod.color.toString();
    this.productZodiac = prod.zodiac.toString();
    this.productStone = prod.stone.toString();
    this.imageStatus = false;
  }

}