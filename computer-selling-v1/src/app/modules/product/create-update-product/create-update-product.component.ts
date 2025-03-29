import { Component, Input, ViewChild } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { StatusResponse } from 'src/app/core/const/constant';
import { FormItem } from 'src/app/core/const/form.type';
import { ProductService } from 'src/app/services/product.service';
import { FormComponent } from 'src/app/shared/component/form/form.component';

@Component({
  selector: 'app-create-update-product',
  templateUrl: './create-update-product.component.html',
  styleUrls: ['./create-update-product.component.scss']
})
export class CreateUpdateProductComponent {
  @Input() id!: number;
  fields: FormItem[] = [
    { id: 1, type: 'text', fieldName: 'productName', label: 'Tên sản phẩm', required: false, span: 12, disabled: false },
    { id: 2, type: 'text', fieldName: 'categoryName', label: 'Tên danh mục', required: true, span: 12, disabled: false },
    { id: 3, type: 'text', fieldName: 'price', label: 'Giá bán', span: 12, disabled: false },
    { id: 4, type: 'text', fieldName: 'stockQuantity', label: 'Số lượng tồn', span: 12, disabled: false },
    { id: 5, type: 'image', fieldName: 'imageUrl', label: 'Ảnh sản phẩm', span: 12, disabled: false },
    { id: 6, type: 'text', fieldName: 'description', label: 'Mô tả', span: 12, disabled: false }
  ];
  item: any;
  fieldFormGroup: FormItem[] = [];
  @ViewChild(FormComponent, { static: true }) formComponent!: FormComponent;
  constructor(private modalRef: NzModalRef, private productService: ProductService) {
    this.fields.map(field => {
      this.fieldFormGroup.push(new FormItem(field));
    });

  }
  ngOnInit() {
    if (this.id) {
      this.productService.getById((this.id).toString()).subscribe(res => {
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
    this.modalRef.close(true);
  }
}
