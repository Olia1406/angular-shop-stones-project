import { Component, OnInit, TemplateRef } from '@angular/core';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { Category } from 'src/app/shared/models/category.model';
import { CategoryService } from 'src/app/shared/services/category.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {
  adminCategory: Array<ICategory> = [];
  categoryID = 1;
  nameEN: string;
  nameUA: string;
  cat: ICategory;

  modalRef: BsModalRef;

  constructor(private catService: CategoryService,
              private modalService: BsModalService) { }

  ngOnInit(): void {
    // this.adminJSONCategories();
    this.adminFireCloudCategories();
  }

  private adminJSONCategories(): void {
    this.catService.getJSONCategory().subscribe(data => {
      this.adminCategory = data;
    });
  }

  private adminFireCloudCategories(): void {
    this.catService.getFireCloudCategory().subscribe(
      collection => {
        this.adminCategory = collection.map(document => {
          const data = document.payload.doc.data() as ICategory;
          const id = document.payload.doc.id;
          return { id, ...data };
        });
      }
    );
  }

  // addCategory(): void {
    // const newC = new Category(this.categoryID, this.nameEN, this.nameUA);
    // delete newC.id;
    // this.catService.postJSONCategory(newC).subscribe(() => {
      // this.adminJSONCategories();
    // });
    // this.resetForm();
  // }

  addCategory(): void {
    const newC = new Category(this.categoryID, this.nameEN, this.nameUA);
    delete newC.id;
    this.catService.postFireCloudCategory({...newC})
      .then(message => console.log(message))
      .catch(err => console.log(err));
    this.resetForm();
  }

  deleteCategory(category: ICategory, template: TemplateRef<any>): void {
    this.openModal(template);
    this.cat = category;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  private resetForm(): void {
    this.nameEN = '';
    this.nameUA = '';
  }


  // confirmDeleteCategory(c): void {
    // this.modalRef.hide();
    // c = this.cat;
    // this.catService.deleteJSONCategory(c.id).subscribe(() => {
    // this.adminJSONCategories();
    // });
  // }

  confirmDeleteCategory(c): void {
    this.modalRef.hide();
    c = this.cat;
    // this.catService.deleteJSONCategory(c.id).subscribe(() => {
    // this.adminFireCloudCategories();
    // });
    this.catService.deleteFireCloudCategory(c.id)
      // .then(() => this.adminFireCloudCategories())
      .then(data => console.log(data))
      .catch(error => console.log(error));
  }
  
  decline(): void {
    this.modalRef.hide();
  }

}
