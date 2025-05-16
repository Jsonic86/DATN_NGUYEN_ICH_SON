import { Component } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Column } from 'src/app/core/const/column.type';
import { STATUS, STATUS_PAYMENT, StatusResponse, TYPE } from 'src/app/core/const/constant';
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
  STATUS_PAYMENT = STATUS_PAYMENT;
  results: any[] = [];
  totalPages: number = 1;
  searchSubject: Subject<string> = new Subject<string>();
  constructor(private orderService: OrderService, private modalService: NzModalService, private notification: NzNotificationService, private userService: UserService) {
    this.token = getCookie('token');
  }
  ngOnInit(): void {

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

    if (this.totalPages <= 7) {
      // If we have 7 or fewer pages, show all pages
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always add first page
      pages.push(1);

      if (this.page > 3) {
        // Add ellipsis if current page is far from beginning
        pages.push(-1); // -1 represents ellipsis
      }

      // Add pages around current page
      const startPage = Math.max(2, this.page - 1);
      const endPage = Math.min(this.totalPages - 1, this.page + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (this.page < this.totalPages - 2) {
        // Add ellipsis if current page is far from end
        pages.push(-1); // -1 represents ellipsis
      }

      // Always add last page
      pages.push(this.totalPages);
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
    this.results = []; // Reset results array before new fetch
    payload.customerId = customerId;
    this.orderService.getAllOrdersByCustomerId(payload).subscribe((res: any) => {
      if (res.code === StatusResponse.OK && res.result?.content.length > 0) {
        this.totalPages = res.result?.totalPages;
        this.data = res.result?.content;
        this.data.forEach((element: any) => {
          element.statusValue = STATUS[element.status];
          return element;
        })
        this.page = res.result?.number + 1;
        this.totalElements = res.result?.totalElements;
        this.pageSize = res.result?.size;
      } else {
        this.data = [];
        this.totalElements = 0;
        this.totalPages = 0;
      }
      this.loading = false;
    });
  }

  onPageChange(page: number) {
    if (page < 1 || page > this.totalPages || page === this.page) {
      return; // Don't process invalid page changes
    }
    this.page = page;
    this.getAllOrders(this.customerId, { page: this.page - 1 });
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
  statusPaymentBackground(status: string): string {
    let className = '';
    switch (STATUS_PAYMENT[status]) {
      case 'Chưa thanh toán': className = 'bg-secondary'
        break;
      case 'Đã thanh toán': className = 'bg-success'
        break;
      case 'Hoàn tiền': className = 'bg-primary'
        break;
    }
    return className;
  }
}
