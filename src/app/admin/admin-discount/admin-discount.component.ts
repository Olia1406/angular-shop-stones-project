import { Component, OnInit, TemplateRef } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { IDiscount } from '../../shared/interfaces/discount.interface';
import { DiscountService } from '../../shared/services/discount.service';
import { Discount } from '../../shared/models/discount.model';

@Component({
  selector: 'app-admin-discount',
  templateUrl: './admin-discount.component.html',
  styleUrls: ['./admin-discount.component.scss']
})
export class AdminDiscountComponent implements OnInit {
  adminDiscount: Array<IDiscount> = [];
  uploadProgress: Observable<number>;
  imageStatus: boolean;
  editStatus: boolean;
  searchParam: string;

  dID = 1;
  dTitle: string;
  dText: string;
  dImage = 'https://firebasestorage.googleapis.com/v0/b/my-project-d612f.appspot.com/o/images%2F30043.jpeg?alt=media&token=65a2fcac-893f-49f1-97af-5df22c373a6f';
  currDiscount: IDiscount;

  modalRef: BsModalRef;
  modalRefconfig = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  constructor(
    private dService: DiscountService,
    private modalService: BsModalService,
    private afStorage: AngularFireStorage,
  ) { }

  ngOnInit(): void {
    this.getAdminDiscount();
  }


  private getAdminDiscount(): void {
    this.dService.getFireCloudDiscount().subscribe(collection => {
      this.adminDiscount = collection.map(document => {
        const data = document.payload.doc.data() as IDiscount;
        const id = document.payload.doc.id;
        return { id, ...data };
      })
    })
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
        this.dImage = url;
      });
    });
  }

  addDiscount(): void {
    const newDiscount = new Discount(this.dID, this.dTitle, this.dText, this.dImage);
    if (this.editStatus == true) {
      this.dService.updateFireCloudDiscount({ ...newDiscount })
        .then(() => this.getAdminDiscount())
        .catch(error => console.log(error));
      this.editStatus = false;
    }
    else {
      delete newDiscount.id;
      this.dService.postFireCloudDiscount({ ...newDiscount })
        .then(() => this.getAdminDiscount())
        .catch(error => console.log(error));
    }
    this.resetForm();
  }

  editDiscount(discount: IDiscount): void {
    this.dID = discount.id;
    this.dTitle = discount.title;
    this.dText = discount.text;
    this.dImage = discount.image;
    this.editStatus = true;
  }

  deleteDiscount(d: IDiscount, template: TemplateRef<any>) {
    this.openModal(template);
    this.currDiscount = d;
  }
  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, this.modalRefconfig);
  }
  confirmDeleteDiscount(discount: IDiscount): void {
    discount = this.currDiscount;
    this.dService.deleteFireCloudDiscount(discount)
      .then(() => this.getAdminDiscount())
      .catch(error => console.log(error));
    this.modalRef.hide();
    this.afStorage.storage.refFromURL(discount.image).delete();
  }
  decline(): void {
    this.modalRef.hide();
  }

  private resetForm(): void {
    this.dID = 1;
    this.dTitle = '';
    this.dText = '';
    this.dImage = 'https://firebasestorage.googleapis.com/v0/b/my-project-d612f.appspot.com/o/images%2F30043.jpeg?alt=media&token=65a2fcac-893f-49f1-97af-5df22c373a6f';
  }

}
