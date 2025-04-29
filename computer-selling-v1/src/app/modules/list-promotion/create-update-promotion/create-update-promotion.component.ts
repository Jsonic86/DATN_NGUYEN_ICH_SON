import { Component, Input, ViewChild } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { StatusResponse } from 'src/app/core/const/constant';
import { FormItem } from 'src/app/core/const/form.type';
import { PromotionById } from 'src/app/model/response/promotion.response';
import { PromotionService } from 'src/app/services/promotion.service';
import { FormComponent } from 'src/app/shared/component/form/form.component';

@Component({
  selector: 'app-create-update-promotion',
  templateUrl: './create-update-promotion.component.html',
  styleUrls: ['./create-update-promotion.component.scss']
})
export class CreateUpdatePromotionComponent {
  @Input() id!: number;
  fields: FormItem[] = [
    { id: 1, type: 'text', fieldName: 'name', label: 'Tên CT khuyến mãi', required: false, span: 12, disabled: false },
    { id: 2, type: 'text', fieldName: 'description', label: 'Mô tả', required: true, span: 12, disabled: false },
    { id: 3, type: 'text', fieldName: 'discountPercent', label: '% giảm giá', required: true, span: 12, disabled: false },
    { id: 4, type: 'text', fieldName: 'discountAmount', label: 'Sô tiền giảm giá', required: true, span: 12, disabled: false },
    { id: 5, type: 'date', fieldName: 'startDate', label: 'Ngày bắt đầu', required: true, span: 12, disabled: false },
    { id: 6, type: 'date', fieldName: 'endDate', label: 'Ngày kết thúc', required: true, span: 12, disabled: false },
  ];
  item?: PromotionById;
  fieldFormGroup: FormItem[] = [];
  @ViewChild(FormComponent, { static: true }) formComponent!: FormComponent;
  constructor(private modalRef: NzModalRef, private promotionService: PromotionService, private notification: NzNotificationService) {
    this.fields.map(field => {
      this.fieldFormGroup.push(new FormItem(field));
    });

  }
  async ngOnInit() {
    if (this.id) {
      this.promotionService.getById((this.id).toString()).subscribe(res => {
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
      name: this.formComponent.myForm.get('name')?.value,
      description: this.formComponent.myForm.get('description')?.value,
      discountPercent: this.formComponent.myForm.get('discountPercent')?.value,
      startDate: this.formComponent.myForm.get('startDate')?.value,
      discountAmount: this.formComponent.myForm.get('discountAmount')?.value,
      endDate: this.formComponent.myForm.get('endDate')?.value,
    };
    if (this.id) {
      payload.promotionId = this.id
      this.promotionService.updatePromotion(payload).subscribe(res => {
        if (res.code === StatusResponse.OK) {
          this.notification.success('Thành công', 'Cập nhật chương trình khuyến mãi thành công')
          this.modalRef.close(true);
        }
      })
    }
    else {
      this.promotionService.createPromotion(payload).subscribe(res => {
        if (res.code === StatusResponse.OK) {
          this.notification.success('Thành công', 'Thêm mới chương trình khuyến mãi thành công')
          this.modalRef.close(true);
        }
      })
    }
  }
}
