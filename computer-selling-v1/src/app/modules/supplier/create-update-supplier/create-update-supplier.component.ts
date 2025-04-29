import { Component, Input, ViewChild } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { StatusResponse } from 'src/app/core/const/constant';
import { FormItem } from 'src/app/core/const/form.type';
import { Supplier } from 'src/app/model/response/supplier.response';
import { SupplierService } from 'src/app/services/supplier.service';
import { FormComponent } from 'src/app/shared/component/form/form.component';

@Component({
  selector: 'app-create-update-supplier',
  templateUrl: './create-update-supplier.component.html',
  styleUrls: ['./create-update-supplier.component.scss']
})
export class CreateUpdateSupplierComponent {
  @Input() id!: number;
  fields: FormItem[] = [
    { id: 1, type: 'text', fieldName: 'supplierName', label: 'Tên nhà cung cấp', required: false, span: 12, disabled: false },
    { id: 2, type: 'text', fieldName: 'contactPerson', label: 'Người liên hệ', required: false, span: 12, disabled: false },
    { id: 3, type: 'text', fieldName: 'phone', label: 'Số điện thoại', required: false, span: 12, disabled: false },
    { id: 4, type: 'text', fieldName: 'email', label: 'Email', required: false, span: 12, disabled: false },
    { id: 5, type: 'text', fieldName: 'address', label: 'Địa chỉ', required: false, span: 12, disabled: false },
  ];

  item?: Supplier;
  fieldFormGroup: FormItem[] = [];
  @ViewChild(FormComponent, { static: true }) formComponent!: FormComponent;
  constructor(private modalRef: NzModalRef, private supplierService: SupplierService) {
    this.fields.map(field => {
      this.fieldFormGroup.push(new FormItem(field));
    });

  }
  async ngOnInit() {
    if (this.id) {
      this.supplierService.getById((this.id).toString()).subscribe(res => {
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
      supplierName: this.formComponent.myForm.get('supplierName')?.value,
      contactPerson: this.formComponent.myForm.get('contactPerson')?.value,
      phone: this.formComponent.myForm.get('phone')?.value,
      email: this.formComponent.myForm.get('email')?.value,
      address: this.formComponent.myForm.get('address')?.value
    };
    if (this.id) {
      payload.id = this.id
      this.supplierService.updateSupplier(payload).subscribe(res => {
        if (res.code === StatusResponse.OK) {
          this.modalRef.close(true);
        }
      })
    }
    else {
      this.supplierService.createSupplier(payload).subscribe(res => {
        if (res.code === StatusResponse.OK) {
          this.modalRef.close(true);
        }
      })
    }
  }
}
