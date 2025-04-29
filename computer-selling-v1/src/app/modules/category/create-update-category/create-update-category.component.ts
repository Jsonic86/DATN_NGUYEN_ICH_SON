import { Component, Input, ViewChild } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { StatusResponse } from 'src/app/core/const/constant';
import { FormItem } from 'src/app/core/const/form.type';
import { Category } from 'src/app/model/response/category.response';
import { CategoryService } from 'src/app/services/category.service';
import { FormComponent } from 'src/app/shared/component/form/form.component';

@Component({
  selector: 'app-create-update-category',
  templateUrl: './create-update-category.component.html',
  styleUrls: ['./create-update-category.component.scss']
})
export class CreateUpdateCategoryComponent {
  @Input() id!: number;
  fields: FormItem[] = [
    { id: 1, type: 'text', fieldName: 'categoryName', label: 'Tên danh mục', required: false, span: 12, disabled: false },
    { id: 2, type: 'text', fieldName: 'categoryDescription', label: 'Mô tả', required: true, span: 12, disabled: false },
  ];
  item?: Category;
  fieldFormGroup: FormItem[] = [];
  @ViewChild(FormComponent, { static: true }) formComponent!: FormComponent;
  constructor(private modalRef: NzModalRef, private categoryService: CategoryService) {
    this.fields.map(field => {
      this.fieldFormGroup.push(new FormItem(field));
    });

  }
  async ngOnInit() {
    if (this.id) {
      this.categoryService.getById((this.id).toString()).subscribe(res => {
        if (res.code === StatusResponse.OK) {
          this.item = res.result;
        }
      })
    }
  }

  onCancel() {
    this.modalRef.close();
  }
  onSave() {
    const payload: any = {
      categoryName: this.formComponent.myForm.get('categoryName')?.value,
      categoryDescription: this.formComponent.myForm.get('categoryDescription')?.value
    };
    if (this.id) {
      payload.categoryId = this.id
      this.categoryService.updateCategory(payload).subscribe(res => {
        if (res.code === StatusResponse.OK) {
          this.modalRef.close(true);
        }
      })
    }
    else {
      this.categoryService.createCategory(payload).subscribe(res => {
        if (res.code === StatusResponse.OK) {
          this.modalRef.close(true);
        }
      })
    }
  }
}
