import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Column } from 'src/app/core/const/column.type';
import { STATUS, StatusResponse, TYPE } from 'src/app/core/const/constant';
import { SettingValue } from 'src/app/core/const/settingValue.type';
import { getCookie } from 'src/app/core/utils';
import { OrderService } from 'src/app/services/order.service';
import { ListOrderDetailComponent } from './list-order-detail/list-order-detail.component';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent {
  data: any;
  fieldName: any = ['username', 'firstName', 'lastName', 'localDate'];
  token: string | null = '';
  settingValue: SettingValue = {
    size: 'middle',
    border: true,
    checkBox: false
  }
  cols: Column[] = [];
  loading: boolean = false;
  totalElements: number = 0;
  page: number = 0;
  pageSize: number = 10;
  searchQuery: string = '';
  constructor(private orderService: OrderService, private modalService: NzModalService, private notification: NzNotificationService) {
    this.token = getCookie('token');
  }
  ngOnInit(): void {
    this.cols = [
      {
        id: '0',
        arr: 'Mã đơn hàng',
        fieldName: 'orderId',
        width: '10em',
        type: TYPE.TEXT,
      },
      {
        id: '1',
        arr: 'Trạng thái',
        fieldName: 'statusValue',
        width: '10em',
        type: TYPE.TEXT,
      },
      {
        id: '2',
        arr: 'Tổng giá',
        fieldName: 'totalAmount',
        width: '10em',
        type: TYPE.TEXT,
      },
      {
        id: '3',
        arr: 'Ngày đặt hàng',
        fieldName: 'orderDate',
        width: '10em',
        type: TYPE.DATE,
      },
      {
        id: '4',
        arr: 'Thao tác',
        width: '10em',
        type: TYPE.ACTION,
        fieldName: 'action',
        listOfAction: [
          {
            actionName: 'showDetail',
            icon: 'info-circle',
            keyName: 'showDetail'
          },

        ]
      }
    ]

  }
  ngAfterViewInit() {
    if (this.token) {
      this.getAllOrders();
    }
  }
  getAllOrders(payload: any = {}) {
    this.loading = true;
    this.orderService.getAllOrders(payload).subscribe((res: any) => {
      if (res.code === StatusResponse.OK && res.result?.content.length > 0) {
        this.data = res.result?.content;
        this.data.forEach((element: any) => {
          element.statusValue = STATUS[element.status];
          return element;
        })
        this.page = res.result?.number + 1;
        this.totalElements = res.result?.totalElements;
        this.pageSize = res.result?.size;
        this.loading = false;
      }
    });
  }


  onPageChange(page: number) {
    this.page = page - 1;
    this.getAllOrders({ page: this.page });
  }
  onPageSizeChange(pageSize: number) {
    this.pageSize = pageSize;
    this.page = 0;
    this.getAllOrders({ size: this.pageSize });
  }
  onShowDetail(e: any) {
    const modal = this.modalService.create({
      nzTitle: 'Chi tiết đơn hàng',
      nzContent: ListOrderDetailComponent,
      nzWidth: '75%',
      nzMaskClosable: false,
      nzFooter: null
    })
    modal.componentInstance!.data = e.orderDetails;
  }
  onAction(e: any) {
    switch (e.actionName) {
      case 'showDetail':
        this.onShowDetail(e.data);
        break;
    }
  }
}
