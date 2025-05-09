import { Component, ViewChild } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { FormItem } from 'src/app/core/const/form.type';
import { FormComponent } from 'src/app/shared/component/form/form.component';

@Component({
  selector: 'app-add-address-shipment',
  templateUrl: './add-address-shipment.component.html',
  styleUrls: ['./add-address-shipment.component.scss']
})
export class AddAddressShipmentComponent {
  fields: FormItem[] = [
    { id: 1, type: 'text', fieldName: 'name', label: 'Tên người nhận', required: false, span: 12, disabled: false },
    { id: 2, type: 'text', fieldName: 'address', label: 'Địa chỉ giao', required: false, span: 12, disabled: false },
    { id: 3, type: 'text', fieldName: 'phone', label: 'Số điện thoại', required: false, span: 12, disabled: false },
  ];

  fieldFormGroup: FormItem[] = [];
  @ViewChild(FormComponent, { static: true }) formComponent!: FormComponent;
  constructor(private modalRef: NzModalRef) {
    this.fields.map(field => {
      this.fieldFormGroup.push(new FormItem(field));
    });

  }
  async ngOnInit() {

  }

  onCancel() {
    this.modalRef.close();
  }
  onSave() {
    this.modalRef.close(
      {
        ...this.formComponent.myForm.value,
        selected: false
      });
  }
}
