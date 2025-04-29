import { Component, Input, ViewChild } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { StatusResponse } from 'src/app/core/const/constant';
import { FormItem } from 'src/app/core/const/form.type';
import { ProductItemResponse } from 'src/app/model/response/product.response';
import { CategoryService } from 'src/app/services/category.service';
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
    { id: 2, type: 'select', fieldName: 'categoryId', label: 'Tên danh mục', required: true, span: 12, disabled: false },
    { id: 3, type: 'text', fieldName: 'price', label: 'Giá bán', span: 12, disabled: false },
    { id: 4, type: 'text', fieldName: 'stockQuantity', label: 'Số lượng tồn', span: 12, disabled: false },
    { id: 5, type: 'image', fieldName: 'imageUrl', label: 'Ảnh sản phẩm', span: 12, disabled: false },
    { id: 6, type: 'text', fieldName: 'description', label: 'Mô tả', span: 12, disabled: false },
  ];
  item?: ProductItemResponse;
  fieldFormGroup: FormItem[] = [];
  @ViewChild(FormComponent, { static: true }) formComponent!: FormComponent;
  constructor(private modalRef: NzModalRef, private productService: ProductService, private categoryService: CategoryService) {
    this.fields.map(field => {
      this.fieldFormGroup.push(new FormItem(field));
    });

  }
  async ngOnInit() {
    if (this.id) {
      this.productService.getById((this.id).toString()).subscribe(res => {
        if (res.code === StatusResponse.OK) {
          this.item = res.result;
        }
      })
    }
    const options = await this.getOptions();
    this.formComponent.selectOptions = { categoryId: options }
  }
  async getOptions(): Promise<any[]> {
    return new Promise((resolve) => {
      this.categoryService.getAllCategories({}).subscribe(res => {
        if (res.code === StatusResponse.OK && res.result.content.length > 0) {
          resolve(res.result.content.map((item: any) => ({
            label: item.categoryName,
            value: item.categoryId
          })));
        } else {
          resolve([]);
        }
      });
    });
  }
  onCancel() {
    this.modalRef.close();
  }
  onSave() {
    const payload: any = {
      productName: this.formComponent.myForm.get('productName')?.value,
      categoryId: this.formComponent.myForm.get('categoryId')?.value,
      image: this.formComponent.fileList[0],
      price: this.formComponent.myForm.get('price')?.value,
      stockQuantity: this.formComponent.myForm.get('stockQuantity')?.value,
      description: this.formComponent.myForm.get('description')?.value,
    };
    if (this.id) {
      payload.productId = this.id
      this.productService.updateProduct(payload).subscribe(res => {
        if (res.code === StatusResponse.OK) {
          this.modalRef.close(true);
        }
      })
    }
    else {
      this.productService.createProduct(payload).subscribe(res => {
        if (res.code === StatusResponse.OK) {
          this.modalRef.close(true);
        }
      })
    }
  }
}
