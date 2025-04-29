import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { StatusResponse } from 'src/app/core/const/constant';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-update-status',
  templateUrl: './update-status.component.html',
  styleUrls: ['./update-status.component.scss']
})
export class UpdateStatusComponent implements OnInit {
  @Input() data!: any;
  listStatus: any = [{
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
  status: any = 'CHỜ_XỬ_LÝ';
  constructor(private modalRef: NzModalRef, private orderService: OrderService) {

  }
  ngOnInit(): void {
    console.log(this.data);
  }
  onUpdateStatus() {
    this.orderService.updateStatus(this.data.orderId, this.status).subscribe(res => {
      if (res.code === StatusResponse.OK) {
        this.modalRef.close(true);
      }
    })
  }
}
