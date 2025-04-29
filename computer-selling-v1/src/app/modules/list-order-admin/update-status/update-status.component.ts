import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { StatusResponse, TYPE, TYPE_UPDATE_STATUS } from 'src/app/core/const/constant';
import { OrderService } from 'src/app/services/order.service';
import { PromotionService } from 'src/app/services/promotion.service';

@Component({
  selector: 'app-update-status',
  templateUrl: './update-status.component.html',
  styleUrls: ['./update-status.component.scss']
})
export class UpdateStatusComponent implements OnInit {
  @Input() data!: any;

  @Input() listStatus: any = [{
    value: 'CHỜ_XỬ_LÝ',
    label: 'Chờ xử lý'
  }, {
    value: 'ĐANG_GIAO',
    label: 'Đang giao'
  }, {
    value: 'HOÀN_THÀNH',
    label: 'Hoàn thành'
  }, {
    value: 'ĐÃ_HỦY',
    label: 'Đã hủy'
  }];
  @Input() status: string = 'CHỜ_XỬ_LÝ';
  @Input() typeUpdateStatus!: string;
  constructor(private modalRef: NzModalRef, private orderService: OrderService, private notification: NzNotificationService, private promotionService: PromotionService) {

  }
  ngOnInit(): void {
    console.log(this.data);
  }
  onUpdateStatus() {
    if (this.typeUpdateStatus === TYPE_UPDATE_STATUS.ORDER) {
      this.orderService.updateStatus(this.data.orderId, this.status).subscribe(res => {
        if (res.code === StatusResponse.OK) {
          this.notification.success('Thông báo', 'Cập nhật trạng thái đơn hàng thành công');
          this.modalRef.close(true);
        }
      })
    }
    else {
      this.promotionService.updateStatus({ promotionId: this.data.promotionId, status: this.status }).subscribe(res => {
        if (res.code === StatusResponse.OK) {
          this.notification.success('Thông báo', 'Cập nhật trạng thái CT khuyến mãi thành công');
          this.modalRef.close(true);
        }
      })
    }
  }

}
