import { Component } from '@angular/core';
import { ListOrderDetailComponent } from '../list-order/list-order-detail/list-order-detail.component';
import { PaymentMethod, STATUS, STATUS_PAYMENT, StatusResponse, TYPE, TYPE_UPDATE_STATUS } from 'src/app/core/const/constant';
import { OrderService } from 'src/app/services/order.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { getCookie } from 'src/app/core/utils';
import { Column } from 'src/app/core/const/column.type';
import { SettingValue } from 'src/app/core/const/settingValue.type';
import { UpdateStatusComponent } from './update-status/update-status.component';
import { Order } from 'src/app/model/response/order.response';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { ConfirmComponent } from 'src/app/shared/component/confirm/confirm.component';
import { PaymentComponent } from '../list-order/payment/payment.component';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-list-order-admin',
  templateUrl: './list-order-admin.component.html',
  styleUrls: ['./list-order-admin.component.scss']
})
export class ListOrderAdminComponent {
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
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;
  visiblePages: number[] = [];
  startPage: number = 1;
  endPage: number = 1;
  searchQuery: string = '';
  customerId: string | null = '';
  STATUS = STATUS;
  PaymentMethod = PaymentMethod;
  STATUS_PAYMENT = STATUS_PAYMENT;
  searchSubject: Subject<string> = new Subject<string>();
  constructor(private orderService: OrderService, private modalService: NzModalService, private notification: NzNotificationService, private userService: UserService, private paymentService: PaymentService) {
    this.token = getCookie('token');
  }
  ngOnInit(): void {


  }
  ngAfterViewInit() {

    if (this.token) {
      this.getAllOrders();
    }
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
  getAllOrders(payload: any = {}) {
    this.loading = true;
    // Ensure page is zero-based when sending to API
    const apiPayload = { ...payload };
    if (payload.page !== undefined) {
      apiPayload.page = payload.page - 1;
    }

    this.orderService.getAllOrders(apiPayload).subscribe((res: any) => {
      if (res.code === StatusResponse.OK && res.result?.content.length > 0) {
        this.data = res.result?.content;
        this.data.forEach((element: any) => {
          element.statusValue = STATUS[element.status];
          return element;
        });

        // Update pagination metadata
        this.currentPage = (res.result?.number || 0) + 1;
        this.totalElements = res.result?.totalElements || 0;
        this.pageSize = res.result?.size || 10;
        this.totalPages = res.result?.totalPages || 0;

        // Calculate visible page range
        this.calculateVisiblePages();
      } else {
        this.data = [];
        this.totalPages = 0;
        this.totalElements = 0;
      }
      this.loading = false;
    }, error => {
      this.loading = false;
      this.notification.error('Error', 'Failed to load orders');
    });
  }

  calculateVisiblePages() {
    // Show up to 5 page numbers including current page
    const MAX_VISIBLE = 5;
    const pageWindow = Math.floor(MAX_VISIBLE / 2);

    this.startPage = Math.max(2, this.currentPage - pageWindow);
    this.endPage = Math.min(this.totalPages - 1, this.currentPage + pageWindow);

    // Adjust start if we're near the end
    if (this.endPage - this.startPage + 1 < Math.min(MAX_VISIBLE - 1, this.totalPages - 2)) {
      this.startPage = Math.max(2, this.endPage - (MAX_VISIBLE - 2));
    }

    // Adjust end if we're near the start
    if (this.endPage - this.startPage + 1 < Math.min(MAX_VISIBLE - 1, this.totalPages - 2)) {
      this.endPage = Math.min(this.totalPages - 1, this.startPage + (MAX_VISIBLE - 2));
    }

    // Generate the visible page numbers array
    this.visiblePages = [];
    for (let i = this.startPage; i <= this.endPage; i++) {
      this.visiblePages.push(i);
    }
  }

  onPageChange(page: number) {
    // Validate the page number
    if (page < 1) page = 1;
    if (page > this.totalPages) page = this.totalPages;

    if (this.currentPage === page) return;

    this.currentPage = page;
    this.getAllOrders({ page: this.currentPage, size: this.pageSize });
  }

  onPageSizeChange(pageSize: number) {
    if (this.pageSize === pageSize) return;

    this.pageSize = pageSize;
    this.currentPage = 1;
    this.getAllOrders({ page: this.currentPage, size: this.pageSize });
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
  onUpdateStatus(e: any) {
    const modal = this.modalService.create({
      nzTitle: 'Cập nhật trạng thái',
      nzContent: UpdateStatusComponent,
      nzWidth: '20%',
      nzMaskClosable: false,
      nzFooter: null
    })
    modal.afterClose.subscribe((res: any) => {
      if (res) {
        this.getAllOrders({ page: this.currentPage - 1, size: this.pageSize });
      }
    })
    modal.componentInstance!.data = e;
    modal.componentInstance!.typeUpdateStatus = TYPE_UPDATE_STATUS.ORDER;
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
              this.getAllOrders({ page: this.currentPage - 1, size: this.pageSize });
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

    }
  }
  onSearch() {
    this.currentPage = 1;
    this.getAllOrders({
      page: this.currentPage,
      size: this.pageSize,
      search: this.searchQuery
    });
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
  onConfirmPayment(e: any) {
    if (STATUS[e.status] === 'Hoàn thành') {
      const modal = this.modalService.create({
        nzTitle: 'Xác nhận thanh toán',
        nzContent: ConfirmComponent,
        nzWidth: '35%',
        nzMaskClosable: false,
        nzFooter: null
      })
      modal.componentInstance!.action = 'Xác nhận thanh toán';
      modal.afterClose.subscribe((res: any) => {
        if (res) {
          this.paymentService.updateSatus({ orderId: e.orderId, status: 'DA_THANH_TOAN' }).subscribe((res: any) => {
            if (res.code === StatusResponse.OK) {
              this.getAllOrders({ page: this.currentPage - 1, size: this.pageSize });
              this.notification.success('Thông báo', 'Xác nhận thanh toán thành công');
            }
          })
        }
      })
    }
    else {
      this.notification.error('Thông báo', `Đơn hàng đang trong trạng thái ${STATUS[e.status]}`);
    }
  }
  onConfirmRefund(e: any) {
    if (STATUS_PAYMENT[e.payment.paymentStatus] === 'Đã thanh toán' && STATUS[e.status] === 'Đã hủy') {
      const modal = this.modalService.create({
        nzTitle: 'Xác nhận hoàn tiền',
        nzContent: ConfirmComponent,
        nzWidth: '35%',
        nzMaskClosable: false,
        nzFooter: null
      })
      modal.componentInstance!.action = 'Xác nhận hoàn tiền';
      modal.afterClose.subscribe((res: any) => {
        if (res) {
          this.paymentService.updateSatus({ orderId: e.orderId, status: 'HOAN_TIEN' }).subscribe((res: any) => {
            if (res.code === StatusResponse.OK) {
              this.getAllOrders({ page: this.currentPage - 1, size: this.pageSize });
              this.notification.success('Thông báo', 'Xác nhận hoàn tiền thành công');
            }
          })
        }
      })
    }
    else {
      this.notification.error('Thông báo', `Đơn này chưa thanh toán hoặc không ở trạng thái đã hủy`);
    }
  }
}
