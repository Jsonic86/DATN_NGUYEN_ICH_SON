import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Column } from 'src/app/core/const/column.type';
import { STATUS, StatusResponse, TYPE } from 'src/app/core/const/constant';
import { SettingValue } from 'src/app/core/const/settingValue.type';
import { getCookie } from 'src/app/core/utils';
import { OrderService } from 'src/app/services/order.service';
import { ListOrderDetailComponent } from './list-order-detail/list-order-detail.component';
import { UserService } from 'src/app/services/user.service';
import { ConfirmComponent } from 'src/app/shared/component/confirm/confirm.component';
import { PaymentComponent } from './payment/payment.component';
import { Order } from 'src/app/model/response/order.response';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent {
  data: Order[] = [];
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
  customerId: string | null = '';
  STATUS = STATUS;
  results: any[] = [];
  searchSubject: Subject<string> = new Subject<string>();
  constructor(private orderService: OrderService, private modalService: NzModalService, private notification: NzNotificationService, private userService: UserService) {
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
          {
            actionName: 'cancelOrder',
            icon: 'close-circle',
            keyName: 'cancelOrder'
          },
          {
            actionName: 'chosePayment',
            icon: 'close-circle',
            keyName: 'chosePayment'
          },

        ]
      }
    ]

  }
  ngAfterViewInit() {
    this.userService.getInfo().subscribe(res => {
      if (res.code === StatusResponse.OK) {
        this.customerId = res.result?.customer.customerId;
        if (this.token) {
          this.getAllOrders(this.customerId);
        }
      }
    })

  }
  getVisiblePages(): number[] {
    const pages: number[] = [];
    const totalPages = this.results.length;

    for (let i = 2; i < totalPages; i++) {
      if (Math.abs(this.page - i) <= 1 && i !== 1 && i !== totalPages) {
        pages.push(i);
      }
    }

    return pages;
  }
  statusBackground(status: string): string {
    let className = '';
    switch (STATUS[status]) {
      case 'Chờ xử lý': className = 'bg-secondary'
        break;
      case 'Đang giao': className = 'bg-warning'
        break;
      case 'Hoàn thành': className = 'bg-success'
        break;
      case 'Đã hủy': className = 'bg-danger'
        break;
    }
    return className;
  }
  getAllOrders(customerId: string | null, payload: any = {}) {
    this.loading = true;
    payload.customerId = customerId;
    this.orderService.getAllOrdersByCustomerId(payload).subscribe((res: any) => {
      if (res.code === StatusResponse.OK && res.result?.content.length > 0) {
        for (let i = 0; i < res.result?.totalPages; i++) {
          this.results.push(i + 1);
        }
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
    this.results = [];
    this.page = page - 1;
    this.getAllOrders(this.customerId, { page: this.page });
  }
  onPageSizeChange(pageSize: number) {
    this.pageSize = pageSize;
    this.page = 0;
    this.getAllOrders(this.customerId, { size: this.pageSize });
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
  onchosePayment(e: any) {
    const modal = this.modalService.create({
      nzTitle: 'Thanh toán',
      nzContent: PaymentComponent,
      nzWidth: '75%',
      nzMaskClosable: false,
      nzFooter: null
    })
    modal.componentInstance!.data = e;
  }
  onCancelOrder(e: any) {
    if (e.status === 'CHỜ_XỬ_LÝ') {
      const modal = this.modalService.create({
        nzTitle: 'Hủy đơn hàng',
        nzContent: ConfirmComponent,
        nzWidth: '25%',
        nzMaskClosable: false,
        nzFooter: null
      })
      modal.afterClose.subscribe((res: any) => {
        if (res) {
          this.orderService.updateStatus(e.orderId, 'ĐÃ_HỦY').subscribe((res: any) => {
            if (res.code === StatusResponse.OK) {
              this.getAllOrders(this.customerId, { page: this.page - 1, size: this.pageSize });
              this.notification.success('Thông báo', 'Hủy đơn hàng thành công');
            }
          })
        }
      })
    }
    else {
      this.notification.error('Thông báo', `Đơn hàng đang trong trạng thái ${STATUS[e.status]}`);
    }
  }
  onAction(e: any) {
    switch (e.actionName) {
      case 'showDetail':
        this.onShowDetail(e.data);
        break;
      case 'cancelOrder':
        this.onCancelOrder(e.data);
        break;
      case 'chosePayment':
        this.onchosePayment(e.data);
        break;
    }
  }
  onSearch() {
    this.searchSubject.next(this.searchQuery);
  }
}
